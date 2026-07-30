import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const projectRoot = process.cwd();
const outputRoot = path.join(projectRoot, 'out');
const configuredBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? '');
const failures = [];
const fileCache = new Map();

function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function decodeHtml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&#x27;', "'");
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));
  return nested.flat();
}

async function cachedRead(filePath) {
  if (!fileCache.has(filePath)) {
    fileCache.set(filePath, readFile(filePath, 'utf8'));
  }
  return fileCache.get(filePath);
}

function outputTargetFor(sitePath, sourceFile) {
  if (sitePath.startsWith('/')) {
    const relative = sitePath.replace(/^\/+/, '');
    if (!relative) return path.join(outputRoot, 'index.html');
    const absolute = path.join(outputRoot, relative);
    return path.extname(relative) ? absolute : path.join(absolute, 'index.html');
  }

  const absolute = path.resolve(path.dirname(sourceFile), sitePath);
  if (sitePath.endsWith('/')) return path.join(absolute, 'index.html');
  return path.extname(sitePath) ? absolute : path.join(absolute, 'index.html');
}

function internalReference(rawValue, sourceFile) {
  const decoded = decodeHtml(rawValue.trim());
  if (/^javascript:/i.test(decoded)) {
    return { unsafeScheme: decoded.slice(0, 80) };
  }
  if (
    !decoded ||
    decoded.startsWith('#') ||
    decoded.startsWith('//') ||
    /^(?:https?:|mailto:|tel:|data:|blob:)/i.test(decoded)
  ) {
    return null;
  }

  const hashIndex = decoded.indexOf('#');
  const queryIndex = decoded.indexOf('?');
  const cutAt = [hashIndex, queryIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0];
  const pathname = cutAt === undefined ? decoded : decoded.slice(0, cutAt);
  const fragment = hashIndex >= 0 ? decoded.slice(hashIndex + 1).split('?')[0] : '';

  if (!pathname) return { target: sourceFile, fragment };

  let sitePath = pathname;
  if (pathname.startsWith('/')) {
    if (configuredBasePath) {
      if (pathname === configuredBasePath) {
        sitePath = '/';
      } else if (pathname.startsWith(`${configuredBasePath}/`)) {
        sitePath = pathname.slice(configuredBasePath.length);
      } else {
        return { rootEscape: pathname };
      }
    }
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(sitePath);
  } catch {
    return { invalidEncoding: pathname };
  }

  const target = outputTargetFor(decodedPath, sourceFile);
  const relativeTarget = path.relative(outputRoot, target);
  if (relativeTarget.startsWith('..') || path.isAbsolute(relativeTarget)) {
    return { outsideOutput: pathname };
  }
  return { target, fragment };
}

if (!(await exists(outputRoot))) {
  console.error('Static export verification failed: out/ does not exist. Run npm run build first.');
  process.exit(1);
}

const outputFiles = await walk(outputRoot);
const htmlFiles = outputFiles.filter((filePath) => filePath.endsWith('.html'));

if (htmlFiles.length === 0) {
  failures.push('out/ contains no HTML pages');
}
if (!(await exists(path.join(outputRoot, '.nojekyll')))) {
  failures.push('out/.nojekyll is missing');
}

const robotsPath = path.join(outputRoot, 'robots.txt');
if (!(await exists(robotsPath))) {
  failures.push('out/robots.txt is missing');
} else {
  const robots = await cachedRead(robotsPath);
  if (!/User-Agent:\s*\*/i.test(robots) || !/Disallow:\s*\//i.test(robots)) {
    failures.push('robots.txt must disallow crawling for this fictional demonstration');
  }
}

for (const htmlFile of htmlFiles) {
  const html = await cachedRead(htmlFile);
  const page = path.relative(outputRoot, htmlFile).replaceAll('\\', '/');

  if (!/^<!DOCTYPE html>/i.test(html)) failures.push(`${page}: missing HTML doctype`);
  if (!/<html\b[^>]*\blang="en"/i.test(html)) failures.push(`${page}: missing default html lang="en"`);
  if (!/<main\b[^>]*\bid="main-content"/i.test(html)) failures.push(`${page}: missing main-content landmark`);
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1].trim();
  if (!title) failures.push(`${page}: missing a non-empty page title`);
  if (!/<meta\b[^>]*\bname="robots"[^>]*\bcontent="noindex, nofollow"/i.test(html)) {
    failures.push(`${page}: missing noindex, nofollow safeguard`);
  }
  if (html.includes(projectRoot) || html.includes(projectRoot.replaceAll('\\', '\\\\'))) {
    failures.push(`${page}: contains an absolute local workspace path`);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  for (const id of duplicateIds) failures.push(`${page}: duplicate id="${id}"`);

  for (const imageTag of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(imageTag[0])) failures.push(`${page}: image is missing an alt attribute`);
  }

  for (const controlTag of html.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)) {
    const tag = controlTag[0];
    if (/\btype=["']hidden["']/i.test(tag)) continue;
    const id = tag.match(/\bid=["']([^"']+)["']/i)?.[1];
    const namedByAttribute = /\baria-(?:label|labelledby)=["'][^"']+["']/i.test(tag);
    const escapedId = id?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const matchingLabel = escapedId ? new RegExp(`<label\\b[^>]*\\bfor=["']${escapedId}["']`, 'i').test(html) : false;
    if (!namedByAttribute && !matchingLabel) failures.push(`${page}: form control lacks an accessible label${id ? ` (#${id})` : ''}`);
  }

  for (const buttonTag of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const [, attributes, contents] = buttonTag;
    const namedByAttribute = /\baria-(?:label|labelledby)=["'][^"']+["']/i.test(attributes);
    const visibleText = decodeHtml(contents.replace(/<[^>]+>/g, '')).trim();
    if (!namedByAttribute && !visibleText) failures.push(`${page}: button lacks an accessible name`);
  }

  for (const anchorTag of html.matchAll(/<a\b([^>]*)>/gi)) {
    const attributes = anchorTag[1];
    if (/\btarget=["']_blank["']/i.test(attributes) && !/\brel=["'][^"']*\bnoopener\b[^"']*["']/i.test(attributes)) {
      failures.push(`${page}: target="_blank" link is missing rel="noopener"`);
    }
  }

  const references = html.matchAll(/\b(?:href|src)=["']([^"'<>]+)["']/gi);
  for (const match of references) {
    const reference = internalReference(match[1], htmlFile);
    if (!reference) continue;
    if (reference.unsafeScheme) {
      failures.push(`${page}: unsafe javascript URL: ${reference.unsafeScheme}`);
      continue;
    }
    if (reference.rootEscape) {
      failures.push(`${page}: root-relative URL escapes configured base path: ${reference.rootEscape}`);
      continue;
    }
    if (reference.invalidEncoding) {
      failures.push(`${page}: invalid URL encoding: ${reference.invalidEncoding}`);
      continue;
    }
    if (reference.outsideOutput) {
      failures.push(`${page}: URL resolves outside out/: ${reference.outsideOutput}`);
      continue;
    }
    if (!(await exists(reference.target))) {
      failures.push(`${page}: missing local target for ${match[1]}`);
      continue;
    }

    if (reference.fragment && reference.target.endsWith('.html')) {
      const targetHtml = await cachedRead(reference.target);
      const escapedFragment = reference.fragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(`\\b(?:id|name)=["']${escapedFragment}["']`, 'i').test(targetHtml)) {
        failures.push(`${page}: missing fragment #${reference.fragment} in ${path.relative(outputRoot, reference.target).replaceAll('\\', '/')}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`Static export verification failed with ${failures.length} issue${failures.length === 1 ? '' : 's'}:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

const documentCount = outputFiles.filter((filePath) => filePath.includes(`${path.sep}documents${path.sep}`)).length;
console.log(`Static export verified: ${htmlFiles.length} HTML pages, ${documentCount} public documents, no broken local references.`);

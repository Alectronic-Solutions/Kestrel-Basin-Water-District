import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import process from 'node:process';

const outputRoot = path.resolve(process.cwd(), 'out');
const port = Number.parseInt(process.env.PORT ?? '3000', 10);
const basePathValue = (process.env.NEXT_PUBLIC_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
const basePath = basePathValue ? `/${basePathValue}` : '';

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

async function regularFile(filePath) {
  try {
    const details = await stat(filePath);
    return details.isFile();
  } catch {
    return false;
  }
}

function safeOutputPath(urlPath) {
  let pathname;
  try {
    pathname = decodeURIComponent(urlPath);
  } catch {
    return null;
  }

  if (basePath) {
    if (pathname === basePath) pathname = '/';
    else if (pathname.startsWith(`${basePath}/`)) pathname = pathname.slice(basePath.length);
    else return null;
  }

  const normalized = pathname.replaceAll('\\', '/').replace(/^\/+/, '');
  const candidate = path.resolve(outputRoot, normalized);
  const relative = path.relative(outputRoot, candidate);
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null;
  return candidate;
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1');
  let requestedFile = safeOutputPath(requestUrl.pathname);

  if (requestedFile && !path.extname(requestedFile)) {
    requestedFile = path.join(requestedFile, 'index.html');
  }

  let statusCode = 200;
  if (!requestedFile || !(await regularFile(requestedFile))) {
    statusCode = 404;
    requestedFile = path.join(outputRoot, '404.html');
  }

  if (!(await regularFile(requestedFile))) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(statusCode, {
    'Cache-Control': 'no-store',
    'Content-Type': contentTypes[path.extname(requestedFile)] ?? 'application/octet-stream',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(requestedFile).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Static export available at http://127.0.0.1:${port}${basePath || '/'}`);
});

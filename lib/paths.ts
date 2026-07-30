const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const publicBasePath = rawBasePath === '/' ? '' : rawBasePath.replace(/\/$/, '');

export function publicAsset(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${publicBasePath}${normalizedPath}`;
}

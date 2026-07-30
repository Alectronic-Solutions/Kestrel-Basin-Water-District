# Kestrel Basin Water District demonstration site

An accessible, fictional California special-district website built with Next.js 15, TypeScript, Tailwind CSS, and static export for GitHub Pages or any static host.

## Run locally

```powershell
npm ci
npm run dev
```

## Verify production output

```powershell
npm run check
npm start
```

## Deploy to GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. In the repository
settings, set **Pages** to **GitHub Actions**, then push to `main` or run the
workflow manually. The workflow builds a repository-subpath-safe static export,
uploads `out/`, and deploys it through GitHub Pages.

### After your first push

Open the repository's **Actions** tab and wait for **Deploy static site to
GitHub Pages** to finish successfully. GitHub then shows the public address in
**Settings → Pages**. Future pushes to `main` automatically publish the latest
version of the site.

For a custom domain or another static host, set these environment variables at
build time when needed:

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://example.org'
$env:NEXT_PUBLIC_BASE_PATH = ''
npm run build
```

## Demonstration documents

The public PDF downloads in `public/documents/` are generated locally and copied
into the static export. Regenerate them after changing document titles or content:

```powershell
python -m venv .venv
& .\.venv\Scripts\python.exe -m pip install --requirement requirements-docs.txt
& .\.venv\Scripts\python.exe scripts\generate_demo_documents.py
```

The documents are fictional, searchable PDFs intended to demonstrate the public
records, agenda, minutes, finance, and forms experience. They do not accept
submissions or constitute official district materials.

The site is intentionally marked `noindex, nofollow` and includes a crawler-disallow rule because Kestrel Basin, Arroyo Vale County, all staff, addresses, phone numbers, rates, schedules, and documents are fictional. Do not use the listed information for real water service or emergencies. Remove those safeguards only after replacing all fictional material and obtaining the appropriate agency approval.

## Accessibility

The site targets WCAG 2.2 AA and Section 508. It provides keyboard-friendly navigation and menu controls, skip navigation, visible focus indicators, language controls that persist locally, text-size controls, form validation with an error summary, labeled tables, document-format labels, live filter status, reduced-motion support, and a keyboard-accessible back-to-top control.

The site-wide search and service-area explorer run entirely in the browser. They do not retain or submit a resident's search terms or address.

Before deployment, run an accessibility audit against the locally served `out` directory, such as `npx @axe-core/cli http://localhost:3000`.

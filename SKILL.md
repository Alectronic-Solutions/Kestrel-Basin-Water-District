---
name: gov-site
description: Build accessible government and public sector websites, including municipal departments, county offices, special districts, veterans services, and public health agencies. Use this skill whenever the user mentions a government site, city or county department, special district, agency website, WCAG or Section 508 compliance, SB 929, Brown Act posting requirements, or any public sector web build, even if they do not explicitly ask for the skill. Also use it for portfolio or demonstration sites that imitate government agencies.
---

# Government Site Baseline

Standards for building accessible, authentic public sector websites. Follow this
in full unless the project's CLAUDE.md overrides a specific rule.

## Before anything else: demo safeguards

If the site is a portfolio or demonstration piece rather than a real agency
build, all three of these are mandatory and non-negotiable.

1. **Fictional naming only.** Invent the agency, the county, and every community
   name. Never use a real jurisdiction, even loosely. A demo that resembles a
   real agency can be indexed, shared, or mistaken for official communication.
2. **Persistent demo banner** at the top of every page, above all other chrome,
   not dismissible. Standard text: "Demonstration site. This is a fictional
   agency built as a portfolio example and is not affiliated with any government
   entity."
3. **noindex, nofollow** in the root metadata on every page.

One exception worth knowing: if the site type carries **crisis or emergency
resources** (veterans services, public health, social services), use the real
numbers, not invented ones. A fabricated crisis line on a page someone finds in
an emergency is a real harm. Keep the office details fictional, keep the crisis
resources accurate, and mark clearly which is which.

## Accessibility is the primary requirement

This is not a checklist item. It is the reason a government site is built
differently from a commercial one, and it is what an agency evaluator actually
tests. Target **WCAG 2.1 AA and Section 508**.

Every component must satisfy:

- Keyboard operable start to finish, no mouse required at any point, no focus traps
- Visible focus indicator on every interactive element, 3:1 contrast minimum
- Text contrast 4.5:1 minimum, large text and UI components 3:1 minimum
- Semantic landmarks: header, nav, main, aside, footer, each with an accessible name
- Heading order correct with no skipped levels on any page
- Meaningful alt text on content images, `alt=""` on decorative ones
- Form inputs with associated labels, errors summarized at top and
  programmatically linked to the offending field
- Tables use `th`, `scope`, and `caption`
- Document links state format and file size in the link text
- Never convey information by color alone, pair it with text or pattern
- `prefers-reduced-motion` respected everywhere
- Skip-to-main-content link as the first focusable element on the page
- Dynamic results announced via `aria-live`, focus managed on view changes

After any visual or structural change, re-audit. Redesigns break accessibility
more often than they break layout. Install and run `@axe-core/cli` against the
built output and fix everything it finds.

## Stack

Next.js 14 App Router, TypeScript, Tailwind CSS, lucide-react.
Static export (`output: 'export'`) targeting Cloudflare Pages.
No Framer Motion. No shadcn/ui. Components are handcoded.

## Typography

**Public Sans**, self-hosted in `/public/fonts`, wired up with `next/font/local`.
Never load it from a CDN. It is the open source typeface used across US federal
government sites, so it reads as authentic without any licensing question.

Set body copy at 17 or 18px. Establish a real type scale with clear jumps: page
titles noticeably larger than section headings, section headings noticeably
larger than body. Flat type scale is one of the clearest signs of a generated
layout.

## Color

Define every color as a CSS variable in `globals.css` and map them into the
Tailwind theme so components use semantic class names, never raw hex values.

Each variant picks its own palette, but the structure is always the same:

```
--{prefix}-primary      deep institutional tone, headers and nav
--{prefix}-interactive  links and interactive elements
--{prefix}-slate        body text
--{prefix}-accent       used sparingly
--{prefix}-bg           page background, white
--{prefix}-surface      cards and secondary surfaces
--{prefix}-alert        emergencies and urgent notices
--{prefix}-caution      warnings and advisories
--{prefix}-success      confirmations
```

Light background, high contrast, plain and institutional. This is not a premium
agency aesthetic. Restrained and legible beats stylish. Reference the U.S. Web
Design System in spirit, never copy its assets.

Verify contrast still passes after every color change.

## Structural chrome

This is the single biggest realism gap in generated government sites. Real
agency sites have layers of institutional chrome above the content. Build all
of them.

1. **Utility bar**, above the header. Small text, dark background, tight
   vertical padding, full width. Contains: language toggle, text size controls
   (A A A), a contact link, and a search input.

2. **Masthead.** An agency seal on the left, then a two-line lockup with the
   parent entity in smaller caps above the department name as the primary line.
   Design the seal in SVG: outer ring carrying the entity name and founding
   year, simple civic mark inside, two colors only.

3. **Primary navigation band**, a distinct band below the masthead, not floating
   inside the header. Dark background, medium weight labels, dropdown menus on
   top level items revealing sub-pages in multi-column panels. Fully keyboard
   operable with correct `aria-expanded` state.

4. **"I Want To..." action bar** directly below the nav. This is the signature
   municipal pattern and its absence is conspicuous. Six to eight direct action
   links with small icons, phrased as tasks the public actually performs.

5. **Alert banner slot** below the chrome for urgent notices.

6. **Dense multi-column footer.** Real government footers are large. Four to
   five columns: Departments (8 links), Services (8 links), Resources (8 links),
   Connect (address, phone, TTY line, office hours), plus a bottom bar with
   accessibility statement, non-discrimination notice, public records, privacy
   policy, and site map.

Tab order through demo banner, utility bar, any crisis bar, masthead, nav, and
action bar must be logical.

## Interior page layout

Uniform full-width card grids on every page is the clearest sign of a generated
site. Real government interior pages use three columns.

- **Left rail:** section navigation showing sibling pages, current page marked
  with `aria-current`. Sticky on desktop, collapsed to an accordion on mobile.
- **Center:** main content at a readable measure of 65 to 75 characters. Real
  prose, tables, and definition lists. Not cards.
- **Right rail:** contact card for the responsible division, related documents
  list, related links.

Every interior page also carries:
- Breadcrumbs directly below the nav
- A "Page last updated" date stamp at the bottom of the content
- A "Was this page helpful?" yes or no widget above the footer

Reserve card grids for homepage quick links only.

## Density rules

Government sites are information dense, not spacious. Generated layouts default
to airy and sparse, which reads as an unfinished demo.

- Reduce vertical section padding by roughly a third from a typical marketing site
- 2px border radius or square corners. Rounded cards read as consumer SaaS
- Divide content regions with 1px solid rules, not whitespace
- No drop shadows anywhere
- Underline all inline body links and keep them the designated interactive color
- Tables get filled header rows, visible row rules, and zebra striping

## Content architecture

All content lives in typed files under `/content` so it can be swapped per
variant. Never hardcode content inside components.

Standard files, adapted per variant:
- `services.ts`, `notices.ts`, `meetings.ts`, `forms.ts`, `staff.ts`, `projects.ts`
- `en.ts` and `es.ts` for UI strings

## Content volume

Six entries per file is what makes a site feel like a demo. Real agencies have
years of accumulated material. Target volumes:

- Notices: 20 to 24 entries spanning 18 months
- Meetings: 12 to 24 entries, a few upcoming and the rest past, each with agenda
  and minutes references
- Forms: 24 to 30 entries with format, file size, and last revised date
- Services: 14 to 18 entries across divisions
- Staff: 8 to 12 people with title, division, and extension
- Projects: 8 capital improvement entries with status, budget, and timeline

Write plausible institutional language. No lorem ipsum. Invent street names,
district numbers, and community names, then reuse them consistently across every
file so the content reads as one coherent place.

## Bilingual support

English and Spanish toggle using the `en.ts` and `es.ts` string files. No i18n
library, keep it static. The toggle must set the `lang` attribute on the html
element correctly, persist the choice, and be keyboard reachable. Translate UI
chrome and content entries. Spanish should read naturally, not machine
translated.

## Photography

Source from Unsplash, store locally in `/public/images`. Never hotlink.

An unphotographed government site always looks fake. Needed at minimum: one
homepage hero, one header image per top level section, staff portraits, and
images inside detail pages.

Choose documentary and utilitarian images: civic infrastructure, work crews,
facility exteriors, service counters, community events. Avoid gradient meshes,
abstract shapes, illustrations, conceptual stock art, and anything that reads as
marketing photography. Descriptive alt text on everything.

## Standard page set

Adapt names per variant, but the shape holds:

- `/` overview, active alerts, quick links, upcoming meetings, recent notices
- `/services` directory, filterable by category
- `/services/[slug]` detail: description, eligibility, how to apply, related
  forms, responsible division, contact
- `/notices` reverse chronological, filterable by year
- `/notices/[slug]` detail with posted date and department
- `/meetings` grouped upcoming and past, agenda and minutes links, posted-on
  timestamps
- `/forms` library with text filter and category filter
- `/contact` contact info, office hours, department directory table, accessible
  contact form
- `/accessibility` ADA and Section 508 statement

Every list page needs an empty state. Every filter must be keyboard operable and
announce result counts via `aria-live`.

## Statutory requirements, California public agencies

Include where the variant calls for it. These are real obligations and building
to them is a strong differentiator.

**Brown Act meeting requirements:**
- Regular meeting agendas posted at least 72 hours in advance
- Special meeting agendas posted at least 24 hours in advance
- Agendas reachable within three clicks of the homepage on a clearly labeled,
  prominent link
- Visible "posted on" timestamp on every agenda entry

**SB 929, Special Districts Transparency Act**, applies to independent special
districts, effective January 2020:
- District contact information clearly listed
- The most recent board meeting agenda
- State Controller's Financial Transaction Report for the district
- State Controller's Board and Staff Compensation Report
- SB 272 Enterprise System Catalog, updated annually

For any variant with statutory obligations, build a `/transparency/compliance`
page listing each requirement as a row, what satisfies it, and a direct link.
It should read like a checklist an auditor could tick through.

Important framing: the site demonstrates that these requirements can be met. It
does not constitute a compliance determination. Leave legal conclusions to the
agency and its counsel.

## Every variant needs one distinctive feature

Something clearly beyond template work, appropriate to the agency type. Examples
from prior builds: a benefits eligibility screener, a conservation stage
indicator, a tiered bill estimator. Build it client side only, with no data
submitted anywhere, and hold it to the full accessibility standard. State plainly
on the page that it is an estimate or a guide, not an official determination.

## Build sequence

1. Write CLAUDE.md referencing this skill plus the variant specific rules
2. Scaffold: stack, fonts, palette, layout shell, chrome, demo safeguards
3. Content files at full volume
4. Page routes
5. Bilingual toggle
6. The distinctive interactive feature
7. Photography
8. Full accessibility audit plus `@axe-core/cli` against the built output
9. `npm run build`, confirm clean static export, write the README

Do not merge steps 2 and 4. Context pressure on a sprawling scaffold-plus-all-
routes prompt is where quality drops.

## Working style

Provide complete file replacements. Never partial edits, snippets, or
find-and-replace instructions. No em dashes in copy or content.

## Calibration check

When the site looks finished, open two or three real agency sites of the same
type alongside it. Not to copy, only to calibrate. If yours has noticeably more
whitespace and fewer links than theirs, it is still reading as a demo.
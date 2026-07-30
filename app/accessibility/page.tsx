import Link from 'next/link';
import { Breadcrumbs, ContactCard, PageStamp, SectionNav } from '@/components/interior';
import { Helpful } from '@/components/helpful';

export const metadata = { title: 'Accessibility statement' };

export default function AccessibilityPage() {
  return <main id="main-content">
    <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} />
    <div className="shell grid gap-7 py-7 lg:grid-cols-[230px_minmax(0,1fr)_260px]">
      <SectionNav title="District" links={[{ label: 'Contact directory', href: '/contact' }, { label: 'Accessibility', href: '/accessibility', current: true }, { label: 'Transparency & compliance', href: '/transparency/compliance' }, { label: 'Employment', href: '/services/job-opportunities' }, { label: 'Public records', href: '/services/public-records-request' }]} />
      <article className="prose">
        <p className="eyebrow m-0">Digital access</p>
        <h1 className="mb-2 mt-1 text-4xl text-[#123b5d]">Accessibility statement</h1>
        <p className="text-xl">Kestrel Basin Water District is committed to providing information and services that are accessible to people with disabilities.</p>
        <h2>Our accessibility standard</h2>
        <p>We design and review this site against the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA, and applicable Section 508 requirements. Accessibility is an ongoing effort, and this statement does not replace an independent legal or technical conformance evaluation.</p>
        <h2>Features available on this site</h2>
        <ul><li>A skip link, clear heading structure, descriptive links, and visible keyboard focus.</li><li>Responsive layouts that support text enlargement and use without a mouse.</li><li>Controls that respect reduced-motion preferences, including the moving alert and hero image.</li><li>Document links that identify their file type and size, plus a way to request another format.</li></ul>
        <h2>Need help or an alternate format?</h2>
        <p>If you experience difficulty using this website or need a document in an alternate format, contact Customer Services. Please provide the page address or document title, a short description of the problem, and a safe way to reach you. Do not send account numbers, payment details, or other sensitive information by email.</p>
        <p><strong>Phone:</strong> <a href="tel:+15550100140">(555) 010-0140</a><br /><strong>Relay service:</strong> 711<br /><strong>Email:</strong> <a href="mailto:accessibility@kestrelbasin.example">accessibility@kestrelbasin.example</a></p>
        <h2>Language assistance</h2>
        <p>Free language assistance is available. Use the language control in the site header to view core content in Spanish, or contact the District to request interpretation or translated materials.</p>
        <h2>Report an accessibility barrier</h2>
        <p>Describe what you were trying to do, the barrier you encountered, the date and time, and any assistive technology or browser you were using. We will review the report and work with you on a reasonable way to access the information or service.</p>
        <p><Link href="/contact">Use the contact form</Link></p>
        <PageStamp />
        <Helpful />
      </article>
      <div className="space-y-4"><ContactCard division="Accessibility Coordinator" phone="(555) 010-0140" email="accessibility@kestrelbasin.example" /><aside className="border-l-4 border-[#c98b16] bg-[#fff8e9] p-4 text-sm"><strong>Document access</strong><p className="mb-0">If a PDF or other document is not usable for you, tell us the document title and preferred format. We can help identify an accessible alternative.</p></aside></div>
    </div>
  </main>;
}

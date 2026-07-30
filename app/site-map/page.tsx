import Link from 'next/link';
import { Breadcrumbs, PageStamp, SectionNav } from '@/components/interior';
import { services } from '@/content/services';

export const metadata = { title: 'Site map' };

const primaryLinks = [{ label: 'Home', href: '/' }, { label: 'Services directory', href: '/services' }, { label: 'Forms library', href: '/forms' }, { label: 'Board meetings', href: '/meetings' }, { label: 'Public notices', href: '/notices' }, { label: 'Contact directory', href: '/contact' }];
const districtLinks = [{ label: 'Bill estimator', href: '/estimator' }, { label: 'Accessibility statement', href: '/accessibility' }, { label: 'Transparency & compliance', href: '/transparency/compliance' }, { label: 'Privacy policy', href: '/privacy' }, { label: 'Public records request', href: '/services/public-records-request' }];

export default function SiteMapPage() {
  return <main id="main-content"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Site map' }]} /><div className="shell grid gap-7 py-7 lg:grid-cols-[230px_minmax(0,1fr)_260px]"><SectionNav title="District" links={[{ label: 'Contact directory', href: '/contact' }, { label: 'Accessibility', href: '/accessibility' }, { label: 'Privacy policy', href: '/privacy' }, { label: 'Site map', href: '/site-map', current: true }, { label: 'Transparency & compliance', href: '/transparency/compliance' }]} /><article className="prose"><p className="eyebrow m-0">Find information</p><h1 className="mb-2 mt-1 text-4xl text-[#123b5d]">Site map</h1><p className="text-xl">A complete directory of the public information and services available on this demonstration site.</p><h2>Popular pages</h2><ul>{primaryLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul><h2>Services</h2><ul>{services.map((service) => <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.name.en}</Link></li>)}</ul><h2>District information</h2><ul>{districtLinks.map((link) => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul><PageStamp /></article><aside className="border border-slate-400 bg-[#f1f5f7] p-4 text-sm"><h2 className="mt-0 text-lg text-[#123b5d]">Need help?</h2><p className="mb-0">Call Customer Services at <a href="tel:+15550100140">(555) 010-0140</a> for help locating information.</p></aside></div></main>;
}

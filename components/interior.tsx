import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="border-b border-slate-300 bg-[#f1f5f7]"><div className="shell py-2 text-sm"><ol className="m-0 flex list-none flex-wrap gap-2 p-0">{items.map((item, index) => <li key={`${item.label}-${index}`} className="flex gap-2"><span aria-hidden="true" className={index === 0 ? 'hidden' : ''}>/</span>{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></div></nav>;
}

export function SectionNav({ title, links }: { title: string; links: { label: string; href: string; current?: boolean }[] }) {
  return <aside aria-label={`${title} section navigation`} className="border border-slate-400 bg-[#f1f5f7] text-sm"><h2 className="m-0 bg-[#123b5d] px-4 py-2 text-base text-white">{title}</h2><ul className="m-0 list-none p-0">{links.map((link) => <li key={link.href} className="border-t border-slate-300"><Link aria-current={link.current ? 'page' : undefined} className={`block px-4 py-2 ${link.current ? 'bg-white font-bold text-[#123b5d] no-underline' : ''}`} href={link.href}>{link.label}</Link></li>)}</ul></aside>;
}

const divisionEmails: Record<string, string> = {
  'Customer Services': 'service@kestrelbasin.example',
  Operations: 'operations@kestrelbasin.example',
  Engineering: 'engineering@kestrelbasin.example',
  'Water Quality': 'waterquality@kestrelbasin.example',
  Conservation: 'conservation@kestrelbasin.example',
  'District Clerk': 'clerk@kestrelbasin.example',
  'Human Resources': 'hr@kestrelbasin.example',
};

const phoneHref = (phone: string) => {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned.startsWith('+') ? cleaned : `+1${cleaned}`;
};

export function ContactCard({ division = 'Customer Services', phone = '(555) 010-0140', email }: { division?: string; phone?: string; email?: string }) {
  const resolvedEmail = email ?? divisionEmails[division] ?? 'info@kestrelbasin.example';
  return <aside aria-label={`${division} contact`} className="border border-slate-400 bg-white"><h2 className="m-0 bg-[#e7eff3] px-4 py-2 text-base text-[#123b5d]">Contact {division}</h2><div className="p-4 text-sm"><p className="mt-0"><strong>Phone</strong><br /><a href={`tel:${phoneHref(phone)}`}>{phone}</a></p><p><strong>Email</strong><br /><a href={`mailto:${resolvedEmail}`}>{resolvedEmail}</a></p><p className="mb-0"><strong>Office hours</strong><br />Monday to Friday<br />8 a.m. to 5 p.m.</p></div></aside>;
}

export function PageStamp({ date = 'July 29, 2026' }: { date?: string }) {
  return <p className="mt-8 text-sm text-slate-600">Page last updated: {date}</p>;
}

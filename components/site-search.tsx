'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { forms } from '@/content/forms';
import { meetings } from '@/content/meetings';
import { notices } from '@/content/notices';
import { services } from '@/content/services';
import type { Bilingual } from '@/content/types';
import { publicAsset } from '@/lib/paths';
import { Localized } from './localized';

type Result = { id: string; kind: string; title: Bilingual; description: Bilingual; href: string };

const index: Result[] = [
  ...services.map((service) => ({ id: `service-${service.slug}`, kind: 'Service', title: service.name, description: service.summary, href: `/services/${service.slug}` })),
  ...notices.map((notice) => ({ id: `notice-${notice.slug}`, kind: 'Notice', title: notice.title, description: notice.summary, href: `/notices/${notice.slug}` })),
  ...forms.map((form) => ({ id: `form-${form.id}`, kind: 'Form', title: form.title, description: form.description, href: `/forms#${form.id}` })),
  ...meetings.map((meeting) => ({ id: `meeting-${meeting.id}`, kind: 'Meeting', title: meeting.type, description: { en: `${meeting.date}, ${meeting.time}. Board of Directors meeting.`, es: `${meeting.date}, ${meeting.time}. Reunión de la Junta Directiva.` }, href: '/meetings' })),
];

export function SiteSearch() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('q');
    if (requested) { setQuery(requested); setSubmitted(true); }
  }, []);
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return [];
    return index.filter((entry) => `${entry.kind} ${entry.title.en} ${entry.title.es} ${entry.description.en} ${entry.description.es}`.toLocaleLowerCase().includes(normalized));
  }, [query]);
  const search = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    window.history.replaceState({}, '', `${publicAsset('/search/')}?q=${encodeURIComponent(query.trim())}`);
  };
  return <><form role="search" onSubmit={search} className="border-y border-slate-300 bg-[#f1f5f7] p-4"><label className="block font-bold" htmlFor="full-site-search"><Localized en="Search Kestrel Basin Water District" es="Buscar Kestrel Basin Water District" /></label><div className="mt-2 flex gap-2"><input id="full-site-search" value={query} onChange={(event) => setQuery(event.target.value)} type="search" className="min-w-0 flex-1 border border-slate-500 bg-white px-3 py-2" placeholder="bill, agenda, rebate, water quality" /><button className="button" type="submit"><Localized en="Search" es="Buscar" /></button></div></form>{submitted && <section className="mt-5" aria-label="Search results"><p role="status" aria-live="polite" className="text-sm"><Localized en={`${results.length} result${results.length === 1 ? '' : 's'} found for “${query}”.`} es={`${results.length} resultado${results.length === 1 ? '' : 's'} encontrado${results.length === 1 ? '' : 's'} para “${query}”.`} /></p>{results.length ? <ol className="m-0 list-none divide-y divide-slate-300 border-y border-slate-300 p-0">{results.map((entry) => <li className="py-4" key={entry.id}><p className="eyebrow m-0">{entry.kind}</p><h2 className="mb-1 mt-1 text-xl"><Link href={entry.href}><Localized en={entry.title.en} es={entry.title.es} /></Link></h2><p className="m-0 text-sm"><Localized en={entry.description.en} es={entry.description.es} /></p></li>)}</ol> : <div role="status" className="border border-slate-400 bg-[#fff8e9] p-4"><strong><Localized en="No matching information was found." es="No se encontró información coincidente." /></strong><p className="mb-0 mt-1"><Localized en="Try a service name, a topic such as billing or conservation, or call Customer Services at (555) 010-0140." es="Pruebe un nombre de servicio, un tema como facturación o conservación, o llame a Servicios al Cliente al (555) 010-0140." /></p></div>}</section>}</>;
}

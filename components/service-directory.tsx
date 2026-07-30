'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { services } from '@/content/services';
import { Localized } from './localized';

export function ServiceDirectory({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState('All');
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('q');
    if (requested) setQuery(requested);
  }, []);
  const categories = ['All', ...Array.from(new Set(services.map((service) => service.category.en)))];
  const results = useMemo(() => services.filter((service) => (category === 'All' || service.category.en === category) && `${service.name.en} ${service.summary.en} ${service.category.en} ${service.name.es} ${service.summary.es} ${service.category.es}`.toLowerCase().includes(query.toLowerCase())), [category, query]);
  return <><form className="grid gap-4 border-y border-slate-300 bg-[#f1f5f7] p-4 md:grid-cols-[1fr_260px]" onSubmit={(event) => event.preventDefault()}><div><label className="block text-sm font-bold" htmlFor="service-query">Search services</label><input id="service-query" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2" type="search" placeholder="e.g., bill, leak, rebate" /></div><div><label className="block text-sm font-bold" htmlFor="service-category">Filter by category</label><select id="service-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2"><option value="All">All categories</option>{categories.slice(1).map((entry) => <option key={entry}>{entry}</option>)}</select></div></form><p className="my-4 text-sm" role="status" aria-live="polite">{results.length} service{results.length === 1 ? '' : 's'} found.</p>{results.length ? <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">{results.map((service) => <li key={service.slug} className="card border-l-4 border-l-[#c98b16] p-4"><p className="eyebrow m-0"><Localized en={service.category.en} es={service.category.es} /></p><h2 className="mb-1 mt-1 text-xl"><Link href={`/services/${service.slug}`}><Localized en={service.name.en} es={service.name.es} /></Link></h2><p className="m-0 text-sm"><Localized en={service.summary.en} es={service.summary.es} /></p></li>)}</ul> : <div className="border border-slate-400 bg-[#fff8e9] p-4" role="status"><strong>No services match your filters.</strong><p className="mb-0 mt-1">Try a different search term, choose all categories, or call Customer Services at (555) 010-0140.</p></div>}</>;
}

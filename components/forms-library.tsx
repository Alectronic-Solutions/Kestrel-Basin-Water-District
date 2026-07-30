'use client';

import { useMemo, useState } from 'react';
import { forms } from '@/content/forms';
import { Localized } from './localized';
import { publicAsset } from '@/lib/paths';

export function FormsLibrary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = Array.from(new Set(forms.map((form) => form.category.en)));
  const results = useMemo(() => forms.filter((form) => (
    category === 'All' || form.category.en === category
  ) && `${form.title.en} ${form.description.en} ${form.category.en} ${form.title.es} ${form.description.es} ${form.category.es}`.toLowerCase().includes(query.toLowerCase())), [query, category]);

  return <>
    <form className="grid gap-4 border-y border-slate-300 bg-[#f1f5f7] p-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
      <div><label htmlFor="form-search" className="block text-sm font-bold">Search forms</label><input id="form-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} className="mt-1 w-full border border-slate-500 px-3 py-2" placeholder="e.g., service, rebate, records" /></div>
      <div><label htmlFor="form-category" className="block text-sm font-bold">Filter by category</label><select id="form-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 w-full border border-slate-500 bg-white px-3 py-2"><option value="All">All categories</option>{categories.map((entry) => <option key={entry}>{entry}</option>)}</select></div>
    </form>
    <p role="status" aria-live="polite" className="my-4 text-sm">{results.length} form{results.length === 1 ? '' : 's'} found.</p>
    {results.length ? <div className="table-wrap responsive-table-wrap"><table className="responsive-table"><caption>Downloadable district forms</caption><thead><tr><th scope="col">Form and purpose</th><th scope="col">Category</th><th scope="col">Last revised</th></tr></thead><tbody>{results.map((form) => <tr id={form.id} key={form.id}><td data-label="Form and purpose"><a href={publicAsset(`/documents/forms/${form.id}.pdf`)}><Localized en={form.title.en} es={form.title.es} /> ({form.format}, {form.size})</a><p className="mb-0 mt-1 text-sm"><Localized en={form.description.en} es={form.description.es} /></p></td><td data-label="Category"><Localized en={form.category.en} es={form.category.es} /></td><td data-label="Last revised">{form.revised}</td></tr>)}</tbody></table></div> : <div role="status" className="border border-slate-400 bg-[#fff8e9] p-4"><strong>No forms match your filters.</strong><p className="mb-0">Call Customer Services at (555) 010-0140 if you need help finding a form.</p></div>}
  </>;
}

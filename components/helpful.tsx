'use client';

import { useState } from 'react';
import { Localized } from './localized';

export function Helpful() {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  return <section aria-label="Page feedback" className="mt-8 border-y border-slate-300 bg-[#f1f5f7] p-4 text-sm"><strong><Localized en="Was this page helpful?" es="¿Le resultó útil esta página?" /></strong>{response ? <p role="status" className="mb-0 mt-2"><Localized en="Thank you for your feedback." es="Gracias por sus comentarios." /></p> : <div className="mt-2 flex gap-2"><button type="button" className="button secondary !min-h-0 !py-1 !text-sm" onClick={() => setResponse('yes')}><Localized en="Yes" es="Sí" /></button><button type="button" className="button secondary !min-h-0 !py-1 !text-sm" onClick={() => setResponse('no')}><Localized en="No" es="No" /></button></div>}</section>;
}

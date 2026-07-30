'use client';

import { useEffect, useState } from 'react';

export function Localized({ en, es }: { en: React.ReactNode; es: React.ReactNode }) {
  return <><span className="lang-en" lang="en">{en}</span><span className="lang-es" lang="es">{es}</span></>;
}

export function LanguageToggle() {
  const [locale, setLocale] = useState<'en' | 'es'>('en');
  useEffect(() => {
    const saved = window.localStorage.getItem('kbwd-language') as 'en' | 'es' | null;
    if (saved === 'es') setLocale('es');
    document.documentElement.dataset.locale = saved === 'es' ? 'es' : 'en';
  }, []);
  const toggle = () => {
    const next = locale === 'en' ? 'es' : 'en';
    setLocale(next);
    document.documentElement.dataset.locale = next;
    window.localStorage.setItem('kbwd-language', next);
  };
  return <button type="button" onClick={toggle} className="underline underline-offset-2 hover:text-white" aria-label={locale === 'en' ? 'Cambiar idioma a español' : 'Switch language to English'}><Localized en="Español" es="English" /></button>;
}

export function TextSizeControls() {
  const [scale, setScale] = useState(100);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  useEffect(() => {
    const saved = Number(window.localStorage.getItem('kbwd-text-scale'));
    if ([90, 100, 110, 120].includes(saved)) setScale(saved);
    setPreferencesLoaded(true);
  }, []);
  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.style.fontSize = `${scale}%`;
    window.localStorage.setItem('kbwd-text-scale', String(scale));
  }, [preferencesLoaded, scale]);
  const set = (next: number) => setScale(Math.max(90, Math.min(120, next)));
  return <div role="group" className="flex items-center gap-1" aria-label="Text size controls"><span aria-hidden="true" className="mr-1 text-slate-300">Text size</span><button type="button" onClick={() => set(scale - 10)} aria-label="Decrease text size" className="px-1 hover:text-white">A</button><button type="button" onClick={() => set(100)} aria-label="Reset text size" className="px-1 text-base hover:text-white">A</button><button type="button" onClick={() => set(scale + 10)} aria-label="Increase text size" className="px-1 text-lg hover:text-white">A</button></div>;
}

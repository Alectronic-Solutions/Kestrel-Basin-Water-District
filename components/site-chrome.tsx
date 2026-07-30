'use client';

import Link from 'next/link';
import { ChevronDown, CircleDollarSign, Droplets, FileText, HandHeart, MapPinned, Megaphone, Menu, Pause, Play, Search, TriangleAlert, UsersRound, Wrench, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { publicAsset } from '@/lib/paths';
import { LanguageToggle, Localized, TextSizeControls } from './localized';

const menus = [
  { label: ['Services', 'Servicios'], links: [['Service directory', 'Directorio de servicios', '/services'], ['Start or stop service', 'Iniciar o suspender servicio', '/services/start-water-service'], ['Pay your bill', 'Pagar su factura', '/services/pay-your-bill'], ['Report a problem', 'Reportar un problema', '/services/report-water-problem']] },
  { label: ['Your water', 'Su agua'], links: [['Water quality', 'Calidad del agua', '/services/water-quality-records'], ['Conservation', 'Conservación', '/services/outdoor-water-use'], ['Capital projects', 'Proyectos de capital', '/transparency/compliance#projects'], ['Service area', 'Área de servicio', '/services/district-map']] },
  { label: ['Meetings & notices', 'Reuniones y avisos'], links: [['Board meetings', 'Reuniones de la Junta', '/meetings'], ['Public notices', 'Avisos públicos', '/notices'], ['Transparency & compliance', 'Transparencia y cumplimiento', '/transparency/compliance'], ['Public records', 'Registros públicos', '/services/public-records-request']] },
  { label: ['District', 'Distrito'], links: [['Contact directory', 'Directorio de contacto', '/contact'], ['Accessibility', 'Accesibilidad', '/accessibility'], ['Employment', 'Empleo', '/services/job-opportunities'], ['Forms library', 'Biblioteca de formularios', '/forms']] },
];

const actions = [
  { icon: CircleDollarSign, en: 'Pay my bill', es: 'Pagar mi factura', href: '/services/pay-your-bill' },
  { icon: Droplets, en: 'Start or stop service', es: 'Iniciar o suspender servicio', href: '/services/start-water-service' },
  { icon: TriangleAlert, en: 'Report a water problem', es: 'Reportar problema de agua', href: '/services/report-water-problem' },
  { icon: FileText, en: 'Find a form', es: 'Encontrar formulario', href: '/forms' },
  { icon: UsersRound, en: 'Board agendas', es: 'Agendas de la Junta', href: '/meetings' },
  { icon: HandHeart, en: 'Save water', es: 'Ahorrar agua', href: '/services/outdoor-water-use' },
  { icon: MapPinned, en: 'Service area', es: 'Área de servicio', href: '/services/district-map' },
  { icon: Wrench, en: 'Bill estimator', es: 'Calculadora de factura', href: '/estimator' },
];

function Seal() {
  return <svg aria-label="Kestrel Basin Water District seal" role="img" viewBox="0 0 96 96" preserveAspectRatio="xMidYMid meet" className="site-seal h-[76px] w-[76px] shrink-0"><circle cx="48" cy="48" r="45" fill="#123b5d" /><circle cx="48" cy="48" r="39" fill="#fff" /><circle cx="48" cy="48" r="32" fill="#123b5d" /><path d="M48 19C37 34 31 44 31 55a17 17 0 0 0 34 0c0-11-6-21-17-36Z" fill="#c98b16" /><path d="M39 58c5 5 13 5 18 0" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3" /><path d="M36 65c7 4 17 4 24 0" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.4" /><circle cx="17" cy="48" r="2.25" fill="#c98b16" /><circle cx="79" cy="48" r="2.25" fill="#c98b16" /></svg>;
}

export function SiteChrome() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [tickerPaused, setTickerPaused] = useState(false);
  const closeNavigation = () => { setOpenMenu(null); setMobileNavOpen(false); };
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpenMenu(null); setMobileNavOpen(false); }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    window.location.assign(`${publicAsset('/search/')}?q=${encodeURIComponent(query.trim())}`);
  };
  const alertMessage = <><Megaphone className="shrink-0" size={18} aria-hidden="true" /><strong><Localized en="Conservation alert:" es="Alerta de conservación:" /></strong><span><Localized en="Stage 1 water conservation rules are in effect. Outdoor watering is limited to two assigned days per week." es="Las reglas de conservación de agua de etapa 1 están vigentes. El riego exterior está limitado a dos días asignados por semana." /></span></>;

  return <><header>
    <div className="alert-ticker" role="region" aria-label="Conservation alert">
      <div className="alert-ticker__viewport"><div className={`alert-ticker__track${tickerPaused ? ' is-paused' : ''}`}><div className="alert-ticker__message">{alertMessage}<Link href="/services/outdoor-water-use"><Localized en="View current rules" es="Ver reglas actuales" /></Link></div><div className="alert-ticker__message" aria-hidden="true">{alertMessage}<span className="underline"><Localized en="View current rules" es="Ver reglas actuales" /></span></div></div></div>
      <button type="button" className="alert-ticker__control" onClick={() => setTickerPaused(!tickerPaused)} aria-pressed={tickerPaused} aria-label={tickerPaused ? 'Resume scrolling conservation alert' : 'Pause scrolling conservation alert'}>{tickerPaused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>
    </div>
    <div className="bg-[#123b5d] text-sm text-white"><div className="shell flex flex-wrap items-center justify-between gap-x-5 gap-y-2 py-2"><div className="flex flex-wrap items-center gap-x-4 gap-y-1"><LanguageToggle /><TextSizeControls /><Link href="/contact" className="text-white hover:text-white"><Localized en="Contact us" es="Contáctenos" /></Link></div><form role="search" onSubmit={submitSearch} className="utility-search flex"><label className="sr-only" htmlFor="site-search"><Localized en="Search this site" es="Buscar en este sitio" /></label><input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} className="h-8 w-52 border-0 px-2 text-slate-900" placeholder="Search services" /><button className="flex h-8 w-9 items-center justify-center bg-white text-[#123b5d]" type="submit" aria-label="Submit search"><Search size={18} /></button></form></div></div>
    <div className="shell flex items-center gap-4 py-4"><Link href="/" aria-label="Kestrel Basin Water District home" className="flex min-w-0 items-center gap-3 no-underline"><Seal /><span className="min-w-0"><span className="block text-xs font-bold tracking-[.14em] text-[#35516a]"><Localized en="ARROYO VALE COUNTY, CALIFORNIA" es="CONDADO DE ARROYO VALE, CALIFORNIA" /></span><span className="site-name block text-2xl font-bold leading-tight text-[#123b5d]">Kestrel Basin<br className="sm:hidden" /> Water District</span></span></Link><div className="ml-auto hidden border-l border-slate-300 pl-5 text-right text-sm md:block"><strong className="block text-[#8f1d21]"><Localized en="24-hour water emergency" es="Emergencia de agua las 24 horas" /></strong><a className="font-bold" href="tel:+15550100111">(555) 010-0111</a></div></div>
    </header>
    <nav aria-label="Primary navigation" className="primary-nav bg-[#0c304d] text-white"><div className="shell"><button type="button" className="primary-nav__mobile-toggle" aria-expanded={mobileNavOpen} aria-controls="primary-nav-links" onClick={() => setMobileNavOpen(!mobileNavOpen)}><Localized en="Menu" es="Menú" />{mobileNavOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}</button><div id="primary-nav-links" className={`primary-nav__links flex flex-wrap${mobileNavOpen ? ' is-open' : ''}`}><Link href="/" onClick={closeNavigation} className="px-4 py-3 text-white hover:bg-[#174b70] hover:text-white"><Localized en="Home" es="Inicio" /></Link>{menus.map((menu, index) => <div key={menu.label[0]} className="primary-nav__menu relative"><button aria-expanded={openMenu === index} aria-controls={`menu-${index}`} onClick={() => setOpenMenu(openMenu === index ? null : index)} className="flex items-center gap-1 px-4 py-3 font-bold hover:bg-[#174b70]"><Localized en={menu.label[0]} es={menu.label[1]} /><ChevronDown size={16} aria-hidden="true" /></button>{openMenu === index && <div id={`menu-${index}`} className="primary-nav__panel absolute left-0 z-30 w-72 border border-[#55758d] bg-white p-2"><ul className="m-0 list-none p-0">{menu.links.map(([en, es, href]) => <li key={href}><Link onClick={closeNavigation} href={href} className="block px-3 py-2 font-normal text-[#075a9c] hover:bg-[#eaf1f5]"><Localized en={en} es={es} /></Link></li>)}</ul></div>}</div>)}</div></div></nav>
    <nav aria-label="I want to" className="action-bar border-b border-[#8fa5b4] bg-[#e7eff3]"><div className="action-bar__links shell flex flex-wrap divide-x divide-[#9db2c0]">{actions.map(({ icon: Icon, en, es, href }) => <Link key={href} href={href} className="action-bar__link flex items-center gap-1.5 px-3 py-2 text-sm font-bold no-underline hover:bg-white"><Icon size={16} aria-hidden="true" /><Localized en={en} es={es} /></Link>)}</div></nav>
  </>;
}

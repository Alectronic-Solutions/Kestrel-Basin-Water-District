import Link from 'next/link';

export default function NotFound() { return <main id="main-content" className="shell py-12"><p className="eyebrow">Page not found</p><h1 className="text-4xl text-[#123b5d]">We could not find that page.</h1><p>The link may be outdated or the page may have moved. Use the services directory or return to the homepage.</p><p className="flex gap-3"><Link className="button" href="/">Home</Link><Link className="button secondary" href="/services">Services</Link></p></main>; }

import type { Metadata } from 'next';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';
import './globals.css';
import { SiteChrome } from '@/components/site-chrome';
import { Footer } from '@/components/footer';
import { BackToTop } from '@/components/back-to-top';
import { publicAsset } from '@/lib/paths';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: { default: 'Kestrel Basin Water District', template: '%s | Kestrel Basin Water District' },
  description: 'Public information and service guidance for the fictional Kestrel Basin Water District demonstration website.',
  applicationName: 'Kestrel Basin Water District',
  category: 'Government and public services',
  referrer: 'strict-origin-when-cross-origin',
  robots: { index: false, follow: false },
  icons: { icon: publicAsset('/icon.svg'), shortcut: publicAsset('/icon.svg'), apple: publicAsset('/apple-touch-icon.png') },
  manifest: publicAsset('/manifest.webmanifest'),
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Kestrel Basin Water District', title: 'Kestrel Basin Water District', description: 'Public information and service guidance for a fictional water district demonstration website.' },
  twitter: { card: 'summary', title: 'Kestrel Basin Water District', description: 'Public information and service guidance for a fictional water district demonstration website.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteChrome />{children}<Footer /><BackToTop /></body></html>;
}

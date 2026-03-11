import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hesaplayim.com'),
  title: {
    default: "Hesaplayım | Türkiye'nin Hesaplama Platformu",
    template: '%s | Hesaplayım',
  },
  description:
    'Maaş, kıdem tazminatı, KDV, TYT puanı ve 30+ araçla hızlı hesaplama. 2026 güncel mevzuat ve vergi dilimleriyle.',
  keywords: ['hesaplama', 'maaş hesaplama', 'kıdem tazminatı', 'kdv hesaplama', 'tyt puan hesaplama'],
  authors: [{ name: 'Hesaplayım' }],
  creator: 'Hesaplayım',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hesaplayim.com',
    siteName: 'Hesaplayım',
    title: "Hesaplayım | Türkiye'nin Hesaplama Platformu",
    description: '30+ hesaplama aracı. Maaş, vergi, sınav puanı ve daha fazlası.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hesaplayım',
    description: '30+ hesaplama aracı',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://hesaplayim.com',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hesaplayım',
  url: 'https://hesaplayim.com',
  description: "Türkiye'nin hesaplama platformu",
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://hesaplayim.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${jakarta.className} bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

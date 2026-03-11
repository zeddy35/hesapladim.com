import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Bordro Hesapla | Türkiye Çalışan Hesaplama Araçları 2026',
    template: '%s | BordroHesapla',
  },
  description:
    '2026 güncel vergi dilimleri ve yasal parametrelerle brütten nete maaş, kıdem tazminatı hesaplama araçları.',
  metadataBase: new URL('https://bordrohesapla.com'),
  openGraph: {
    siteName: 'BordroHesapla',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

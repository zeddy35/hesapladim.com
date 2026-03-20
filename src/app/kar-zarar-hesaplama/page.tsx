import type { Metadata } from 'next';
import KarZararForm from './Form';

export const metadata: Metadata = {
  title: 'Kar / Zarar Hesaplama',
  description:
    'Maliyet fiyatı ve satış fiyatına göre kar veya zarar tutarını, kar marjını ve kârlılık oranını anında hesaplayın.',
  keywords: ['kar zarar', 'kar marjı', 'kar oranı', 'kârlılık', 'satış fiyatı', 'maliyet fiyatı'],
  alternates: { canonical: 'https://hesaplayim.com/kar-zarar-hesaplama' },
  openGraph: {
    title: 'Kar / Zarar Hesaplama',
    description: 'Maliyet ve satış fiyatından kar/zarar ve kârlılık oranını hesaplayın.',
    url: 'https://hesaplayim.com/kar-zarar-hesaplama',
  },
};

export default function KarZararPage() {
  return <KarZararForm />;
}

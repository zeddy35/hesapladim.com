import type { Metadata } from 'next';
import IndirimForm from './Form';

export const metadata: Metadata = {
  title: 'İndirim Hesaplama',
  description:
    'Orijinal fiyat ve indirim oranına göre indirimli fiyatı, tasarruf edilen tutarı anında hesaplayın.',
  keywords: ['indirim hesaplama', 'indirimli fiyat', 'yüzde indirim', 'tasarruf', 'iskonto hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/indirim-hesaplama' },
  openGraph: {
    title: 'İndirim Hesaplama',
    description: 'İndirim oranı ile indirimli fiyat ve tasarrufu anında hesaplayın.',
    url: 'https://hesaplayim.com/indirim-hesaplama',
  },
};

export default function IndirimPage() {
  return <IndirimForm />;
}

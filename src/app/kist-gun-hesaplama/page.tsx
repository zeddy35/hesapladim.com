import type { Metadata } from 'next';
import KistGunForm from './Form';

export const metadata: Metadata = {
  title: 'Kıst Gün Maaşı Hesaplama',
  description:
    'Aylık brüt maaş, çalışılan gün ve toplam iş günü sayısına göre eksik aylık maaşı (kıst gün) hesaplayın.',
  keywords: ['kıst gün', 'eksik ay maaşı', 'günlük maaş', 'yarım ay maaş', 'kıst maaş hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kist-gun-hesaplama' },
  openGraph: {
    title: 'Kıst Gün Maaşı Hesaplama',
    description: 'Çalışılan gün sayısına göre kıst gün maaşını hesaplayın.',
    url: 'https://hesaplayim.com/kist-gun-hesaplama',
  },
};

export default function KistGunPage() {
  return <KistGunForm />;
}

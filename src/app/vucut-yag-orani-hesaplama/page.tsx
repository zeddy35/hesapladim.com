import type { Metadata } from 'next';
import VucutYagForm from './Form';

export const metadata: Metadata = {
  title: 'Vücut Yağ Oranı Hesaplama',
  description:
    'ABD Deniz Kuvvetleri (US Navy) formülüyle vücut ölçülerinizden yağ oranınızı ve kategorinizi hesaplayın.',
  keywords: ['vücut yağ oranı', 'yağ yüzdesi hesaplama', 'us navy formülü', 'body fat', 'yağ kategorisi'],
  alternates: { canonical: 'https://hesaplayim.com/vucut-yag-orani-hesaplama' },
  openGraph: {
    title: 'Vücut Yağ Oranı Hesaplama',
    description: 'US Navy formülüyle vücut yağ oranınızı ve kategorinizi öğrenin.',
    url: 'https://hesaplayim.com/vucut-yag-orani-hesaplama',
  },
};

export default function VucutYagPage() {
  return <VucutYagForm />;
}

import type { Metadata } from 'next';
import AdimKaloriForm from './Form';

export const metadata: Metadata = {
  title: 'Adım Kalori Hesaplama 2026 | Adım Sayısına Göre Yakılan Kalori',
  description:
    'Günlük adım sayınıza, kilonuza ve boyunuza göre yakılan kalori, yürünen mesafe ve süreyi hesaplayın.',
  alternates: { canonical: 'https://hesapladim.com/adim-kalori-hesaplama' },
};

export default function Page() {
  return <AdimKaloriForm />;
}

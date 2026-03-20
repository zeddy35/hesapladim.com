import type { Metadata } from 'next';
import EnflasyonForm from './Form';

export const metadata: Metadata = {
  title: 'Enflasyon Etkisi Hesaplama',
  description:
    'Enflasyon oranı ve süreye göre paranızın satın alma gücünü, değer kaybını ve gelecekteki eşdeğerini hesaplayın.',
  keywords: ['enflasyon hesaplama', 'satın alma gücü', 'değer kaybı', 'tüfe etkisi', 'enflasyon etkisi'],
  alternates: { canonical: 'https://hesaplayim.com/enflasyon-hesaplama' },
  openGraph: {
    title: 'Enflasyon Etkisi Hesaplama',
    description: 'Enflasyonun paranızın değerine etkisini hesaplayın.',
    url: 'https://hesaplayim.com/enflasyon-hesaplama',
  },
};

export default function EnflasyonPage() {
  return <EnflasyonForm />;
}

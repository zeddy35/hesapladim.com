import type { Metadata } from 'next';
import KiraGetirisiForm from './Form';

export const metadata: Metadata = {
  title: 'Kira Getirisi Hesaplama',
  description:
    'Mülk değeri, aylık kira ve giderlere göre brüt ve net kira getiri oranını ve geri ödeme süresini hesaplayın.',
  keywords: ['kira getirisi', 'kira verimi', 'gayrimenkul getiri', 'yatırım getirisi', 'kiralık ev getiri'],
  alternates: { canonical: 'https://hesaplayim.com/kira-getirisi-hesaplama' },
  openGraph: {
    title: 'Kira Getirisi Hesaplama',
    description: 'Mülk değerinize göre brüt ve net kira getiri oranını hesaplayın.',
    url: 'https://hesaplayim.com/kira-getirisi-hesaplama',
  },
};

export default function KiraGetirisiPage() {
  return <KiraGetirisiForm />;
}

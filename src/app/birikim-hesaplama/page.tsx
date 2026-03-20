import type { Metadata } from 'next';
import BirikimForm from './Form';

export const metadata: Metadata = {
  title: 'Birikim Hesaplama',
  description:
    'Başlangıç tutarı, aylık birikim ve faiz oranıyla belirli süre sonunda birikiminizin ne kadar olacağını hesaplayın.',
  keywords: ['birikim hesaplama', 'tasarruf hesaplama', 'faizli birikim', 'gelecek değer', 'aylık birikim'],
  alternates: { canonical: 'https://hesaplayim.com/birikim-hesaplama' },
  openGraph: {
    title: 'Birikim Hesaplama',
    description: 'Aylık birikim ve faiz oranıyla toplam birikimizi hesaplayın.',
    url: 'https://hesaplayim.com/birikim-hesaplama',
  },
};

export default function BirikimPage() {
  return <BirikimForm />;
}

import type { Metadata } from 'next';
import LgsPuanForm from './Form';

export const metadata: Metadata = {
  title: 'LGS Puan Hesaplama',
  description:
    'LGS doğru ve yanlış sayılarınızdan net puanınızı ve tahmini LGS puanınızı 2026 katsayılarıyla hesaplayın.',
  keywords: ['lgs puan hesaplama', 'lgs net hesaplama', 'lgs sınav puanı', 'ortaöğretim sınav', 'liselere geçiş'],
  alternates: { canonical: 'https://hesaplayim.com/lgs-puan-hesaplama' },
  openGraph: {
    title: 'LGS Puan Hesaplama',
    description: 'LGS doğru/yanlış sayılarınızdan tahmini puanınızı hesaplayın.',
    url: 'https://hesaplayim.com/lgs-puan-hesaplama',
  },
};

export default function LgsPuanPage() {
  return <LgsPuanForm />;
}

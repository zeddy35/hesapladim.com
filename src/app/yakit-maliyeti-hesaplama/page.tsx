import type { Metadata } from 'next';
import YakitMaliyetiForm from './Form';

export const metadata: Metadata = {
  title: 'Yakıt Maliyeti Hesaplama',
  description:
    'Mesafe, yakıt tüketimi ve yakıt fiyatına göre yolculuk yakıt maliyetini ve km başına maliyeti hesaplayın.',
  keywords: ['yakıt maliyeti', 'benzin hesaplama', 'yakıt tüketimi', 'yolculuk maliyeti', 'mazot hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/yakit-maliyeti-hesaplama' },
  openGraph: {
    title: 'Yakıt Maliyeti Hesaplama',
    description: 'Mesafe ve yakıt tüketimine göre yolculuk maliyetinizi hesaplayın.',
    url: 'https://hesaplayim.com/yakit-maliyeti-hesaplama',
  },
};

export default function YakitMaliyetiPage() {
  return <YakitMaliyetiForm />;
}

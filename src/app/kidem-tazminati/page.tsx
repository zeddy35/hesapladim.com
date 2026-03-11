import type { Metadata } from 'next';
import KidemTazminatiForm from '@/components/KidemTazminatiForm';

export const metadata: Metadata = {
  title: 'Kıdem Tazminatı Hesaplama 2026',
  description:
    'Giriş-çıkış tarihi ve maaşınızla kıdem tazminatı hesaplayın. 2026 tavan: 64.948 TL',
  keywords: ['kıdem tazminatı', 'kıdem tazminatı hesaplama', 'kıdem tazminatı 2026', 'kıdem hesaplama', 'tazminat hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kidem-tazminati' },
  openGraph: {
    title: 'Kıdem Tazminatı Hesaplama 2026',
    description: 'Giriş-çıkış tarihi ve maaşınızla kıdem tazminatı hesaplayın. 2026 tavan: 64.948 TL',
    url: 'https://hesaplayim.com/kidem-tazminati',
  },
};

export default function KidemTazminatiPage() {
  return <KidemTazminatiForm />;
}

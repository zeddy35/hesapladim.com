import type { Metadata } from 'next';
import KidemTazminatiForm from '@/components/KidemTazminatiForm';

export const metadata: Metadata = {
  title: 'Kıdem Tazminatı Hesaplama 2026 | Güncel Tavan ile',
  description:
    'İşe giriş ve çıkış tarihinizi girerek kıdem tazminatınızı hesaplayın. 2026 tavan: 64.948,77 TL',
  openGraph: {
    title: 'Kıdem Tazminatı Hesaplama 2026',
    description:
      '2026 güncel tavan (64.948,77 TL) ile kıdem tazminatı hesaplama aracı.',
  },
};

export default function KidemTazminatiPage() {
  return <KidemTazminatiForm />;
}

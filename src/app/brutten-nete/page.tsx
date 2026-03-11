import type { Metadata } from 'next';
import BruttenNeteForm from '@/components/BruttenNeteForm';

export const metadata: Metadata = {
  title: 'Brütten Nete Maaş Hesaplama 2026 | Güncel Vergi Dilimleri',
  description:
    '2026 güncel gelir vergisi dilimleriyle brütten nete maaş hesaplama. SGK, gelir vergisi, damga vergisi otomatik hesaplanır.',
  openGraph: {
    title: 'Brütten Nete Maaş Hesaplama 2026',
    description:
      '2026 güncel gelir vergisi dilimleriyle SGK, gelir vergisi ve damga vergisi otomatik hesaplanır.',
  },
};

export default function BruttenNetePage() {
  return <BruttenNeteForm />;
}

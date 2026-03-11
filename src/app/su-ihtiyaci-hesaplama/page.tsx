import type { Metadata } from 'next';
import SuForm from './Form';

export const metadata: Metadata = {
  title: 'Su İhtiyacı Hesaplama 2026 | Günlük Su İçme Miktarı',
  description:
    'Kilonuza, aktivitenize ve iklim koşullarına göre günlük su ihtiyacınızı (litre ve bardak olarak) hesaplayın.',
  alternates: { canonical: 'https://hesapladim.com/su-ihtiyaci-hesaplama' },
};

export default function Page() {
  return <SuForm />;
}

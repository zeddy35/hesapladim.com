import type { Metadata } from 'next';
import IdealKiloForm from './Form';

export const metadata: Metadata = {
  title: 'İdeal Kilo Hesaplama 2026 | Boy ve Cinsiyete Göre İdeal Ağırlık',
  description:
    'Devine, Robinson, Miller ve Hamilton formülleriyle boyunuza göre ideal kilonuzu hesaplayın. 4 formül karşılaştırma tablosu.',
  alternates: { canonical: 'https://hesapladim.com/ideal-kilo-hesaplama' },
};

export default function Page() {
  return <IdealKiloForm />;
}

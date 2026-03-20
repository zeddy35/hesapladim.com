import type { Metadata } from 'next';
import SuForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Su İhtiyacı Hesaplama 2026 | Günlük Su İçme Miktarı',
  description:
    'Kilonuza, aktivitenize ve iklim koşullarına göre günlük su ihtiyacınızı (litre ve bardak olarak) hesaplayın.',
  alternates: { canonical: 'https://hesaplayim.com/su-ihtiyaci-hesaplama' },
  openGraph: {
    title: 'Su İhtiyacı Hesaplama 2026 | Günlük Su İçme Miktarı',
    description: 'Günlük su ihtiyacınızı kilo ve aktivite düzeyinize göre hesaplayın.',
    url: 'https://hesaplayim.com/su-ihtiyaci-hesaplama',
  },
};

const faqs = [
  {
    q: 'Günde 8 bardak su içmek yeterli mi?',
    a: 'Ortalama yetişkin için 8 bardak (≈2 litre) su iyi bir başlangıç noktasıdır. Ancak egzersiz, sıcak hava ve vücut ağırlığı ihtiyacı artırabilir.',
  },
  {
    q: 'Çay ve kahve su yerine geçer mi?',
    a: 'Kısmen geçer ancak kafein içeren içecekler hafif idrar söktürücü etkiye sahiptir. Suyun yerini tamamen dolduramaz.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Su İhtiyacı Hesaplama', url: 'https://hesaplayim.com/su-ihtiyaci-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'Su İhtiyacı Hesaplama' },
          ]}
        />
        <SuForm />
        <InfoSection
          title="Günlük Su İhtiyacı Nasıl Hesaplanır?"
          intro="Günlük su ihtiyacı; vücut ağırlığı, aktivite düzeyi ve iklim koşullarına göre değişir. Genel kural olarak kilogram başına 30-35 ml su tüketimi önerilir."
          formula="Su İhtiyacı (ml) = Vücut Ağırlığı (kg) × 33"
          faqs={faqs}
        />
        <RelatedTools slug="su-ihtiyaci-hesaplama" />
      </div>
    </>
  );
}

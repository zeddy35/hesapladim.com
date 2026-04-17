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
  {
    q: 'Egzersiz yapınca ne kadar ekstra su içmeliyim?',
    a: 'Orta şiddette 1 saatlik egzersiz için egzersiz başına 500–700 ml ek su içilmesi önerilir. Yoğun spor yapanlarda kayıp daha fazla olabilir; idrar rengi açık sarıysa yeterli hidrasyon sağlanmıştır.',
  },
  {
    q: 'Hamile ve emziren anneler için su ihtiyacı farklı mı?',
    a: "Evet. Hamile kadınlar için günlük öneri yaklaşık 2.3 litre, emziren anneler için ise 3.1 litreye yükselir. Bu değerler içecek ve yiyeceklerden alınan suyun toplamını kapsar.",
  },
  {
    q: 'Su eksikliğinin (dehidrasyonun) belirtileri nelerdir?',
    a: 'Baş ağrısı, yorgunluk, konsantrasyon güçlüğü ve koyu renkli idrar hafif dehidrasyonun belirtileridir. %2 vücut ağırlığı kadar su kaybı bile fiziksel ve bilişsel performansı olumsuz etkiler.',
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
          intro="Günlük su ihtiyacı; vücut ağırlığı, aktivite düzeyi ve iklim koşullarına göre değişir. Genel kural olarak kilogram başına 30-35 ml su tüketimi önerilir. Bu araç ağırlığınızı ve fiziksel aktivite düzeyinizi dikkate alarak kişiselleştirilmiş bir öneri sunar."
          formula="Su İhtiyacı (ml) = Vücut Ağırlığı (kg) × 33"
          steps={[
            'Kilonuzu ve boyunuzu girin',
            'Günlük aktivite düzeyinizi seçin (sedanter, orta, aktif)',
            'İklim koşullarını belirtin (sıcak/ılıman/serin)',
            'Litre ve bardak cinsinden kişiselleştirilmiş su önerinizi görün',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="su-ihtiyaci-hesaplama" />
      </div>
    </>
  );
}

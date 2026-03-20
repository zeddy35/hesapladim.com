import type { Metadata } from 'next';
import BirikimForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Birikim Hesaplama',
  description:
    'Başlangıç tutarı, aylık birikim ve faiz oranıyla belirli süre sonunda birikiminizin ne kadar olacağını hesaplayın.',
  keywords: ['birikim hesaplama', 'tasarruf hesaplama', 'faizli birikim', 'gelecek değer', 'aylık birikim'],
  alternates: { canonical: 'https://hesaplayim.com/birikim-hesaplama' },
  openGraph: {
    title: 'Birikim Hesaplama',
    description: 'Aylık birikim ve faiz oranıyla toplam birikiminizi hesaplayın.',
    url: 'https://hesaplayim.com/birikim-hesaplama',
  },
};

const faqs = [
  {
    q: 'Bileşik faiz neden önemlidir?',
    a: 'Bileşik faizde kazanılan faiz de faiz kazanmaya devam eder. Uzun vadede bu etki çok büyür; 20 yıllık yatırımda basit faize kıyasla katbekat daha yüksek getiri sağlanabilir.',
  },
  {
    q: 'Aylık 1000 TL birikim 10 yılda ne kadar eder?',
    a: 'Yıllık %10 getiriyle aylık 1.000 TL birikimde 10 yılda yaklaşık 204.000 TL birikir. Araç size özelleştirilmiş hesaplama yapar.',
  },
];

export default function BirikimPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Birikim Hesaplama', url: 'https://hesaplayim.com/birikim-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Birikim Hesaplama' },
          ]}
        />
        <BirikimForm />
        <InfoSection
          title="Birikim (Yatırım) Nasıl Hesaplanır?"
          intro="Birikim hesaplama; aylık düzenli yatırım, başlangıç tutarı ve faiz oranına göre belirli bir süre sonunda ulaşılacak toplam tutarı gösterir. Bileşik faizin gücünü görselleştirir."
          formula="FV = PV×(1+r)^n + PMT × ((1+r)^n − 1) ÷ r"
          steps={[
            'Başlangıç tutarı ve aylık ek yatırımı girin',
            'Yıllık getiri oranını ve süreyi belirtin',
            'Toplam birikim ve kazanılan faiz gösterilir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="birikim-hesaplama" />
      </div>
    </>
  );
}

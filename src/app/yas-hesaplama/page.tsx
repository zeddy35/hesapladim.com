import type { Metadata } from 'next';
import YasForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Yaş Hesaplama - Gün Ay Yıl',
  description:
    'Doğum tarihinizden yaşınızı, burçunuzu ve doğum günü geri sayımını görün.',
  keywords: ['yaş hesaplama', 'doğum tarihi hesaplama', 'kaç yaşındayım', 'burç hesaplama', 'yaş gün hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/yas-hesaplama' },
  openGraph: {
    title: 'Yaş Hesaplama - Gün Ay Yıl',
    description: 'Doğum tarihinizden yaşınızı, burçunuzu ve doğum günü geri sayımını görün.',
    url: 'https://hesaplayim.com/yas-hesaplama',
  },
};

const faqs = [
  {
    q: 'Yaşım neden tam yıl olarak değil gösteriliyor?',
    a: 'Araç doğum gününüzü geçip geçmediğinizi kontrol eder. Henüz bu yılki doğum günü gelmediyse tamamlanan yaşınız bir önceki yıla göre hesaplanır.',
  },
  {
    q: 'Burç hesaplama nasıl yapılıyor?',
    a: 'Doğum tarihinizin ay ve gün bilgisine göre 12 burç aralığından hangisine girdiği belirlenir. Örneğin 21 Mart–19 Nisan arası Koç burcudur.',
  },
  {
    q: 'Çin burcu nasıl hesaplanır?',
    a: 'Çin burcunuzun belirlenmesinde doğum yılınız esas alınır. 12 yıllık döngüde her yıl farklı bir hayvana karşılık gelir (Fare, Öküz, Kaplan vb.).',
  },
];

export default function YasHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Yaş Hesaplama', url: 'https://hesaplayim.com/yas-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Zaman & Tarih', href: '/#zaman' },
            { label: 'Yaş Hesaplama' },
          ]}
        />
        <YasForm />
        <InfoSection
          title="Yaş Hesaplama Nasıl Çalışır?"
          intro="Doğum tarihinizden bugüne kadar geçen tam yıl, ay ve gün sayısı hesaplanır. Burç ve Çin burcu bilgisi de otomatik olarak gösterilir."
          formula="Yaş = Bugün − Doğum Tarihi (yıl, ay, gün cinsinden)"
          faqs={faqs}
        />
        <RelatedTools slug="yas-hesaplama" />
      </div>
    </>
  );
}

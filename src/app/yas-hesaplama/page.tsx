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
  {
    q: 'Hangi gün doğduğumu nasıl öğrenebilirim?',
    a: 'Doğum tarihinizi araçta girerseniz hangi haftanın gününe (Pazartesi, Salı vb.) denk geldiği Zeller veya Tomohiko Sakamoto algoritmasıyla otomatik olarak hesaplanır.',
  },
  {
    q: 'Doğum günüme kaç gün kaldı?',
    a: 'Araç bugünden bir sonraki doğum günününüze kalan gün sayısını hesaplar. Doğum günü tatil veya hafta sonu denk geliyorsa da bunu gösterir.',
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
          intro="Doğum tarihinizden bugüne kadar geçen tam yıl, ay ve gün sayısı hesaplanır. Burç, Çin burcu, doğum günü geri sayımı ve doğum gününüzün hangi güne denk geldiği de otomatik olarak gösterilir."
          formula="Yaş = Bugün − Doğum Tarihi (yıl, ay, gün cinsinden)"
          steps={[
            'Doğum tarihinizi gün/ay/yıl olarak girin',
            'Tamamlanan yaşınız, ay ve gün cinsinden hesaplanır',
            'Batı ve Çin burcu otomatik gösterilir',
            'Bir sonraki doğum gününüze kalan gün sayısını görün',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="yas-hesaplama" />
      </div>
    </>
  );
}

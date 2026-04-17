import type { Metadata } from 'next';
import OranOrantiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Oran Orantı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Oran orantı hesaplama: a/b = c/d denkleminde bilinmeyeni adım adım çözün. Doğru orantı ve ters orantı hesaplama aracı.',
  alternates: { canonical: 'https://hesaplayim.com/oran-orantiyi-hesaplama' },
  openGraph: {
    title: 'Oran Orantı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: 'a/b = c/d denkleminde bilinmeyeni adım adım bulun. Ücretsiz oran orantı çözücü.',
    url: 'https://hesaplayim.com/oran-orantiyi-hesaplama',
  },
};

const faqs = [
  {
    q: 'Orantı hesabı nedir?',
    a: 'İki oran eşitlendiğinde bilinmeyen değer çapraz çarpma yöntemiyle bulunur: A/B = C/D ise A×D = B×C.',
  },
  {
    q: 'Tarif 4 kişilik ama 6 kişi için yapmak istiyorum, nasıl hesaplarım?',
    a: 'Her malzeme miktarını 6/4 = 1.5 ile çarpmanız yeterlidir. Araç bu hesabı otomatik yapabilir.',
  },
  {
    q: 'Doğru orantı ile ters orantı arasındaki fark nedir?',
    a: 'Doğru orantıda bir büyüklük artınca diğeri de artar (hız sabit → süre artınca mesafe artar). Ters orantıda biri artınca diğeri azalır (aynı mesafe → hız artınca süre azalır). Araç her iki türü de destekler.',
  },
  {
    q: 'Harita ölçeği nasıl hesaplanır?',
    a: '1:50.000 ölçekli haritada 1 cm gerçekte 50.000 cm = 500 m\'e karşılık gelir. Harita üzerindeki mesafeyi ölçüp ölçek çarpanıyla çarpmak için oran-orantı kullanılır.',
  },
];

export default function OranOrantiHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Oran Orantı Hesaplama', url: 'https://hesaplayim.com/oran-orantiyi-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Matematik', href: '/#matematik' },
            { label: 'Oran Orantı Hesaplama' },
          ]}
        />
        <OranOrantiForm />
        <InfoSection
          title="Oran ve Orantı Nasıl Hesaplanır?"
          intro="Oran ve orantı; tarif ölçüsü büyütme, harita hesabı, yakıt tüketimi ve döviz çevirimi gibi günlük problemleri çözmede kullanılır. A/B = C/D denkleminde herhangi bir bilinmeyen girilip diğer üç değer sağlandığında sonuç anında hesaplanır."
          formula="A/B = C/D → D = B × C ÷ A"
          steps={[
            'Dört değerden bilinen üçünü (A, B, C veya D) girin',
            'Bilinmeyen (X) olarak bırakmak istediğiniz alanı boş bırakın',
            'Doğru mu ters orantı mı olduğunu seçin',
            'Sonuç ve adım adım çözüm gösterilir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="oran-orantiyi-hesaplama" />
      </div>
    </>
  );
}

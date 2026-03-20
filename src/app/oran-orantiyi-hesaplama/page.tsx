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
          intro="Oran ve orantı; tarif ölçüsü büyütme, harita hesabı, yakıt tüketimi ve döviz çevirimi gibi günlük problemleri çözmede kullanılır."
          formula="A/B = C/D → D = B × C ÷ A"
          faqs={faqs}
        />
        <RelatedTools slug="oran-orantiyi-hesaplama" />
      </div>
    </>
  );
}

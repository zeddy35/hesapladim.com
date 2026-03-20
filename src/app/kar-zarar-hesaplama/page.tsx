import type { Metadata } from 'next';
import KarZararForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kar / Zarar Hesaplama',
  description:
    'Maliyet fiyatı ve satış fiyatına göre kar veya zarar tutarını, kar marjını ve kârlılık oranını anında hesaplayın.',
  keywords: ['kar zarar', 'kar marjı', 'kar oranı', 'kârlılık', 'satış fiyatı', 'maliyet fiyatı'],
  alternates: { canonical: 'https://hesaplayim.com/kar-zarar-hesaplama' },
  openGraph: {
    title: 'Kar / Zarar Hesaplama',
    description: 'Maliyet ve satış fiyatından kar/zarar ve kârlılık oranını hesaplayın.',
    url: 'https://hesaplayim.com/kar-zarar-hesaplama',
  },
};

const faqs = [
  {
    q: 'Kâr marjı ile kâr oranı farkı nedir?',
    a: 'Kâr marjı satış fiyatına göre kâr yüzdesidir: Kâr / Satış × 100. Kâr oranı ise maliyete göre kâr yüzdesidir: Kâr / Maliyet × 100. Örneğin maliyet 80, satış 100 ise kâr marjı %20, kâr oranı %25\'tir.',
  },
  {
    q: 'Brüt ve net kâr farkı nedir?',
    a: 'Brüt kâr, satışlardan yalnızca üretim maliyeti düşüldükten sonraki tutardır. Net kâr, tüm giderler (personel, kira, vergi vb.) çıkarıldıktan sonra kalan tutardır.',
  },
];

export default function KarZararPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kar / Zarar Hesaplama', url: 'https://hesaplayim.com/kar-zarar-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Kar / Zarar Hesaplama' },
          ]}
        />
        <KarZararForm />
        <InfoSection
          title="Kar ve Zarar Nasıl Hesaplanır?"
          intro="Kar-zarar hesaplama, bir ürün veya hizmetin alış maliyeti, satış fiyatı ve kâr/zarar marjını belirlemek için kullanılır. Ticari işlemlerde, fiyatlandırma stratejilerinde ve finansal analizde temel bir araçtır. Brüt kâr marjı, net kâr marjı ve kâr yüzdesi ayrı kavramlardır."
          formula="Kâr = Satış Fiyatı - Maliyet | Kâr Marjı% = (Kâr / Satış Fiyatı) × 100"
          steps={[
            'Ürün maliyetini girin',
            'Satış fiyatını girin',
            'Kâr tutarını ve yüzdesini hesaplayın',
            'Kâr marjını ve kâr oranını karşılaştırın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kar-zarar-hesaplama" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import YuzdeForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Yüzde Hesaplama - 5 Farklı Mod',
  description:
    'Yüzde alma, ekleme, çıkarma, oran ve değişim hesaplama. Adım adım çözüm.',
  keywords: ['yüzde hesaplama', 'yüzde alma', 'yüzde artış hesaplama', 'yüzde değişim', 'indirim hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/yuzde-hesaplama' },
  openGraph: {
    title: 'Yüzde Hesaplama - 5 Farklı Mod',
    description: 'Yüzde alma, ekleme, çıkarma, oran ve değişim hesaplama. Adım adım çözüm.',
    url: 'https://hesaplayim.com/yuzde-hesaplama',
  },
};

const faqs = [
  {
    q: "100'ün %25'i kaçtır?",
    a: "100 × 25 ÷ 100 = 25. Genel formül: Sayı × Yüzde ÷ 100.",
  },
  {
    q: '500 TL\'den 750 TL\'ye artış yüzde kaçtır?',
    a: '(750 − 500) ÷ 500 × 100 = %50 artış.',
  },
  {
    q: '200 TL\'ye %20 indirim uygulanırsa fiyat ne olur?',
    a: '200 × (1 − 20÷100) = 200 × 0,80 = 160 TL.',
  },
  {
    q: 'Hangi sayı 80\'in yüzde kaçıdır?',
    a: 'Oran sorusu için: (Parça ÷ Bütün) × 100. Örneğin 20, 80\'in yüzde kaçıdır? (20 ÷ 80) × 100 = %25.',
  },
  {
    q: '%150 artış ne demek?',
    a: 'Yüzde 150 artış, değerin başlangıcına göre 1,5 kat daha fazla arttığı anlamına gelir. Örneğin 200 TL %150 arttığında 200 + 300 = 500 TL olur.',
  },
];

export default function YuzdeHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Yüzde Hesaplama', url: 'https://hesaplayim.com/yuzde-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Yüzde Hesaplama' },
          ]}
        />
        <YuzdeForm />
        <InfoSection
          title="Yüzde Hesaplama Formülleri"
          intro="Yüzde hesaplama; indirim, zam, vergi ve büyüme oranı gibi günlük finansal işlemlerde sıklıkla kullanılan temel bir matematik işlemidir."
          formula="X'in Y%'si = X × Y ÷ 100   |   Artış Oranı = (Yeni−Eski) ÷ Eski × 100"
          steps={[
            'Hesaplama türünü seçin (miktar, oran veya değişim)',
            'İlgili sayıları girin',
            'Sonuç ve formül açıklaması otomatik gösterilir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="yuzde-hesaplama" />
      </div>
    </>
  );
}

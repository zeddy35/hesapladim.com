import type { Metadata } from 'next';
import IndirimForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'İndirim Hesaplama',
  description:
    'Orijinal fiyat ve indirim oranına göre indirimli fiyatı, tasarruf edilen tutarı anında hesaplayın.',
  keywords: ['indirim hesaplama', 'indirimli fiyat', 'yüzde indirim', 'tasarruf', 'iskonto hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/indirim-hesaplama' },
  openGraph: {
    title: 'İndirim Hesaplama',
    description: 'İndirim oranı ile indirimli fiyat ve tasarrufu anında hesaplayın.',
    url: 'https://hesaplayim.com/indirim-hesaplama',
  },
};

const faqs = [
  {
    q: 'Ardışık iki indirim nasıl hesaplanır?',
    a: "Önce birinci indirim uygulanır, ardından kalan fiyata ikinci indirim. Örneğin 1.000 TL'ye önce %20 (%800), sonra %10 indirim (%720). Toplam %28 indirime karşılık gelir; %30 değil.",
  },
  {
    q: 'KDV dahil fiyata indirim uygulanır mı?',
    a: 'Genellikle evet; perakendede etiket fiyatına (KDV dahil) indirim uygulanır. Fatura düzenlenirken matrah ve KDV ayrı hesaplanır.',
  },
];

export default function IndirimPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'İndirim Hesaplama', url: 'https://hesaplayim.com/indirim-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'İndirim Hesaplama' },
          ]}
        />
        <IndirimForm />
        <InfoSection
          title="İndirim Nasıl Hesaplanır?"
          intro="İndirim hesaplama, ürünün orijinal fiyatından belirli bir yüzde veya sabit tutar indirim uygulandığında oluşan yeni fiyatı ve tasarruf miktarını hesaplamak için kullanılır. Çok kademeli indirimler, flaş indirimler ve ek kupon hesaplamaları için de kullanılabilir."
          formula="İndirimli Fiyat = Orijinal Fiyat × (1 - İndirim%) | Tasarruf = Orijinal - İndirimli"
          steps={[
            "Ürünün orijinal fiyatını girin",
            "İndirim oranını veya tutarını girin",
            "İndirimli fiyatı ve tasarruf miktarını hesaplayın",
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="indirim-hesaplama" />
      </div>
    </>
  );
}

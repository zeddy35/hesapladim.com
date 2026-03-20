import type { Metadata } from 'next';
import YuzdelikForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'YKS Yüzdelik Dilim Hesaplama 2026 | TYT SAY EA SOZ DIL',
  description:
    'YKS puanınıza göre tahmini yüzdelik diliminizi ve sıralamanızı hesaplayın. TYT, Sayısal, EA, Sözel ve Dil sınavları için 2026 verilerine dayalı tahmin.',
  alternates: { canonical: 'https://hesaplayim.com/yks-yuzdelik-dilim' },
  openGraph: {
    title: 'YKS Yüzdelik Dilim Hesaplama 2026',
    description: 'Puanınıza göre sıralama ve yüzdelik dilim tahmini.',
    url: 'https://hesaplayim.com/yks-yuzdelik-dilim',
  },
};

const faqs = [
  {
    q: 'Yüzdelik dilim ne anlama gelir?',
    a: "Yüzdelik dilim %1, aday havuzunun en iyi %1'inde olduğunuz anlamına gelir. Düşük yüzdelik dilim daha başarılı, yüksek olan daha az başarılıdır.",
  },
  {
    q: 'Kaçıncı sıra hangi okullara karşılık gelir?',
    a: "Her puan türü ve bölüm için taban puanlar farklıdır. ÖSYM'nin yerleştirme kılavuzunu ve tercih robotlarını kullanarak araştırın.",
  },
];

export default function YksYuzdelikDilimPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'YKS Yüzdelik Dilim', url: 'https://hesaplayim.com/yks-yuzdelik-dilim' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'YKS Yüzdelik Dilim' },
          ]}
        />
        <YuzdelikForm />
        <InfoSection
          title="YKS Yüzdelik Dilim Nasıl Hesaplanır?"
          intro="YKS yüzdelik dilim, sınava giren adaylar arasında kaçıncı yüzdelikte bulunduğunuzu gösterir. Puan türüne göre hesaplanır ve tercih sürecinde kritik bir göstergedir."
          formula="Yüzdelik Dilim = (Sıralamanız ÷ Toplam Aday Sayısı) × 100"
          faqs={faqs}
        />
        <RelatedTools slug="yks-yuzdelik-dilim" />
      </div>
    </>
  );
}

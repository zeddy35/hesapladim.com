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
  {
    q: 'TYT ile AYT puanları tercihte nasıl kullanılır?',
    a: 'Önlisans programlarında yalnızca TYT puanı kullanılır. Lisans programlarında ise puan türüne bağlı olarak TYT %40 + AYT %60 ağırlığıyla birleştirilir. Bazı programlar yalnızca AYT puanını esas alır.',
  },
  {
    q: 'Puan eşit olduğunda sıralamayı ne belirler?',
    a: "Eşit puan durumunda ÖSYM önce ilgili alan testinden alınan ham puana, ardından doğru sayısına ve yaşa göre sıralama yapar. Bu nedenle 0.001 puan farkının bile sıralamada etkisi olabilir.",
  },
  {
    q: 'Net sayısından puan nasıl hesaplanır?',
    a: 'Her doğru yanıt belirli bir ham puan getirir; yanlışlar 0.25 oranında çıkarılır (4 yanlış 1 doğruyu götürür). Ham puanlar ağırlıklı olarak toplanır ve standart sapma ile normalize edilerek nihai puan elde edilir.',
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
          intro="YKS yüzdelik dilim, sınava giren adaylar arasında kaçıncı yüzdelikte bulunduğunuzu gösterir. Puan türüne göre hesaplanır ve tercih sürecinde kritik bir göstergedir. TYT, Sayısal (SAY), Eşit Ağırlık (EA), Sözel (SÖZ) ve Dil (DİL) puan türlerinin tamamı desteklenir."
          formula="Yüzdelik Dilim = (Sıralamanız ÷ Toplam Aday Sayısı) × 100"
          steps={[
            'Puan türünü seçin: TYT, SAY, EA, SÖZ veya DİL',
            'Aldığınız ham puanı veya tahmini neti girin',
            'Sıralama ve yüzdelik dilim tahminini görün',
            "Tercih yapmak için ÖSYM'nin taban puan kılavuzuyla kıyaslayın",
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="yks-yuzdelik-dilim" />
      </div>
    </>
  );
}

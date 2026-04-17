import type { Metadata } from 'next';
import KiraGetirisiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kira Getirisi Hesaplama',
  description:
    'Mülk değeri, aylık kira ve giderlere göre brüt ve net kira getiri oranını ve geri ödeme süresini hesaplayın.',
  keywords: ['kira getirisi', 'kira verimi', 'gayrimenkul getiri', 'yatırım getirisi', 'kiralık ev getiri'],
  alternates: { canonical: 'https://hesaplayim.com/kira-getirisi-hesaplama' },
  openGraph: {
    title: 'Kira Getirisi Hesaplama',
    description: 'Mülk değerinize göre brüt ve net kira getiri oranını hesaplayın.',
    url: 'https://hesaplayim.com/kira-getirisi-hesaplama',
  },
};

const faqs = [
  {
    q: 'İyi bir kira getirisi kaçtır?',
    a: "Türkiye'de brüt kira getirisi şehir ve konuma göre büyük farklılık gösterir; genellikle %3-7 arası görülür. Yüksek enflasyon dönemlerinde bu oran değerleme artışlarıyla değişir.",
  },
  {
    q: 'Net kira getirisi hesabında hangi giderler düşülür?',
    a: 'Aidat, emlak vergisi, sigorta, bakım ve tadilat giderleri, boşluk dönemi kayıpları gibi kalemler düşülerek net getiriye ulaşılır.',
  },
  {
    q: 'Kira geliri vergiye tabi mi?',
    a: 'Evet. Kira geliri Türkiye\'de gelir vergisine tabidir. İstisna tutarının üzerindeki kira geliri için yıllık beyanname verilmesi gerekir.',
  },
  {
    q: 'Geri ödeme süresi (yıl) ne anlama gelir?',
    a: 'Geri ödeme süresi = Mülk Değeri ÷ Yıllık Net Kira Geliri. Bu değer, yatırımın kendini kaç yılda amorti ettiğini gösterir. Türkiye\'de büyük şehirlerde 20-30 yıl aralığı tipiktir.',
  },
  {
    q: 'Kira getirisi mi yoksa fiyat artışı mı daha iyi yatırım getirir?',
    a: 'İkisi birlikte değerlendirilmelidir; toplam getiri = kira getirisi + değer artışı. Yüksek enflasyon dönemlerinde değer artışı öne çıkarken stabil dönemlerde kira verimi daha belirleyici olur.',
  },
];

export default function KiraGetirisiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kira Getirisi Hesaplama', url: 'https://hesaplayim.com/kira-getirisi-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Kira Getirisi Hesaplama' },
          ]}
        />
        <KiraGetirisiForm />
        <InfoSection
          title="Kira Getirisi Nasıl Hesaplanır?"
          intro="Kira getirisi (rental yield), gayrimenkulün yıllık kira gelirinin mülkün toplam alış maliyetine bölünmesiyle bulunan yatırım getirisidir. Brüt kira getirisi giderleri göz ardı ederken net getiri aidat, vergi ve bakım giderlerini de hesaba katar."
          formula="Brüt Kira Getirisi% = (Yıllık Kira / Satın Alma Bedeli) × 100"
          steps={[
            'Gayrimenkulün satın alma bedelini girin',
            'Aylık kira gelirini girin',
            'Yıllık kira gelirini hesaplayın',
            'Brüt ve net getiriyi karşılaştırın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kira-getirisi-hesaplama" />
      </div>
    </>
  );
}

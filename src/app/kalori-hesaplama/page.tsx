import type { Metadata } from 'next';
import KaloriForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kalori Hesaplama 2026 | Günlük Kalori İhtiyacı (BMR / TDEE)',
  description:
    'Harris-Benedict formülüyle bazal metabolizma hızınızı (BMR) ve günlük kalori ihtiyacınızı (TDEE) hesaplayın. Kilo verme, koruma veya alma hedeflerine göre kalori tablosu.',
  alternates: { canonical: 'https://hesaplayim.com/kalori-hesaplama' },
  openGraph: {
    title: 'Kalori Hesaplama 2026 | Günlük Kalori İhtiyacı',
    description: 'Günlük kalori ihtiyacınızı BMR ve aktivite düzeyinize göre hesaplayın.',
    url: 'https://hesaplayim.com/kalori-hesaplama',
  },
};

const faqs = [
  {
    q: 'Kilo vermek için ne kadar kalori açığı gerekir?',
    a: 'Genel kural olarak günlük 500 kalori açığı haftada yaklaşık 0,5 kg yağ kaybına yol açar. Ancak bu oran kişiye göre değişir; çok düşük kalorili diyetler kas kaybına neden olabilir.',
  },
  {
    q: 'BMH nedir?',
    a: 'Bazal Metabolizma Hızı (BMH), tamamen dinlenir hâlde vücudun yalnızca temel işlevlerini sürdürmek için harcadığı enerji miktarıdır.',
  },
  {
    q: 'TDEE ne demektir?',
    a: 'Total Daily Energy Expenditure (TDEE), günlük toplam enerji harcamasıdır. BMH\'nin aktivite katsayısıyla çarpılmasıyla bulunur.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kalori Hesaplama', url: 'https://hesaplayim.com/kalori-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'Kalori Hesaplama' },
          ]}
        />
        <KaloriForm />
        <InfoSection
          title="Günlük Kalori İhtiyacı Nasıl Hesaplanır?"
          intro="Günlük kalori ihtiyacı; yaş, cinsiyet, boy, kilo ve aktivite düzeyine göre Mifflin-St Jeor formülü kullanılarak hesaplanır. Bu değer kilo vermek, almak veya korumak için temel referanstır."
          formula="Erkek BMH = 10×kg + 6.25×cm − 5×yaş + 5   |   Kadın BMH = 10×kg + 6.25×cm − 5×yaş − 161"
          steps={[
            'Boy, kilo, yaş ve cinsiyetinizi girin',
            'Aktivite düzeyinizi seçin (hareketsiz → çok aktif)',
            'Günlük kalori ihtiyacı (TDEE) hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kalori-hesaplama" />
      </div>
    </>
  );
}

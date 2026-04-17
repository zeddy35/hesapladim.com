import type { Metadata } from 'next';
import IdealKiloForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'İdeal Kilo Hesaplama 2026 | Boy ve Cinsiyete Göre İdeal Ağırlık',
  description:
    'Devine, Robinson, Miller ve Hamilton formülleriyle boyunuza göre ideal kilonuzu hesaplayın. 4 formül karşılaştırma tablosu.',
  alternates: { canonical: 'https://hesaplayim.com/ideal-kilo-hesaplama' },
  openGraph: {
    title: 'İdeal Kilo Hesaplama 2026 | Boy ve Cinsiyete Göre',
    description: 'Boyunuza ve cinsiyetinize göre ideal kilo aralığını hesaplayın.',
    url: 'https://hesaplayim.com/ideal-kilo-hesaplama',
  },
};

const faqs = [
  {
    q: 'İdeal kilo formülleri arasındaki fark nedir?',
    a: "Hamwi, Devine ve Robinson formülleri 1970'lerde klinik kullanım için geliştirilmiştir. Sonuçlar birbirine yakın olmakla birlikte kas/kemik yapısı gibi faktörleri göz ardı ederler.",
  },
  {
    q: 'Boy 1.70 için ideal kilo kaçtır?',
    a: "1.70 m boy için VKİ'ye dayalı sağlıklı kilo aralığı yaklaşık 53–72 kg'dır. Cinsiyete ve vücut yapısına göre değişebilir.",
  },
  {
    q: 'İdeal kilo ile sağlıklı kilo aynı şey midir?',
    a: 'İdeal kilo formülleri ortalama bir referans sunar; sağlıklı kilo ise VKİ 18.5–24.9 arasına denk gelen, kişisel sağlık durumu ve vücut bileşimiyle şekillenen daha geniş bir aralıktır. Sporcularda kas kütlesi yüksek olduğundan hesaplanan "ideal" kilo yetersiz kalabilir.',
  },
  {
    q: 'Çocuklar için ideal kilo nasıl hesaplanır?',
    a: "Çocuklarda VKİ yaşa ve cinsiyete göre yorumlanır; yüzdelik tablolarla karşılaştırılır. Bu araç yetişkinlere (18+) yönelik hesaplama yapar; çocuklar için bir çocuk doktoruna danışmak en doğru yoldur.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'İdeal Kilo Hesaplama', url: 'https://hesaplayim.com/ideal-kilo-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'İdeal Kilo Hesaplama' },
          ]}
        />
        <IdealKiloForm />
        <InfoSection
          title="İdeal Kilo Nasıl Hesaplanır?"
          intro="İdeal kilo hesaplama, boya göre sağlıklı sayılan kilo aralığını gösterir. Farklı formüller (Hamwi, Devine, Robinson) biraz farklı sonuçlar verir; bu araç bunları karşılaştırmalı olarak sunar."
          formula="Hamwi (Erkek): 48 kg + 2.7 × (boy cm − 152) ÷ 2.5   |   Hamwi (Kadın): 45.5 kg + 2.2 × (boy cm − 152) ÷ 2.5"
          steps={[
            'Boy ve cinsiyetinizi girin',
            'Farklı formüllere göre ideal kilo aralığı hesaplanır',
            "VKİ'ye dayalı sağlıklı kilo aralığı da ayrıca gösterilir",
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="ideal-kilo-hesaplama" />
      </div>
    </>
  );
}

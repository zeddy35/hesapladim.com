import type { Metadata } from 'next';
import VkiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'VKİ Hesaplama - Beden Kitle İndeksi',
  description:
    'Boy ve kilonuzla vücut kitle indeksi hesaplayın. İdeal kilo aralığı gösterilir.',
  keywords: ['vki hesaplama', 'beden kitle indeksi', 'bmi hesaplama', 'ideal kilo hesaplama', 'obezite hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/vki-hesaplama' },
  openGraph: {
    title: 'VKİ Hesaplama - Beden Kitle İndeksi',
    description: 'Boy ve kilonuzla vücut kitle indeksi hesaplayın. İdeal kilo aralığı gösterilir.',
    url: 'https://hesaplayim.com/vki-hesaplama',
  },
};

const faqs = [
  {
    q: 'Normal VKİ aralığı nedir?',
    a: "WHO'ya göre: 18.5 altı Zayıf, 18.5–24.9 Normal, 25–29.9 Fazla Kilolu, 30 ve üzeri Obez.",
  },
  {
    q: 'VKİ her zaman doğru sonuç verir mi?',
    a: "VKİ pratik bir göstergedir ancak kas kütlesini dikkate almaz. Sporcularda yanlış 'fazla kilolu' sonucu çıkabilir. Kesin değerlendirme için doktor kontrolü önerilir.",
  },
  {
    q: 'Çocuklar için VKİ nasıl yorumlanır?',
    a: 'Çocuklarda VKİ yaş ve cinsiyet persentilleriyle yorumlanır; yetişkin sınırları doğrudan uygulanmaz.',
  },
  {
    q: 'VKİ 25 fazla kilolu mu sayılır?',
    a: "Evet. WHO sınıflamasına göre VKİ 25,0–29,9 'fazla kilolu' kategorisindedir. Bu aralık tek başına bir hastalık göstergesi değildir; bel çevresi, yaş, cinsiyet ve genel sağlık tablosu birlikte değerlendirilmelidir.",
  },
  {
    q: 'VKİ ile karın yağı arasındaki fark nedir?',
    a: 'VKİ genel vücut ağırlığını ölçer; karın (visseral) yağı ise metabolik sağlık için daha kritiktir. Bel çevresi ölçümü (erkekte >94 cm, kadında >80 cm risk sinyali) karın yağı için daha iyi bir göstergedir.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'VKİ Hesaplama', url: 'https://hesaplayim.com/vki-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'VKİ Hesaplama' },
          ]}
        />
        <VkiForm />
        <InfoSection
          title="Vücut Kitle İndeksi (VKİ) Nasıl Hesaplanır?"
          intro="Vücut Kitle İndeksi (VKİ/BMI), boy ve kiloya göre vücut ağırlığının sağlıklı aralıkta olup olmadığını gösteren pratik bir ölçüttür. Dünya Sağlık Örgütü (WHO) tarafından standart olarak kullanılır."
          formula="VKİ = Kilo (kg) ÷ Boy² (m)   |   Örnek: 70 kg, 1.75 m → 70 ÷ (1.75²) = 22.9"
          steps={[
            'Boy ve kilonuzu girin',
            'VKİ değeri otomatik hesaplanır',
            'Sonuç; Zayıf, Normal, Fazla Kilolu veya Obez kategorisine göre değerlendirilir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="vki-hesaplama" />
      </div>
    </>
  );
}

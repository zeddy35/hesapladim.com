import type { Metadata } from 'next';
import AdimKaloriForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Adım Kalori Hesaplama 2026 | Adım Sayısına Göre Yakılan Kalori',
  description:
    'Günlük adım sayınıza, kilonuza ve boyunuza göre yakılan kalori, yürünen mesafe ve süreyi hesaplayın.',
  alternates: { canonical: 'https://hesaplayim.com/adim-kalori-hesaplama' },
  openGraph: {
    title: 'Adım Kalori Hesaplama 2026 | Adım Sayısına Göre Yakılan Kalori',
    description: 'Günlük adım sayısına göre yakılan kaloriyi hesaplayın.',
    url: 'https://hesaplayim.com/adim-kalori-hesaplama',
  },
};

const faqs = [
  {
    q: 'Günde 10.000 adım kaç kalori yakar?',
    a: "Kişinin ağırlığına bağlı olmakla birlikte 70 kg için günde 10.000 adım yaklaşık 400–500 kalori yakar.",
  },
  {
    q: 'Adım uzunluğu kaloriyi etkiler mi?',
    a: 'Evet. Daha uzun adımlarla aynı mesafe daha az adımda katedilir; toplam kalori harcaması benzer olmakla birlikte adım sayısı farklı çıkar.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Adım Kalori Hesaplama', url: 'https://hesaplayim.com/adim-kalori-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'Adım Kalori Hesaplama' },
          ]}
        />
        <AdimKaloriForm />
        <InfoSection
          title="Adım Sayısından Yakılan Kalori Nasıl Hesaplanır?"
          intro="Günlük adım sayısı, kilo ve ortalama adım uzunluğu kullanılarak yakılan kalori miktarı tahmin edilir. Yürüyüş hızı ve vücut ağırlığı kalori yakımını doğrudan etkiler."
          formula="Yakılan Kalori ≈ Adım Sayısı × 0.04 × Ağırlık (kg) ÷ 70"
          faqs={faqs}
        />
        <RelatedTools slug="adim-kalori-hesaplama" />
      </div>
    </>
  );
}

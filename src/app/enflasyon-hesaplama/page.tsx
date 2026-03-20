import type { Metadata } from 'next';
import EnflasyonForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Enflasyon Etkisi Hesaplama',
  description:
    'Enflasyon oranı ve süreye göre paranızın satın alma gücünü, değer kaybını ve gelecekteki eşdeğerini hesaplayın.',
  keywords: ['enflasyon hesaplama', 'satın alma gücü', 'değer kaybı', 'tüfe etkisi', 'enflasyon etkisi'],
  alternates: { canonical: 'https://hesaplayim.com/enflasyon-hesaplama' },
  openGraph: {
    title: 'Enflasyon Etkisi Hesaplama',
    description: 'Enflasyonun paranızın değerine etkisini hesaplayın.',
    url: 'https://hesaplayim.com/enflasyon-hesaplama',
  },
};

const faqs = [
  {
    q: 'Enflasyon tasarrufları nasıl etkiler?',
    a: 'Enflasyon oranı üzerinden getiri elde edilemeyen tasarruflar reel değer kaybeder. Örneğin %40 enflasyonda bankada %30 faizle duran para reel olarak erir.',
  },
  {
    q: 'TÜFE ile ÜFE farkı nedir?',
    a: 'TÜFE (Tüketici Fiyat Endeksi) tüketicilerin ödediği fiyatları; ÜFE (Üretici Fiyat Endeksi) üreticilerin sattığı fiyatları ölçer. Enflasyon denilince genellikle TÜFE kastedilir.',
  },
];

export default function EnflasyonPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Enflasyon Hesaplama', url: 'https://hesaplayim.com/enflasyon-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Enflasyon Etkisi Hesaplama' },
          ]}
        />
        <EnflasyonForm />
        <InfoSection
          title="Enflasyon Etkisi Nasıl Hesaplanır?"
          intro="Enflasyon hesaplama, belirli bir tutarın geçmişteki ya da gelecekteki satın alma gücünü gösterir. Ücret artışlarının reel değerini ve tasarrufların erimesini anlamak için kullanılır."
          formula="Reel Değer = Nominal Tutar ÷ (1 + Enflasyon Oranı)^Yıl"
          faqs={faqs}
        />
        <RelatedTools slug="enflasyon-hesaplama" />
      </div>
    </>
  );
}

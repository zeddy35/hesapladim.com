import type { Metadata } from 'next';
import ZamanForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Zaman Dönüştürme 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Saniye, dakika, saat, gün, hafta, ay ve yıl arasında zaman dönüştürme. Tüm birimlere anında çevirme tablosu.',
  alternates: { canonical: 'https://hesaplayim.com/zaman-donusturme' },
  openGraph: {
    title: 'Zaman Dönüştürme 2026 | Hızlı ve Güncel Hesaplama',
    description: 'Zaman birimlerini anında dönüştürün: saniye ↔ dakika ↔ saat ↔ gün ↔ hafta ↔ ay ↔ yıl.',
    url: 'https://hesaplayim.com/zaman-donusturme',
  },
};

const faqs = [
  {
    q: '1 yıl kaç gün eder?',
    a: 'Standart yılda 365 gün, artık yılda 366 gün bulunur. Ortalama olarak 1 yıl = 365.25 gün kabul edilir.',
  },
  {
    q: '1 ay kaç gün olarak alınıyor?',
    a: 'Hesaplamada ortalama ay değeri 30.44 gün (365.25 ÷ 12) olarak kullanılır.',
  },
];

export default function ZamanDonusturmePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Zaman Dönüştürme', url: 'https://hesaplayim.com/zaman-donusturme' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Zaman & Tarih', href: '/#zaman' },
            { label: 'Zaman Dönüştürme' },
          ]}
        />
        <ZamanForm />
        <InfoSection
          title="Zaman Birimleri Nasıl Dönüştürülür?"
          intro="Saniye, dakika, saat, gün, hafta, ay ve yıl arasında dönüşüm yapılır. Proje süresi hesaplamaları ve zaman yönetimi için kullanışlıdır."
          formula="1 gün = 24 saat = 1.440 dakika = 86.400 saniye"
          faqs={faqs}
        />
        <RelatedTools slug="zaman-donusturme" />
      </div>
    </>
  );
}

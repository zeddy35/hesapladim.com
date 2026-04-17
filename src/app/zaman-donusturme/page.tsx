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
  {
    q: '1 saat kaç saniyedir?',
    a: '1 saat = 60 dakika = 3.600 saniyedir. 1 gün ise 86.400 saniyeye karşılık gelir. Bu değerler bant genişliği, veri iletim hızı ve yazılım zaman aşımı hesaplamalarında sık kullanılır.',
  },
  {
    q: 'Milisaniye ile saniye farkı nedir?',
    a: '1 saniye = 1.000 milisaniyedir. Yazılım geliştirme ve ağ gecikmesi ölçümlerinde milisaniye birimi yaygın olarak kullanılır.',
  },
  {
    q: 'Proje süresini iş gününe çevirmek istiyorum, nasıl hesaplarım?',
    a: '1 iş haftası = 5 gün olduğundan, takvim günlerini iş gününe çevirmek için (toplam gün ÷ 7) × 5 formülü kullanılır. Resmi tatil günleri ayrıca çıkarılmalıdır.',
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
          intro="Saniye, dakika, saat, gün, hafta, ay ve yıl arasında dönüşüm yapılır. Proje süresi hesaplamaları, yazılım geliştirme, kira kontratı süresi ve zaman yönetimi planlamaları için sık kullanılan bir araçtır."
          formula="1 gün = 24 saat = 1.440 dakika = 86.400 saniye"
          steps={[
            'Dönüştürmek istediğiniz değeri girin',
            'Kaynak birimi seçin (örn. saat)',
            'Hedef birimi belirleyin (örn. dakika, gün)',
            'Tüm birimlere dönüştürülmüş sonuç tek tabloda görünür',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="zaman-donusturme" />
      </div>
    </>
  );
}

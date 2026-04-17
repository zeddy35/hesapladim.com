import type { Metadata } from 'next';
import TarihFarkiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Tarih Farkı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'İki tarih arasındaki gün, ay, yıl, hafta farkını anında hesaplayın. Toplam saat ve dakika da gösterilir. Ücretsiz tarih hesaplama.',
  alternates: { canonical: 'https://hesaplayim.com/tarih-farki-hesaplama' },
  openGraph: {
    title: 'Tarih Farkı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: 'İki tarih arasındaki gün, ay, yıl farkını ve X gün sonrasını hesaplayın.',
    url: 'https://hesaplayim.com/tarih-farki-hesaplama',
  },
};

const faqs = [
  {
    q: 'Ay farkı hesaplarken kısmî aylar nasıl değerlendirilir?',
    a: 'Araç tamamlanan ayları sayar; yarım aylar bir sonraki tam aya dahil edilmez.',
  },
  {
    q: 'Kıdem tazminatı hesabında tarih farkı önemli mi?',
    a: 'Evet. Çalışma süresi gün cinsinden hesaplanır ve 365\'e bölünerek yıl değeri bulunur. 1 günlük fark bile kıdem tutarını etkileyebilir.',
  },
  {
    q: 'Artık yıl tarih farkını etkiler mi?',
    a: 'Evet. Hesaplanan aralık içinde artık yıl varsa Şubat 29 günlüdür ve toplam gün sayısı buna göre artar. Araç artık yılları otomatik olarak dikkate alır.',
  },
  {
    q: 'İki tarih arasındaki iş günü sayısını nasıl hesaplarım?',
    a: 'Hafta sonu ve resmi tatil günleri çıkarılarak iş günü sayısı hesaplanır. Sözleşme ve ihbar süreleri için iş günü hesabı önemlidir; ilgili araç resmi tatilleri de dikkate alır.',
  },
];

export default function TarihFarkiHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Tarih Farkı Hesaplama', url: 'https://hesaplayim.com/tarih-farki-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Zaman & Tarih', href: '/#zaman' },
            { label: 'Tarih Farkı Hesaplama' },
          ]}
        />
        <TarihFarkiForm />
        <InfoSection
          title="İki Tarih Arasındaki Fark Nasıl Hesaplanır?"
          intro="İki tarih arasındaki gün, hafta, ay ve yıl farkı hesaplanır. Sözleşme süreleri, kıdem hesabı, proje takibi, vize geçerlilik süresi gibi durumlarda sık başvurulan bir hesaplamadır. Araç artık yılları ve kısmi ayları otomatik yönetir."
          formula="Fark = Bitiş Tarihi − Başlangıç Tarihi"
          steps={[
            'Başlangıç tarihini seçin (örn. işe giriş tarihi)',
            'Bitiş tarihini girin (örn. bugün veya sözleşme bitiş tarihi)',
            'Yıl, ay, hafta ve gün cinsinden fark hesaplanır',
            'İleri tarih hesabı için "X gün sonrası" özelliğini kullanın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="tarih-farki-hesaplama" />
      </div>
    </>
  );
}

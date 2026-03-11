import type { Metadata } from 'next';
import TarihFarkiForm from './Form';

export const metadata: Metadata = {
  title: 'Tarih Farkı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'İki tarih arasındaki gün, ay, yıl, hafta farkını anında hesaplayın. Toplam saat ve dakika da gösterilir. Ücretsiz tarih hesaplama.',
  alternates: { canonical: 'https://hesapladim.com/tarih-farki-hesaplama' },
  openGraph: {
    title: 'Tarih Farkı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: 'İki tarih arasındaki gün, ay, yıl farkını ve X gün sonrasını hesaplayın.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'İki tarih arasındaki gün farkı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Başlangıç ve bitiş tarihlerini seçin; araç gün, ay, yıl, hafta, toplam saat ve dakika cinsinden farkı otomatik hesaplar.',
      },
    },
    {
      '@type': 'Question',
      name: 'X gün sonrası hangi tarihe denk gelir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Başlangıç tarihini seçip "X gün sonra" alanına gün sayısını girin. Araç hedef tarihi otomatik olarak hesaplar.',
      },
    },
    {
      '@type': 'Question',
      name: 'İki tarih arasındaki iş günü nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bu araç takvim günlerini hesaplar. Toplam gün sayısını 7\'ye bölüp hafta sayısını, kalan günü de iş günü tahmini için kullanabilirsiniz. Resmi tatiller ayrıca çıkarılmalıdır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kaç günde bir yılı doldurur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Artık yıl olmayan yıllarda 365 gün, artık yıllarda 366 gün bulunur. Artık yıl: 4\'e bölünebilen ama 100\'e bölünemeyen ya da 400\'e bölünebilen yıllardır.',
      },
    },
  ],
};

export default function TarihFarkiHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TarihFarkiForm />
    </>
  );
}

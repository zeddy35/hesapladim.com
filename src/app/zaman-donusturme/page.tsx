import type { Metadata } from 'next';
import ZamanForm from './Form';

export const metadata: Metadata = {
  title: 'Zaman Dönüştürme 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Saniye, dakika, saat, gün, hafta, ay ve yıl arasında zaman dönüştürme. Tüm birimlere anında çevirme tablosu.',
  alternates: { canonical: 'https://hesapladim.com/zaman-donusturme' },
  openGraph: {
    title: 'Zaman Dönüştürme 2026 | Hızlı ve Güncel Hesaplama',
    description: 'Zaman birimlerini anında dönüştürün: saniye ↔ dakika ↔ saat ↔ gün ↔ hafta ↔ ay ↔ yıl.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '1 gün kaç saattir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1 gün = 24 saat = 1.440 dakika = 86.400 saniyedir.',
      },
    },
    {
      '@type': 'Question',
      name: '1 yıl kaç gündür?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standart hesaplamada 1 yıl = 365 gün = 8.760 saat = 525.600 dakikadır. Artık yıllarda 366 gündür.',
      },
    },
    {
      '@type': 'Question',
      name: '1 hafta kaç saattir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1 hafta = 7 gün = 168 saat = 10.080 dakika = 604.800 saniyedir.',
      },
    },
    {
      '@type': 'Question',
      name: '1 ay kaç gündür?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standart hesaplamada 1 ay = 30 gün = 720 saat = 43.200 dakika kabul edilir. Gerçek ay uzunluğu 28-31 gün arasında değişir.',
      },
    },
  ],
};

export default function ZamanDonusturmePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ZamanForm />
    </>
  );
}

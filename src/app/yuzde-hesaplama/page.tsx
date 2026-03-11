import type { Metadata } from 'next';
import YuzdeForm from './Form';

export const metadata: Metadata = {
  title: 'Yüzde Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Yüzde hesaplama aracı: sayının yüzdesi, yüzde artış/azalış, iki sayı arası yüzde değişim. 5 farklı yüzde hesaplama modu.',
  alternates: { canonical: 'https://hesapladim.com/yuzde-hesaplama' },
  openGraph: {
    title: 'Yüzde Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: '5 farklı modda yüzde hesaplama: artış, azalış, oran, değişim.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Yüzde nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bir sayının yüzdesini bulmak için: Sonuç = Sayı × Yüzde ÷ 100. Örnek: 200'nin %25'i = 200 × 25 ÷ 100 = 50.",
      },
    },
    {
      '@type': 'Question',
      name: 'Yüzde artış nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yüzde artış: Yeni Değer = Eski Değer × (1 + Oran ÷ 100). Örnek: 500 ₺\'ye %20 zam → 500 × 1.20 = 600 ₺.',
      },
    },
    {
      '@type': 'Question',
      name: 'İki sayı arasındaki yüzde değişim nasıl bulunur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yüzde Değişim = ((Yeni − Eski) ÷ Eski) × 100. Sonuç pozitifse artış, negatifse azalış vardır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bir sayı başka bir sayının yüzde kaçıdır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oran = (Küçük Sayı ÷ Büyük Sayı) × 100. Örnek: 30, 120\'nin yüzde kaçıdır? (30 ÷ 120) × 100 = %25.',
      },
    },
  ],
};

export default function YuzdeHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <YuzdeForm />
    </>
  );
}

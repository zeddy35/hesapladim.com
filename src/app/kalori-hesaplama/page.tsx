import type { Metadata } from 'next';
import KaloriForm from './Form';

export const metadata: Metadata = {
  title: 'Kalori Hesaplama 2026 | Günlük Kalori İhtiyacı (BMR / TDEE)',
  description:
    'Harris-Benedict formülüyle bazal metabolizma hızınızı (BMR) ve günlük kalori ihtiyacınızı (TDEE) hesaplayın. Kilo verme, koruma veya alma hedeflerine göre kalori tablosu.',
  alternates: { canonical: 'https://hesapladim.com/kalori-hesaplama' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Günlük kalori ihtiyacım nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Günlük kalori ihtiyacı; yaş, cinsiyet, boy, kilo ve aktivite seviyesine göre değişir. Ortalama yetişkin için 1800–2500 kcal/gün arasındadır.',
      },
    },
    {
      '@type': 'Question',
      name: 'BMR nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BMR (Bazal Metabolizma Hızı), vücudunuzun hiç hareket etmeden, tamamen dinlenirken harcadığı enerji miktarıdır.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KaloriForm />
    </>
  );
}

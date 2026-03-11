import type { Metadata } from 'next';
import TytForm from './Form';

export const metadata: Metadata = {
  title: 'TYT Puan Hesaplama 2026 - ÖSYM',
  description:
    'Doğru/yanlış sayısı girerek TYT puanınızı hesaplayın. 2026 ÖSYM katsayıları.',
  keywords: ['tyt puan hesaplama', 'tyt net hesaplama', 'tyt 2026', 'ösym puan hesaplama', 'tyt tahmini puan'],
  alternates: { canonical: 'https://hesaplayim.com/tyt-puan-hesaplama' },
  openGraph: {
    title: 'TYT Puan Hesaplama 2026 - ÖSYM',
    description: 'Doğru/yanlış sayısı girerek TYT puanınızı hesaplayın. 2026 ÖSYM katsayıları.',
    url: 'https://hesaplayim.com/tyt-puan-hesaplama',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'TYT puanı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TYT ham puanı: Taban (100) + Türkçe net × 4 + Temel Matematik net × 3 + Fen Bilimleri net × 2 + Sosyal Bilimler net × 2 formülüyle hesaplanır. Her yanlış, 1/4 oranında net düşürür. ÖSYM bu ham puanı standardize ederek 100–500 arasında bir TYT puanına dönüştürür.',
      },
    },
    {
      '@type': 'Question',
      name: 'TYT\'de 250 puan iyi midir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '250 puan, yaklaşık %10\'luk dilime karşılık gelir. Devlet üniversitelerinin bir kısmına yerleşim için yeterlidir ancak popüler bölümler için daha yüksek puan gerekebilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'TYT\'de kaç net yapmalıyım?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '250 puan için yaklaşık 70–75 toplam net, 300 puan için 90–95 toplam net hedeflenmelidir. Türkçe ve matematik katsayısı daha yüksek olduğundan bu alanlarda net sayısı önemlidir.',
      },
    },
  ],
};

export default function TytPuanHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TytForm />
    </>
  );
}

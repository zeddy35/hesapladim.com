import type { Metadata } from 'next';
import AlanForm from './Form';

export const metadata: Metadata = {
  title: 'Alan Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Kare, dikdörtgen, üçgen, daire, trapez, paralelkenar ve elips için alan ve çevre hesaplama. Formül gösterimi ve birim seçimi.',
  alternates: { canonical: 'https://hesapladim.com/alan-hesaplama' },
  openGraph: {
    title: 'Alan Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: '7 şekil için alan ve çevre hesaplama aracı. Formül adım adım gösterilir.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dairenin alanı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daire alanı = π × r² formülüyle hesaplanır. r yarıçaptır. Örneğin r=5 cm için alan = π × 25 ≈ 78,54 cm².',
      },
    },
    {
      '@type': 'Question',
      name: 'Üçgenin alanı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Üçgen alanı = (taban × yükseklik) ÷ 2 formülüyle bulunur. Yükseklik, tabana dik olan uzunluktur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Trapezin alanı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trapez alanı = ((a + b) ÷ 2) × h formülüyle bulunur. a ve b paralel kenarlar, h ise yüksekliktir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Alan birimi dönüşümü nasıl yapılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1 m² = 10.000 cm² = 1.000.000 mm². 1 km² = 1.000.000 m². Bu araçta birim seçimi yaparak sonucu istediğiniz birimde alabilirsiniz.',
      },
    },
  ],
};

export default function AlanHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AlanForm />
    </>
  );
}

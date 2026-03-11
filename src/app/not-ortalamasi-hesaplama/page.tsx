import type { Metadata } from 'next';
import NotOrtalamasiForm from './Form';

export const metadata: Metadata = {
  title: 'Not Ortalaması Hesaplama | Ağırlıklı Ortalama ve GPA',
  description:
    'Ders notlarınızı ve kredilerini girerek ağırlıklı not ortalamanızı (GNO), harf notunuzu ve 4\'lük GPA değerinizi hesaplayın.',
  alternates: { canonical: 'https://hesapladim.com/not-ortalamasi-hesaplama' },
  openGraph: {
    title: 'Not Ortalaması Hesaplama | GNO ve GPA Hesapla',
    description: 'Ağırlıklı not ortalaması, harf notu ve GPA hesaplama aracı.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ağırlıklı not ortalaması nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ağırlıklı ortalama = (Her ders notu × Kredisi) toplamı ÷ Toplam kredi sayısı. Örneğin 3 kredilik 80\'lik ders + 2 kredilik 90\'lık ders = (240+180)÷5 = 84 ortalama.',
      },
    },
    {
      '@type': 'Question',
      name: 'GPA 4.0 ölçeğine nasıl dönüştürülür?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AA (90-100) = 4.0, BA (85-89) = 3.5, BB (80-84) = 3.0, CB (75-79) = 2.5, CC (70-74) = 2.0 şeklinde dönüşüm yapılır.',
      },
    },
  ],
};

export default function NotOrtalamasiHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NotOrtalamasiForm />
    </>
  );
}

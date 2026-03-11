import type { Metadata } from 'next';
import AytForm from './Form';

export const metadata: Metadata = {
  title: 'AYT Puan Hesaplama 2024 | Sayısal EA Sözel Dil Puanı Hesapla',
  description:
    'AYT Sayısal, Eşit Ağırlık, Sözel ve Dil puan hesaplama aracı. 2024 ÖSYM katsayılarıyla net puanınızı anında hesaplayın.',
  alternates: { canonical: 'https://hesapladim.com/ayt-puan-hesaplama' },
  openGraph: {
    title: 'AYT Puan Hesaplama 2024 | SAY EA SOZ DIL',
    description: 'AYT puan hesaplama — tüm alanlar için net ve tahmini puan.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'AYT puanı nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AYT puanı, seçilen alana göre farklı katsayılar uygulanarak hesaplanır. Sayısal için Matematik, Fizik, Kimya, Biyoloji; EA için Matematik ve Edebiyat; Sözel için Edebiyat ve tarih/coğrafya dersleri kullanılır.',
      },
    },
    {
      '@type': 'Question',
      name: 'AYT ve TYT puanı nasıl birleşir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YKS yerleştirme puanı, TYT puanının %40\'ı ile AYT puanının %60\'ının toplamından oluşur. AYT puanı, yerleştirme puanında belirleyici ağırlığa sahiptir.',
      },
    },
  ],
};

export default function AytPuanHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AytForm />
    </>
  );
}

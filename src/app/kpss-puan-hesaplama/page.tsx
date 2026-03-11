import type { Metadata } from 'next';
import KpssForm from './Form';

export const metadata: Metadata = {
  title: 'KPSS Puan Hesaplama 2026',
  description:
    'KPSS P3, P10, P93, P94 puanlarını hesaplayın. GK ve GY netleriyle anlık sonuç.',
  keywords: ['kpss puan hesaplama', 'kpss p3 hesaplama', 'kpss p10 hesaplama', 'kpss 2026', 'kpss net hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kpss-puan-hesaplama' },
  openGraph: {
    title: 'KPSS Puan Hesaplama 2026',
    description: 'KPSS P3, P10, P93, P94 puanlarını hesaplayın. GK ve GY netleriyle anlık sonuç.',
    url: 'https://hesaplayim.com/kpss-puan-hesaplama',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'KPSS P3 ve P10 farkı nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPSS P3 lisans mezunları için geçerli atama puanıdır. P10 önlisans mezunları için kullanılır. Her ikisi de GK ve GY testlerinden hesaplanır.',
      },
    },
    {
      '@type': 'Question',
      name: 'KPSS P93 ve P94 nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'P93 ve P94, öğretmen atamasında kullanılan ÖABT (Öğretmenlik Alan Bilgisi Testi) puan türleridir. GK+GY (%30) ve ÖABT (%40) kombinasyonundan hesaplanır.',
      },
    },
    {
      '@type': 'Question',
      name: 'KPSS\'de kaç net yapmalıyım?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '2024 atamalarında P3\'te 70+ puan için GK ve GY\'de toplam 80-90 net hedeflenmelidir. Öğretmen ataması için P93/P94 en kritik puandır.',
      },
    },
  ],
};

export default function KpssPuanHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KpssForm />
    </>
  );
}

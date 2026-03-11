import type { Metadata } from 'next';
import VkiForm from './Form';

export const metadata: Metadata = {
  title: 'VKİ Hesaplama - Beden Kitle İndeksi',
  description:
    'Boy ve kilonuzla vücut kitle indeksi hesaplayın. İdeal kilo aralığı gösterilir.',
  keywords: ['vki hesaplama', 'beden kitle indeksi', 'bmi hesaplama', 'ideal kilo hesaplama', 'obezite hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/vki-hesaplama' },
  openGraph: {
    title: 'VKİ Hesaplama - Beden Kitle İndeksi',
    description: 'Boy ve kilonuzla vücut kitle indeksi hesaplayın. İdeal kilo aralığı gösterilir.',
    url: 'https://hesaplayim.com/vki-hesaplama',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'VKİ nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VKİ = Kilo (kg) ÷ Boy² (m). Örneğin 70 kg ve 175 cm için VKİ = 70 ÷ (1.75²) = 22.9.',
      },
    },
    {
      '@type': 'Question',
      name: 'Normal VKİ değeri nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VKİ 18.5–24.9 arasındaysa normal kilolu, 25–29.9 fazla kilolu, 30 ve üzeri obez olarak değerlendirilir.',
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
      <VkiForm />
    </>
  );
}

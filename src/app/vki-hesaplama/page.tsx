import type { Metadata } from 'next';
import VkiForm from './Form';

export const metadata: Metadata = {
  title: 'VKİ Hesaplama 2026 | Vücut Kitle İndeksi (BMI) Hesapla',
  description:
    'Boy ve kilonuza göre VKİ (BMI) değerinizi, ideal kilo aralığınızı ve obezite durumunuzu anında hesaplayın. 2026 güncel kategoriler.',
  alternates: { canonical: 'https://hesapladim.com/vki-hesaplama' },
  openGraph: { title: 'VKİ / BMI Hesaplama 2026', url: 'https://hesapladim.com/vki-hesaplama' },
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

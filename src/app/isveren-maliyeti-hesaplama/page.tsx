import type { Metadata } from 'next';
import IsverenMaliyetiForm from './Form';

export const metadata: Metadata = {
  title: 'İşveren Maliyeti Hesaplama 2026 | SGK İşveren Payı',
  description:
    'Brüt maaş üzerinden SGK işveren payı (%15,5) ve işsizlik sigortasıyla toplam işveren maliyetini hesaplayın.',
  keywords: ['işveren maliyeti', 'sgk işveren payı', 'işçi maliyeti', 'bordro maliyeti', 'çalıştırma maliyeti'],
  alternates: { canonical: 'https://hesaplayim.com/isveren-maliyeti-hesaplama' },
  openGraph: {
    title: 'İşveren Maliyeti Hesaplama 2026',
    description: 'SGK işveren payı ve tüm primlerle toplam çalıştırma maliyetini hesaplayın.',
    url: 'https://hesaplayim.com/isveren-maliyeti-hesaplama',
  },
};

export default function IsverenMaliyetiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'İşveren maliyeti nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Toplam işveren maliyeti = Brüt maaş + SGK işveren payı (%15,5) + İşsizlik sigortası işveren payı (%2). Standart hesaplamada brüt maaşın yaklaşık %117,5\'i kadar ödeme yapılır.',
                },
              },
            ],
          }),
        }}
      />
      <IsverenMaliyetiForm />
    </>
  );
}

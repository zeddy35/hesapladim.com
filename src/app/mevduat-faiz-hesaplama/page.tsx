import type { Metadata } from 'next';
import MevduatFaizForm from './Form';

export const metadata: Metadata = {
  title: 'Mevduat Faiz Hesaplama 2026 | Net Kazanç ve Stopaj',
  description:
    'Mevduat faiz hesaplama: anapara, faiz oranı ve vadeye göre net kazanç, stopaj vergisi ve vade karşılaştırması.',
  alternates: { canonical: 'https://hesapladim.com/mevduat-faiz-hesaplama' },
};

export default function MevduatFaizPage() {
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
                name: 'Mevduat faizinden stopaj kesiliyor mu?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evet. 2026 yılında TL mevduat faiz gelirlerinden %15 stopaj (tevkifat) kesilmektedir.',
                },
              },
              {
                '@type': 'Question',
                name: 'Mevduat faizi nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Brüt faiz = Anapara × (Faiz Oranı / 100) × (Vade / 365) formülüyle hesaplanır. Stopaj düşüldükten sonra net kazanç elde edilir.',
                },
              },
            ],
          }),
        }}
      />
      <MevduatFaizForm />
    </>
  );
}

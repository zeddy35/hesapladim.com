import type { Metadata } from 'next';
import NettenBruteForm from './Form';

export const metadata: Metadata = {
  title: 'Netten Brüte Maaş Hesaplama 2026',
  description:
    'Almak istediğiniz net maaşa göre brüt rakamını 2026 SGK ve vergi dilimleriyle tersine hesaplayın.',
  keywords: ['netten brüte', 'net maaş brüt hesaplama', 'brüt maaş bulma', 'maaş hesaplama 2026'],
  alternates: { canonical: 'https://hesaplayim.com/netten-brute-hesaplama' },
  openGraph: {
    title: 'Netten Brüte Maaş Hesaplama 2026',
    description: 'Hedef net maaşınızdan brüt rakamı ve tüm kesintileri tersine hesaplayın.',
    url: 'https://hesaplayim.com/netten-brute-hesaplama',
  },
};

export default function NettenBrutePage() {
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
                name: 'Netten brüte nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Net maaştan brüt maaşa ulaşmak için iteratif yöntem kullanılır. SGK, işsizlik, gelir vergisi ve damga vergisi kesintileri ile AGİ dikkate alınarak hedef net maaşı verecek brüt hesaplanır.',
                },
              },
              {
                '@type': 'Question',
                name: '2026 yılında net-brüt farkı ne kadar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2026\'da bekar bir çalışan için brüt maaşın yaklaşık %80-85\'i net olarak ele geçmektedir. Kesintiler: SGK işçi payı %14, işsizlik %1, gelir vergisi (dilime göre %15-40) ve damga vergisi %0,759.',
                },
              },
            ],
          }),
        }}
      />
      <NettenBruteForm />
    </>
  );
}

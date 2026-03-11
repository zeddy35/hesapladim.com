import type { Metadata } from 'next';
import FazlaMesaiForm from './Form';

export const metadata: Metadata = {
  title: 'Fazla Mesai Hesaplama 2026 | Haftalık, Gece, Tatil Zammı',
  description:
    'Brüt maaşınızdan saatlik ücretinizi ve fazla mesai tutarını hesaplayın. Haftalık %50, tatil %100 zam.',
  alternates: { canonical: 'https://hesaplayim.com/fazla-mesai-hesaplama' },
};

export default function FazlaMesaiPage() {
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
                name: 'Fazla mesai ücreti nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Saatlik ücret = Brüt Maaş / (Haftalık Normal Mesai × 4,33). Haftalık ve gece fazla mesaisi x1,5, resmi tatilde x2 ile çarpılır.',
                },
              },
              {
                '@type': 'Question',
                name: 'Fazla mesai yıllık sınırı nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'İş Kanunu 41. maddesi uyarınca fazla mesai yılda 270 saatle sınırlandırılmıştır.',
                },
              },
            ],
          }),
        }}
      />
      <FazlaMesaiForm />
    </>
  );
}

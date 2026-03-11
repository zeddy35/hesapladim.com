import type { Metadata } from 'next';
import OtvForm from './Form';

export const metadata: Metadata = {
  title: 'ÖTV Hesaplama 2026 | Araç ÖTV ve KDV Dökümü',
  description:
    '2026 araç ÖTV oranlarıyla liste fiyatından ÖTV ve KDV miktarını hesaplayın. 0-1600cc, 1601-2000cc, 2001cc+ ve elektrikli araçlar.',
  alternates: { canonical: 'https://hesapladim.com/otv-hesaplama' },
};

export default function OtvPage() {
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
                name: '2026 araç ÖTV oranları nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2026 yılında binek araçlarda ÖTV oranları: 0–1600 cc %45, 1601–2000 cc %145, 2001 cc+ %220, elektrikli araçlar %10 olarak uygulanmaktadır.',
                },
              },
              {
                '@type': 'Question',
                name: 'Araç fiyatının ne kadarı vergi?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1600 cc üstü benzinli araçlarda lisans fiyatının %60\'ından fazlası ÖTV ve KDV\'den oluşabilir.',
                },
              },
            ],
          }),
        }}
      />
      <OtvForm />
    </>
  );
}

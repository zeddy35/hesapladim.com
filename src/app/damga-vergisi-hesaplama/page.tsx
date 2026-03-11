import type { Metadata } from 'next';
import DamgaVergisiForm from './Form';

export const metadata: Metadata = {
  title: 'Damga Vergisi Hesaplama 2026 | Belge Türüne Göre Oran',
  description:
    'Kira kontratı, maaş bordrosu, sözleşme ve diğer belgeler için 2026 damga vergisi hesaplama.',
  alternates: { canonical: 'https://hesapladim.com/damga-vergisi-hesaplama' },
};

export default function DamgaVergisiPage() {
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
                name: 'Kira kontratının damga vergisi oranı nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Kira kontratları için damga vergisi oranı binde 1,89 (‰1,89) olarak uygulanmaktadır.',
                },
              },
              {
                '@type': 'Question',
                name: 'Maaş bordrosu damga vergisi oranı nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Maaş bordrolarında brüt tutar üzerinden binde 7,59 (‰7,59) damga vergisi kesilir.',
                },
              },
            ],
          }),
        }}
      />
      <DamgaVergisiForm />
    </>
  );
}

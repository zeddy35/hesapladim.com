import type { Metadata } from 'next';
import TapuHarciForm from './Form';

export const metadata: Metadata = {
  title: 'Tapu Harcı Hesaplama 2026 | Satış, Bağış, İpotek',
  description:
    'Gayrimenkul satış, bağış ve ipotek işlemleri için 2026 tapu harcı hesaplama. Alıcı ve satıcı payları ayrı gösterilir.',
  alternates: { canonical: 'https://hesapladim.com/tapu-harci-hesaplama' },
};

export default function TapuHarciPage() {
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
                name: 'Tapu harcı oranı 2026 nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2026 yılında satış işlemlerinde hem alıcı hem satıcı ayrı ayrı beyan değeri üzerinden %2 tapu harcı öder. Bağış işlemlerinde alıcı %3, ipotek işlemlerinde ise borçlu binde 4,55 öder.',
                },
              },
              {
                '@type': 'Question',
                name: 'DASK zorunlu mu?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evet. Zorunlu Deprem Sigortası (DASK) tüm konutlar için zorunludur. Tapu işlemlerinde DASK poliçesi ibrazı istenir. Prim tutarı binanın konumuna, yaşına ve yapı tipine göre değişir.',
                },
              },
            ],
          }),
        }}
      />
      <TapuHarciForm />
    </>
  );
}

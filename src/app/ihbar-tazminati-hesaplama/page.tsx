import type { Metadata } from 'next';
import IhbarTazminatiForm from './Form';

export const metadata: Metadata = {
  title: 'İhbar Tazminatı Hesaplama 2026 | İş Kanunu 17. Madde',
  description:
    'İşe giriş ve çıkış tarihinizden ihbar süresini ve tazminat tutarını hesaplayın. İş Kanunu 17. madde.',
  alternates: { canonical: 'https://hesapladim.com/ihbar-tazminati-hesaplama' },
};

export default function IhbarTazminatiPage() {
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
                name: 'İhbar tazminatı ne kadar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'İhbar tazminatı; çalışma süresine göre belirlenen ihbar süresi (2–8 hafta) × günlük brüt ücret formülüyle hesaplanır. Günlük brüt, aylık brütün 30\'a bölümüdür.',
                },
              },
              {
                '@type': 'Question',
                name: 'İhbar süresi kaç hafta?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '0–6 ay: 2 hafta, 6 ay–1,5 yıl: 4 hafta, 1,5–3 yıl: 6 hafta, 3 yıl ve üzeri: 8 hafta.',
                },
              },
            ],
          }),
        }}
      />
      <IhbarTazminatiForm />
    </>
  );
}

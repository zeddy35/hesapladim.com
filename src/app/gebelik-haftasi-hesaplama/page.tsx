import type { Metadata } from 'next';
import GebelikForm from './Form';

export const metadata: Metadata = {
  title: 'Gebelik Haftası Hesaplama 2026 | Kaçıncı Haftadasınız?',
  description:
    'Son adet tarihinizi girerek gebelik haftanızı, tahmini doğum tarihinizi ve trimester bilgisini hesaplayın. Haftalık bebek büyüklüğü bilgisi ile.',
  alternates: { canonical: 'https://hesapladim.com/gebelik-haftasi-hesaplama' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Gebelik haftası nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gebelik haftası, son adet tarihinizden (SAT) itibaren geçen süre üzerinden hesaplanır. Doktorlar ve bu araç SAT bazlı hesaplama kullanır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tahmini doğum tarihi nasıl bulunur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Naegele kuralına göre son adet tarihine 280 gün (40 hafta) eklenir. Bu araç aynı yöntemi kullanır.',
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
      <GebelikForm />
    </>
  );
}

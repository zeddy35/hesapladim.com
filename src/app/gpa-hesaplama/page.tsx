import type { Metadata } from 'next';
import GpaForm from './Form';

export const metadata: Metadata = {
  title: 'GPA Hesaplama | 4.0 ve 100\'lük Sistem',
  description:
    'Harf notlarınızı ve kredi saatlerinizi girerek GPA 4.0 ve 100\'lük not ortalamanızı hesaplayın. Mezuniyet ve onur durumunuzu öğrenin.',
  alternates: { canonical: 'https://hesapladim.com/gpa-hesaplama' },
  openGraph: {
    title: 'GPA Hesaplama | 4.0 ve 100\'lük Sistem',
    description: 'Harf notu ile GPA 4.0 hesaplama aracı.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'GPA 4.0 nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GPA = (Her ders harf puanı × Kredi) toplamı ÷ Toplam kredi. AA=4.0, BA=3.5, BB=3.0, CB=2.5, CC=2.0, DC=1.5, DD=1.0, FD=0.5, FF=0.0 değerleri kullanılır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Şeref öğrencisi olmak için kaç GPA gerekir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Türkiye\'deki üniversitelerin çoğunda 3.0 GPA Onur, 3.5 GPA Yüksek Onur (Şeref) öğrencisi olarak kabul edilir. Koşullar üniversiteden üniversiteye farklılık gösterebilir.',
      },
    },
  ],
};

export default function GpaHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GpaForm />
    </>
  );
}

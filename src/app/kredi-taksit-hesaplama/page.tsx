import type { Metadata } from 'next';
import KrediTaksitForm from './Form';

export const metadata: Metadata = {
  title: 'Kredi Taksit Hesaplama 2026 | Aylık Taksit & Faiz',
  description:
    'Anapara, yıllık faiz oranı ve vadeye göre aylık taksit, toplam ödeme ve toplam faiz tutarını hesaplayın.',
  keywords: ['kredi taksit hesaplama', 'aylık taksit', 'kredi faiz', 'konut kredisi', 'ihtiyaç kredisi', 'taşıt kredisi'],
  alternates: { canonical: 'https://hesaplayim.com/kredi-taksit-hesaplama' },
  openGraph: {
    title: 'Kredi Taksit Hesaplama 2026',
    description: 'Aylık taksit, toplam ödeme ve faiz yükünüzü anında hesaplayın.',
    url: 'https://hesaplayim.com/kredi-taksit-hesaplama',
  },
};

export default function KrediTaksitPage() {
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
                name: 'Kredi taksiti nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Eşit taksitli formül: Taksit = P x r(1+r)^n / ((1+r)^n - 1). P=anapara, r=aylık faiz oranı (yıllık/12), n=vade ay sayısı.',
                },
              },
              {
                '@type': 'Question',
                name: 'Toplam kredi faizi nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Toplam faiz = Toplam Ödeme - Anapara. Toplam ödeme = Aylık Taksit x Vade (ay).',
                },
              },
            ],
          }),
        }}
      />
      <KrediTaksitForm />
    </>
  );
}

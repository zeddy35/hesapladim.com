import type { Metadata } from 'next';
import YuzdelikForm from './Form';

export const metadata: Metadata = {
  title: 'YKS Yüzdelik Dilim Hesaplama 2024 | TYT SAY EA SOZ DIL',
  description:
    'YKS puanınıza göre tahmini yüzdelik diliminizi ve sıralamanızı hesaplayın. TYT, Sayısal, EA, Sözel ve Dil sınavları için 2024 verilerine dayalı tahmin.',
  alternates: { canonical: 'https://hesapladim.com/yks-yuzdelik-dilim' },
  openGraph: {
    title: 'YKS Yüzdelik Dilim Hesaplama 2024',
    description: 'Puanınıza göre sıralama ve yüzdelik dilim tahmini.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'YKS yüzdelik dilim ne anlama gelir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yüzdelik dilim, sınava giren tüm adaylar içinde kaç kişinin sizden düşük puan aldığını gösterir. Örneğin %10\'luk dilimde olmak, sınava giren adayların %90\'ından yüksek puan aldığınız anlamına gelir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hangi dilim hangi üniversiteye denk gelir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Genel olarak ilk %1 prestijli devlet üniversitelerinin popüler bölümleri, ilk %10 iyi devlet üniversiteleri, ilk %30 orta düzey devlet üniversiteleri için yeterli kabul edilebilir. Ancak kesin sonuç için ÖSYM Atlas\'ı kullanın.',
      },
    },
  ],
};

export default function YksYuzdelikDilimPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <YuzdelikForm />
    </>
  );
}

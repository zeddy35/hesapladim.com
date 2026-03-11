import type { Metadata } from 'next';
import KiraArtisForm from './Form';

export const metadata: Metadata = {
  title: 'Kira Artış Hesaplama 2026 | Yasal Tavan TÜFE Oranı',
  description:
    '2026 TÜFE 12 aylık ortalama kira artış tavanına göre yeni kiranızı ve yasal üst sınırı hesaplayın.',
  alternates: { canonical: 'https://hesapladim.com/kira-artis-hesaplama' },
  openGraph: {
    title: 'Kira Artış Hesaplama 2026 | Yasal Tavan',
    description: '2026 TÜFE bazlı yasal kira artış tavanını ve yeni kira tutarınızı hesaplayın.',
  },
};

export default function KiraArtisPage() {
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
                name: '2026 kira artış tavanı ne kadar?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2026 yılı için kira artış tavanı, TÜİK tarafından açıklanan TÜFE 12 aylık ortalama değişim oranı olan %28,82 olarak belirlenmiştir.',
                },
              },
              {
                '@type': 'Question',
                name: 'Kiracı yasal tavanın üzerinde artış reddedebilir mi?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Evet. Türk Borçlar Kanunu 344. maddesi uyarınca konut kiralarında yasal tavan (TÜFE 12 aylık ortalama) aşılamaz. Üzerindeki artış talepleri geçersizdir.',
                },
              },
            ],
          }),
        }}
      />
      <KiraArtisForm />
    </>
  );
}

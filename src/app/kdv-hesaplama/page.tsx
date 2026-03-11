import type { Metadata } from 'next';
import KdvForm from './Form';

export const metadata: Metadata = {
  title: 'KDV Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'KDV hesaplama aracı ile KDV hariç ve dahil fiyatları 2026 oranlarıyla (%1, %8, %10, %18, %20) anında hesaplayın. KDV ekleme ve çıkarma.',
  alternates: { canonical: 'https://hesapladim.com/kdv-hesaplama' },
  openGraph: {
    title: 'KDV Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: '2026 KDV oranlarıyla KDV hariç/dahil hesaplama. Tüm oranlar karşılaştırmalı tablo.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'KDV nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KDV Hariç tutardan: KDV Tutarı = Tutar × KDV Oranı ÷ 100. KDV Dahil tutardan çıkarmak için: KDV Hariç = KDV Dahil ÷ (1 + KDV Oranı ÷ 100).',
      },
    },
    {
      '@type': 'Question',
      name: "Türkiye'de KDV oranları nelerdir 2026?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "2026 KDV oranları: %1 (temel gıda, gazete), %8 (bazı gıdalar, sağlık hizmetleri), %10 (bazı hizmetler), %18 (genel oran – çoğu ürün ve hizmet), %20 (lüks ürünler, alkol, tütün).",
      },
    },
    {
      '@type': 'Question',
      name: 'KDV dahil fiyattan KDV nasıl çıkarılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KDV Hariç Tutar = KDV Dahil Tutar ÷ (1 + KDV Oranı ÷ 100). Örnek: 1.180 ₺ KDV Dahil (18%) → 1.180 ÷ 1.18 = 1.000 ₺ KDV Hariç.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hangi ürünlerde hangi KDV oranı uygulanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '%1: Süt, yumurta, gazete. %8: İşlenmiş gıda, ilaç. %18: Elektronik, giyim, mobilya, hizmetler. %20: Alkol, tütün, lüks ürünler. Güncel liste için GİB web sitesini kontrol edin.',
      },
    },
  ],
};

export default function KdvHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <KdvForm />
    </>
  );
}

import type { Metadata } from 'next';
import OranOrantiForm from './Form';

export const metadata: Metadata = {
  title: 'Oran Orantı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Oran orantı hesaplama: a/b = c/d denkleminde bilinmeyeni adım adım çözün. Doğru orantı ve ters orantı hesaplama aracı.',
  alternates: { canonical: 'https://hesapladim.com/oran-orantiyi-hesaplama' },
  openGraph: {
    title: 'Oran Orantı Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: 'a/b = c/d denkleminde bilinmeyeni adım adım bulun. Ücretsiz oran orantı çözücü.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Oran orantı nasıl kurulur?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oran orantı a/b = c/d şeklinde kurulur. Dört sayıdan biri bilinmeyense; çapraz çarpım yöntemiyle bilinmeyen = (bilinen × bilinen) ÷ diğer bilinen formülüyle hesaplanır.',
      },
    },
    {
      '@type': 'Question',
      name: 'Doğru orantı ve ters orantı arasındaki fark nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Doğru orantıda iki büyüklük aynı yönde değişir (biri artarsa diğeri de artar): a₁/a₂ = b₁/b₂. Ters orantıda ise ters yönde değişir (biri artarsa diğeri azalır): a₁ × b₁ = a₂ × b₂.',
      },
    },
    {
      '@type': 'Question',
      name: 'Çapraz çarpım yöntemi nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'a/b = c/d orantısında çapraz çarpım: a × d = b × c. Bu eşitlik bilinmeyeni bulmak için kullanılır. Örneğin d bilinmiyorsa d = (b × c) ÷ a.',
      },
    },
    {
      '@type': 'Question',
      name: 'Günlük hayatta oran orantı nerelerde kullanılır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tarif ölçekleme, döviz çevirme, harita ölçeği, yüzde hesaplama, karışım oranları, hız-süre-mesafe problemleri gibi pek çok alanda oran orantı kullanılır.',
      },
    },
  ],
};

export default function OranOrantiHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <OranOrantiForm />
    </>
  );
}

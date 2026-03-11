import type { Metadata } from 'next';
import YasForm from './Form';

export const metadata: Metadata = {
  title: 'Yaş Hesaplama - Gün Ay Yıl',
  description:
    'Doğum tarihinizden yaşınızı, burçunuzu ve doğum günü geri sayımını görün.',
  keywords: ['yaş hesaplama', 'doğum tarihi hesaplama', 'kaç yaşındayım', 'burç hesaplama', 'yaş gün hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/yas-hesaplama' },
  openGraph: {
    title: 'Yaş Hesaplama - Gün Ay Yıl',
    description: 'Doğum tarihinizden yaşınızı, burçunuzu ve doğum günü geri sayımını görün.',
    url: 'https://hesaplayim.com/yas-hesaplama',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Yaş nasıl hesaplanır?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yaş, bugünün yılından doğum yılı çıkarılarak hesaplanır. Henüz doğum günü gelmemişse bir çıkarılır. Bu araç gün, ay ve yıl cinsinden tam yaşı otomatik hesaplar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Burç tarihleri nelerdir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Koç: 21 Mart–19 Nisan | Boğa: 20 Nisan–20 Mayıs | İkizler: 21 Mayıs–20 Haziran | Yengeç: 21 Haz–22 Tem | Aslan: 23 Tem–22 Ağu | Başak: 23 Ağu–22 Eyl | Terazi: 23 Eyl–22 Eki | Akrep: 23 Eki–21 Kas | Yay: 22 Kas–21 Ara | Oğlak: 22 Ara–19 Oca | Kova: 20 Oca–18 Şub | Balık: 19 Şub–20 Mar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Doğum günüme kaç gün kaldı?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Doğum tarihinizi girin; araç bir sonraki doğum gününüze kalan gün sayısını otomatik hesaplar ve "🎂 Doğum günün X gün sonra!" şeklinde gösterir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kaç günlük olduğumu nasıl öğrenirim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Doğum tarihinizden bugüne kadar geçen tam gün sayısı, tarih farkı formülüyle hesaplanır: (Bugün − Doğum Tarihi) / 86.400.000 milisaniye. Bu araç bu hesabı otomatik yapar.',
      },
    },
  ],
};

export default function YasHesaplamaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <YasForm />
    </>
  );
}

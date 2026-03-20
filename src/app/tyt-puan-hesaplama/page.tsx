import type { Metadata } from 'next';
import TytForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'TYT Puan Hesaplama 2026 - ÖSYM',
  description:
    'Doğru/yanlış sayısı girerek TYT puanınızı hesaplayın. 2026 ÖSYM katsayıları.',
  keywords: ['tyt puan hesaplama', 'tyt net hesaplama', 'tyt 2026', 'ösym puan hesaplama', 'tyt tahmini puan'],
  alternates: { canonical: 'https://hesaplayim.com/tyt-puan-hesaplama' },
  openGraph: {
    title: 'TYT Puan Hesaplama 2026 - ÖSYM',
    description: 'Doğru/yanlış sayısı girerek TYT puanınızı hesaplayın. 2026 ÖSYM katsayıları.',
    url: 'https://hesaplayim.com/tyt-puan-hesaplama',
  },
};

const faqs = [
  {
    q: "TYT'de kaç doğru kaç yanlışı götürür?",
    a: 'Her 4 yanlış 1 doğruyu götürür (0,25 ceza). Boş bırakmak ceza getirmez.',
  },
  {
    q: 'TYT taban puanı nedir?',
    a: "Üniversiteye yerleşebilmek için TYT'den en az 150 puan almak gerekir. Bu puan eşiğini geçmeden AYT puanı hesaba katılmaz.",
  },
  {
    q: "TYT puanı AYT'yi etkiler mi?",
    a: "Evet. Bazı programlarda TYT puanı ağırlıklı olarak hesaplamaya girer. YKS yerleştirme puanı = TYT Puanı × Ağırlık + AYT Puanı × Ağırlık formülüyle hesaplanır.",
  },
];

export default function TytPuanHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'TYT Puan Hesaplama', url: 'https://hesaplayim.com/tyt-puan-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'TYT Puan Hesaplama' },
          ]}
        />
        <TytForm />
        <InfoSection
          title="TYT Puanı Nasıl Hesaplanır?"
          intro="Temel Yeterlilik Testi (TYT) puanı; Türkçe, Temel Matematik, Fen Bilimleri ve Sosyal Bilimler testlerindeki doğru ve yanlış sayısına göre ÖSYM formülüyle hesaplanır."
          formula="Ham Puan = Doğru − (Yanlış × 0,25)   |   TYT Puan = Sabit + Katsayı × Ham Puan"
          steps={[
            'Her testteki doğru ve yanlış sayılarını girin',
            'Ham puan otomatik hesaplanır (yanlış 0,25 olarak düşülür)',
            "ÖSYM katsayılarıyla TYT ham puanı ve tahmini yerleştirme puanı gösterilir",
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="tyt-puan-hesaplama" />
      </div>
    </>
  );
}

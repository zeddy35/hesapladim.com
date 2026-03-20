import type { Metadata } from 'next';
import KpssForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'KPSS Puan Hesaplama 2026',
  description:
    'KPSS P3, P10, P93, P94 puanlarını hesaplayın. GK ve GY netleriyle anlık sonuç.',
  keywords: ['kpss puan hesaplama', 'kpss p3 hesaplama', 'kpss p10 hesaplama', 'kpss 2026', 'kpss net hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kpss-puan-hesaplama' },
  openGraph: {
    title: 'KPSS Puan Hesaplama 2026',
    description: 'KPSS P3, P10, P93, P94 puanlarını hesaplayın. GK ve GY netleriyle anlık sonuç.',
    url: 'https://hesaplayim.com/kpss-puan-hesaplama',
  },
};

const faqs = [
  {
    q: "KPSS'de kaç soru var?",
    a: "Lisans KPSS'sinde Genel Yetenek 60, Genel Kültür 60 soru olmak üzere toplam 120 soru bulunur. Her yanlış 0,25 doğruyu götürür.",
  },
  {
    q: 'KPSS P3 ile P93 farkı nedir?',
    a: 'P3: Ortaöğretim mezunları için. P93: Önlisans mezunları için. P94: Lisans mezunları için. Her puan türü farklı kadrolar için kullanılır.',
  },
  {
    q: '60 KPSS puanı iyi midir?',
    a: 'Atama yapılan kadrolara ve yıla göre değişmekle birlikte, genel idare hizmetleri kadrolarında 70+ puan çoğunlukla tercih edilir. Bazı özelleşmiş kadrolarda 60 puan yeterli olabilir.',
  },
];

export default function KpssPuanHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'KPSS Puan Hesaplama', url: 'https://hesaplayim.com/kpss-puan-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'KPSS Puan Hesaplama' },
          ]}
        />
        <KpssForm />
        <InfoSection
          title="KPSS Puanı Nasıl Hesaplanır?"
          intro="Kamu Personeli Seçme Sınavı (KPSS) puanı; Genel Yetenek ve Genel Kültür testlerindeki ham puanların ÖSYM standart puanlama formülüyle dönüştürülmesiyle elde edilir."
          formula="Ham Puan = Doğru − (Yanlış × 0,25)   |   KPSS Puanı = 50 + 10 × ((Ham−Ortalama) ÷ StandartSapma)"
          steps={[
            'Genel Yetenek ve Genel Kültür testlerindeki doğru/yanlış sayılarını girin',
            'Önlisans, lisans veya ortaöğretim türünü seçin',
            'Tahmini KPSS puanı hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kpss-puan-hesaplama" />
      </div>
    </>
  );
}

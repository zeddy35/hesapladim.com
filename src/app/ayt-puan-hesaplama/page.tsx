import type { Metadata } from 'next';
import AytForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'AYT Puan Hesaplama 2026 | Sayısal EA Sözel Dil Puanı Hesapla',
  description:
    'AYT Sayısal, Eşit Ağırlık, Sözel ve Dil puan hesaplama aracı. 2026 ÖSYM katsayılarıyla net puanınızı anında hesaplayın.',
  alternates: { canonical: 'https://hesaplayim.com/ayt-puan-hesaplama' },
  openGraph: {
    title: 'AYT Puan Hesaplama 2026 | SAY EA SOZ DIL',
    description: 'AYT puan hesaplama — tüm alanlar için net ve tahmini puan.',
    url: 'https://hesaplayim.com/ayt-puan-hesaplama',
  },
};

const faqs = [
  {
    q: "AYT'de kaç test var?",
    a: "AYT'de 4 test bulunur: Matematik, Fen Bilimleri, Türk Dili ve Edebiyatı-Sosyal Bilimler 1, Sosyal Bilimler 2. Adaylar tercihlerine göre ilgili testlere girer.",
  },
  {
    q: 'SAY puanı nasıl hesaplanır?',
    a: 'SAY (Sayısal) puanında Matematik ve Fen ağırlıklıdır. TYT ham puanı %40, AYT SAY ham puanı %60 ağırlıkla birleştirilir.',
  },
  {
    q: "AYT'de yanlış yapınca puan düşer mi?",
    a: 'Evet, her 4 yanlış 1 doğruyu götürür. Ceza katsayısı 0,25\'tir.',
  },
  {
    q: 'EA ile SAY puanı arasındaki fark nedir?',
    a: 'EA (Eşit Ağırlık) puanı Türkçe ve Matematik testlerini eşit ağırlıkta değerlendirirken SAY puanı Matematik ve Fen Bilimleri ağırlıklıdır. İktisat, işletme gibi bölümler EA; mühendislik bölümleri SAY puanı kullanır.',
  },
  {
    q: "YKS yerleştirmesinde AYT puanı yeterli mi?",
    a: "Hayır. Lisans programları için TYT'den asgari puan şartı (genellikle 150 veya 180) sağlanmalıdır. TYT barajını geçmeyen adaylar, aldıkları AYT puanına bakılmaksızın yerleştirilmez.",
  },
];

export default function AytPuanHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'AYT Puan Hesaplama', url: 'https://hesaplayim.com/ayt-puan-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'AYT Puan Hesaplama' },
          ]}
        />
        <AytForm />
        <InfoSection
          title="AYT Puanı Nasıl Hesaplanır?"
          intro="Alan Yeterlilik Testi (AYT) puanı; tercih edilen alana (Sayısal, Sözel, Eşit Ağırlık, Dil) göre farklı test ağırlıklarıyla hesaplanır. Her puan türü farklı katsayılarla TYT puanıyla birleştirilerek YKS yerleştirme puanını oluşturur."
          formula="YKS Puanı = 0,4 × TYT + 0,6 × AYT (puan türüne göre değişir)"
          steps={[
            'AYT testlerindeki doğru/yanlış sayılarını girin',
            'Puan türünü seçin (SAY, SÖZ, EA, DİL)',
            'ÖSYM katsayılarıyla tahmini puan hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="ayt-puan-hesaplama" />
      </div>
    </>
  );
}

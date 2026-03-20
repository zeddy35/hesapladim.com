import type { Metadata } from 'next';
import LgsPuanForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'LGS Puan Hesaplama',
  description:
    'LGS doğru ve yanlış sayılarınızdan net puanınızı ve tahmini LGS puanınızı 2026 katsayılarıyla hesaplayın.',
  keywords: ['lgs puan hesaplama', 'lgs net hesaplama', 'lgs sınav puanı', 'ortaöğretim sınav', 'liselere geçiş'],
  alternates: { canonical: 'https://hesaplayim.com/lgs-puan-hesaplama' },
  openGraph: {
    title: 'LGS Puan Hesaplama',
    description: "LGS doğru/yanlış sayılarınızdan tahmini puanınızı hesaplayın.",
    url: 'https://hesaplayim.com/lgs-puan-hesaplama',
  },
};

const faqs = [
  {
    q: "LGS'de yanlışlar doğruyu götürür mü?",
    a: "Hayır, LGS'de yanlış cevaplar doğruları etkilemez. Sadece doğru cevaplar puana katkı sağlar.",
  },
  {
    q: 'Anadolu lisesi için kaç puan gerekiyor?',
    a: 'Her yıl değişmekle birlikte, Anadolu lisesi için genel olarak LGS puanının ortalama 400-450 üzerinde olması gerekmektedir. Fen liseleri için 500\'ün üstü genellikle beklenir.',
  },
  {
    q: 'LGS yerleştirme nasıl yapılır?',
    a: 'LGS puanı ve okul türü tercihi esas alınarak merkezi sisteme göre yerleştirme yapılır. Puan eşitliğinde OBP (Okul Başarı Puanı) devreye girer.',
  },
];

export default function LgsPuanPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'LGS Puan Hesaplama', url: 'https://hesaplayim.com/lgs-puan-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim', href: '/#egitim' },
            { label: 'LGS Puan Hesaplama' },
          ]}
        />
        <LgsPuanForm />
        <InfoSection
          title="LGS Puanı Nasıl Hesaplanır?"
          intro="LGS (Liselere Geçiş Sınavı) puan hesaplama, 8. sınıf öğrencilerinin Türkçe, Matematik, Fen Bilimleri ve Sosyal Bilgiler testlerindeki doğru/yanlış sayısına göre tahmini puan ve sıralamayı hesaplar. Puanlar, yanlışlar doğruları olumsuz etkilemeyecek şekilde ham puan üzerinden normalize edilir."
          formula="Puan = Ağırlıklı Ham Puan → standart puana dönüştürülür (yıla göre değişir)"
          steps={[
            'Her testteki doğru ve yanlış sayısını girin',
            'Ham net puanı hesaplayın',
            'Tahmini standart puanı görün',
            'Yaklaşık sıralamayı ve okul türünü değerlendirin',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="lgs-puan-hesaplama" />
      </div>
    </>
  );
}

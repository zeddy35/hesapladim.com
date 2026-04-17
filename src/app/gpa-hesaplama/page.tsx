import type { Metadata } from 'next';
import GpaForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: "GPA Hesaplama | 4.0 ve 100'lük Sistem",
  description:
    "Harf notlarınızı ve kredi saatlerinizi girerek GPA 4.0 ve 100'lük not ortalamanızı hesaplayın. Mezuniyet ve onur durumunuzu öğrenin.",
  alternates: { canonical: 'https://hesaplayim.com/gpa-hesaplama' },
  openGraph: {
    title: "GPA Hesaplama | 4.0 ve 100'lük Sistem",
    description: 'Harf notu ile GPA 4.0 hesaplama aracı.',
    url: 'https://hesaplayim.com/gpa-hesaplama',
  },
};

const faqs = [
  {
    q: '3.5 GPA iyi midir?',
    a: '3.5 GPA (yaklaşık A−) yüksek lisans başvuruları için oldukça iyi sayılır. İyi üniversiteler genellikle 3.0+ arar.',
  },
  {
    q: "Türkiye 100'lük notumu GPA'ya nasıl çeviririm?",
    a: "WES veya Türkiye Yükseköğretim Yeterlilikler Çerçevesi standart dönüşüm tablolarını kullanabilirsiniz. Araç bu dönüşümü otomatik gerçekleştirir.",
  },
  {
    q: 'GPA ile GNO arasındaki fark nedir?',
    a: "GPA (Grade Point Average) 4.0 üzerinden uluslararası sistemde kullanılır. GNO (Genel Not Ortalaması) ise Türkiye'deki 4.0'lık sistemin karşılığıdır. İkisi aynı ölçeği kullanır; fark yalnızca isimde ve bazı üniversitelerin harf notu eşleştirmesindedir.",
  },
  {
    q: "Başarısız olunan ders GPA'yı nasıl etkiler?",
    a: 'FF veya 0.0 not alan dersler GPA hesabına dahil edilir ve ortalamayı düşürür. Dersi tekrar alıp geçmek ortalamayı yükseltir; bazı üniversiteler yalnızca son notu hesaba katar.',
  },
];

export default function GpaHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'GPA Hesaplama', url: 'https://hesaplayim.com/gpa-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'GPA Hesaplama' },
          ]}
        />
        <GpaForm />
        <InfoSection
          title="GPA (4.0 Sistemi) Nasıl Hesaplanır?"
          intro="GPA (Grade Point Average), özellikle yurt dışı başvurularında kullanılan 4.0'lık not sistemidir. Türkiye'deki 4'lük GNO doğrudan karşılık gelir; 100'lük sistemden dönüşüm ise tabloya göre yapılır. Bu araç hem 4.0 hem de 100'lük sistemi destekler ve mezuniyet onur durumunu da gösterir."
          formula="GPA = Σ(Puan × Kredi) ÷ Toplam Kredi"
          steps={[
            "Her ders için harf notunu veya 100'lük notu girin",
            'Dersin kredi saatini ekleyin',
            'Tüm dersler girildikten sonra GPA otomatik hesaplanır',
            'Sonucu mezuniyet onur (cum laude) tablosuyla kıyaslayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="gpa-hesaplama" />
      </div>
    </>
  );
}

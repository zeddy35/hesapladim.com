import type { Metadata } from 'next';
import KrediTaksitForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kredi Taksit Hesaplama 2026 | Aylık Taksit & Faiz',
  description:
    'Anapara, yıllık faiz oranı ve vadeye göre aylık taksit, toplam ödeme ve toplam faiz tutarını hesaplayın.',
  keywords: ['kredi taksit hesaplama', 'aylık taksit', 'kredi faiz', 'konut kredisi', 'ihtiyaç kredisi', 'taşıt kredisi'],
  alternates: { canonical: 'https://hesaplayim.com/kredi-taksit-hesaplama' },
  openGraph: {
    title: 'Kredi Taksit Hesaplama 2026',
    description: 'Aylık taksit, toplam ödeme ve faiz yükünüzü anında hesaplayın.',
    url: 'https://hesaplayim.com/kredi-taksit-hesaplama',
  },
};

const faqs = [
  {
    q: 'BSMV ve KKDF nedir?',
    a: 'BSMV (Banka ve Sigorta Muameleleri Vergisi) %5 oranında faiz üzerinden alınır. KKDF (Kaynak Kullanımını Destekleme Fonu) tüketici kredilerinde %15\'tir. Bu kesintiler etkin faiz oranını yükseltir.',
  },
  {
    q: 'Sabit ve değişken faizli kredi farkı nedir?',
    a: 'Sabit faizli kredide taksitler vade boyunca değişmez. Değişken faizli kredide ise piyasa faizine göre taksit tutarları artabilir veya azalabilir.',
  },
  {
    q: 'Erken ödeme yapmak avantajlı mı?',
    a: 'Erken kapatma hem faiz maliyetini azaltır hem de kalan taksit yükünü ortadan kaldırır; ancak bazı bankalar erken ödeme ücreti talep edebilir.',
  },
  {
    q: 'Vadeyi uzatmak taksiti düşürür mü?',
    a: 'Evet, aylık taksit miktarı düşer; ancak daha uzun süre faiz ödeneceğinden toplam maliyet artar. Örneğin 500.000 TL kredide 24 ay yerine 48 aya geçmek aylık taksiti yaklaşık yarıya indirir ama toplam faiz yükünü önemli ölçüde artırır.',
  },
  {
    q: 'Etkin yıllık faiz oranı (EYF) nedir?',
    a: "Etkin yıllık faiz oranı; BSMV, KKDF ve diğer masraflar dahil gerçek yıllık maliyeti gösterir. Bankalar yasal olarak EYF'yi açıklamak zorundadır; bu oran ilan edilen faizden her zaman yüksektir.",
  },
];

export default function KrediTaksitPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kredi Taksit Hesaplama', url: 'https://hesaplayim.com/kredi-taksit-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Kredi Taksit Hesaplama' },
          ]}
        />
        <KrediTaksitForm />
        <InfoSection
          title="Kredi Taksiti Nasıl Hesaplanır?"
          intro="Kredi taksit hesaplama, alınan kredinin aylık taksit miktarını, toplam geri ödeme tutarını ve toplam faiz maliyetini hesaplamak için kullanılır. Türkiye'de bireysel kredilerde BSMV ve KKDF eklendiğinde etkin faiz oranı ilan edilen faiz oranından yüksek olabilir."
          formula="Taksit = P × [r(1+r)^n] / [(1+r)^n - 1] | P=anapara, r=aylık faiz, n=taksit sayısı"
          steps={[
            'Kredi tutarını girin',
            'Yıllık veya aylık faiz oranını girin',
            'Vadeyi (ay) seçin',
            'Aylık taksit ve toplam geri ödeme tutarını görün',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kredi-taksit-hesaplama" />
      </div>
    </>
  );
}

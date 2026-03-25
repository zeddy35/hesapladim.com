import type { Metadata } from 'next';
import YasalFaizForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Yasal Faiz Hesaplama 2026',
  description: 'Alacak ve borçlarınız için güncel yasal faiz ve avans faiz tutarını hesaplayın.',
  keywords: ['yasal faiz hesaplama', 'avans faizi', 'faiz hesaplama', 'alacak faizi', 'borçlar kanunu faiz'],
  alternates: { canonical: 'https://hesaplayim.com/yasal-faiz-hesaplama' },
  openGraph: {
    title: 'Yasal Faiz Hesaplama 2026',
    description: 'Alacak ve borçlarınız için güncel yasal faiz ve avans faiz tutarını hesaplayın.',
    url: 'https://hesaplayim.com/yasal-faiz-hesaplama',
  },
};

const faqs = [
  {
    q: 'Yasal faiz oranı nedir?',
    a: "3095 Sayılı Kanun'a göre yasal faiz oranı Türkiye Cumhuriyet Merkez Bankası'nın belirlediği oranlara göre değişir. 2024 itibarıyla yıllık %9 olarak uygulanmaktadır; güncel oran için TCMB sitesini kontrol edin.",
  },
  {
    q: 'Avans faizi ile yasal faiz farkı nedir?',
    a: 'Yasal faiz ticari olmayan alacaklarda uygulanır. Avans faizi ise ticari işlemler ve ticaret mahkemelerindeki davalar için kullanılır; oranı yasal faizden yüksektir.',
  },
  {
    q: 'Mahkeme kararında faiz başlangıç tarihi ne zaman?',
    a: 'Genellikle dava açma tarihi veya temerrüt tarihi faizin başlangıcı olarak kabul edilir. Bazı durumlarda faturanın vade tarihi esas alınır.',
  },
  {
    q: 'Bileşik yasal faiz uygulanır mı?',
    a: "Türk hukukunda kural olarak basit faiz uygulanır. Bileşik faiz ancak tarafların açıkça anlaşması veya ticari örf ve adet gerektirdiğinde uygulanabilir.",
  },
];

export default function YasalFaizHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Yasal Faiz Hesaplama', url: 'https://hesaplayim.com/yasal-faiz-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'Yasal Faiz Hesaplama' },
          ]}
        />
        <YasalFaizForm />
        <InfoSection
          title="Yasal Faiz Nasıl Hesaplanır?"
          intro="Yasal faiz, Türk Borçlar Kanunu Madde 88 ve 120 uyarınca borcun vadesinde ödenmemesi durumunda alacaklının talep edebileceği asgari faiz oranıdır. Ticari işlerde avans faizi esas alınır. Mahkeme kararlarında ve icra takiplerinde yasal faiz hesabı sıklıkla kullanılır."
          formula="Faiz = Anapara × (Oran / 100) × (Gün Sayısı / 365)"
          steps={[
            'Anapara tutarını girin',
            'Başlangıç ve bitiş tarihlerini seçin',
            'Faiz türünü seçin',
            'Toplam faiz ve ana para+faiz toplamını görün',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="yasal-faiz-hesaplama" />
      </div>
    </>
  );
}

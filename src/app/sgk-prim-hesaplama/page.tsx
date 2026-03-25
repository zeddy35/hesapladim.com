import type { Metadata } from 'next';
import SgkPrimForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'SGK Prim Hesaplama 2026 — İşçi ve İşveren Payı',
  description: 'Brüt maaş üzerinden SGK ve işsizlik sigortası prim tutarlarını hesaplayın.',
  keywords: ['sgk prim hesaplama', 'sgk işçi payı', 'sgk işveren payı', 'işsizlik sigortası', 'prim 2026'],
  alternates: { canonical: 'https://hesaplayim.com/sgk-prim-hesaplama' },
  openGraph: {
    title: 'SGK Prim Hesaplama 2026 — İşçi ve İşveren Payı',
    description: 'Brüt maaş üzerinden SGK ve işsizlik sigortası prim tutarlarını hesaplayın.',
    url: 'https://hesaplayim.com/sgk-prim-hesaplama',
  },
};

const faqs = [
  {
    q: 'SGK prim tavanı nedir?',
    a: "SGK prim tavanı asgari ücretin 7,5 katıdır. 2026 asgari ücreti 33.030 TL olduğuna göre tavan yaklaşık 247.725 TL'dir. Tavan üzerindeki ücret kısmı prim hesabına dahil edilmez.",
  },
  {
    q: '5 puanlık teşvik nedir?',
    a: "İşverenin ödemesi gereken %20,5 SGK payının 5 puanı Hazine tarafından karşılanır. Bu teşvikten yararlanan işverenler yalnızca %15,5 SGK işveren payı öder.",
  },
  {
    q: 'Prim ödeme gün sayısı ne anlama gelir?',
    a: "Bir takvim ayında SGK'ya bildirilen çalışma gün sayısıdır. Tam ay çalışmada genellikle 30 gün bildirilir. Eksik çalışma veya ücretsiz izin varsa gün sayısı düşer.",
  },
  {
    q: "Asgari ücretle çalışanda SGK kesintisi ne kadar?",
    a: "2026'da asgari ücret 33.030 TL brüt olduğunda: SGK işçi payı 4.624 TL, işsizlik işçi payı 330 TL olmak üzere toplam 4.954 TL işçiden kesilir.",
  },
];

export default function SgkPrimHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'SGK Prim Hesaplama', url: 'https://hesaplayim.com/sgk-prim-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'SGK Prim Hesaplama' },
          ]}
        />
        <SgkPrimForm />
        <InfoSection
          title="SGK Primleri Nasıl Hesaplanır?"
          intro="5510 Sayılı Sosyal Sigortalar Kanunu'na göre SGK primleri, çalışanın brüt ücreti üzerinden hesaplanır. İşçi payı ücretten kesilirken işveren payı ayrıca ödenir. Prim hesaplamasında alt sınır asgari ücret, üst sınır ise asgari ücretin 7,5 katıdır (2026 itibarıyla)."
          formula="SGK İşçi: Brüt × %14 | SGK İşveren: Brüt × %20,5 | İşsizlik İşçi: Brüt × %1 | İşsizlik İşveren: Brüt × %2"
          steps={[
            'Brüt ücreti girin',
            'SGK teşvik durumunu seçin',
            'İşçi ve işveren primlerini görün',
            'Toplam işveren maliyetini hesaplayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="sgk-prim-hesaplama" />
      </div>
    </>
  );
}

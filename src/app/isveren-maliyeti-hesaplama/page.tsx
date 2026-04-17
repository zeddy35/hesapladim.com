import type { Metadata } from 'next';
import IsverenMaliyetiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'İşveren Maliyeti Hesaplama 2026 | SGK İşveren Payı',
  description:
    'Brüt maaş üzerinden SGK işveren payı (%15,5) ve işsizlik sigortasıyla toplam işveren maliyetini hesaplayın.',
  keywords: ['işveren maliyeti', 'sgk işveren payı', 'işçi maliyeti', 'bordro maliyeti', 'çalıştırma maliyeti'],
  alternates: { canonical: 'https://hesaplayim.com/isveren-maliyeti-hesaplama' },
  openGraph: {
    title: 'İşveren Maliyeti Hesaplama 2026',
    description: 'SGK işveren payı ve tüm primlerle toplam çalıştırma maliyetini hesaplayın.',
    url: 'https://hesaplayim.com/isveren-maliyeti-hesaplama',
  },
};

const faqs = [
  {
    q: 'SGK teşvikleri işveren maliyetini düşürür mü?',
    a: 'Evet. Engelli istihdamı, yeni mezun, eski hükümlü ve 5 puanlık hazine desteği gibi teşvikler işveren SGK payını azaltır. Teşviklerden yararlanan işverenler için maliyet daha düşük olabilir.',
  },
  {
    q: 'İşveren maliyetine dahil olmayan neler var?',
    a: 'Yemek yardımı, yol yardımı, sağlık sigortası, şirket aracı gibi yan haklar standart hesaplamada dahil değildir; bunlar ekstra maliyet kalemi oluşturur.',
  },
  {
    q: '5 puanlık SGK teşviki nedir?',
    a: "İşverenin %20,5 olan SGK payının 5 puanı Hazine tarafından karşılanır. Bu teşvikten yararlanıldığında işverenin ödemesi gereken SGK payı %15,5'e düşer.",
  },
  {
    q: 'Asgari ücretli bir çalışanın işverene toplam maliyeti 2026\'da ne kadardır?',
    a: '2026 yılı asgari ücreti üzerinden, işveren SGK + işsizlik paylarıyla birlikte brüt maaşın yaklaşık %22,5 fazlası kadar toplam maliyet oluşur. Kesin tutar için güncel asgari ücret rakamını araca girebilirsiniz.',
  },
];

export default function IsverenMaliyetiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'İşveren Maliyeti Hesaplama', url: 'https://hesaplayim.com/isveren-maliyeti-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'İşveren Maliyeti Hesaplama' },
          ]}
        />
        <IsverenMaliyetiForm />
        <InfoSection
          title="İşveren Maliyeti Nasıl Hesaplanır?"
          intro="İşveren maliyeti, bir çalışan için brüt maaşın ötesinde işverenin ödediği toplam tutarı ifade eder. SGK işveren payı (%20,5), işsizlik sigortası işveren payı (%2) ve diğer yasal yükümlülükler bu maliyete dahildir. Gerçek işgücü maliyetini anlamak için brüt maaştan yüksek bu rakamı bilmek gerekir."
          formula="İşveren Maliyeti = Brüt × (1 + %20,5 SGK + %2 İşsizlik) = Brüt × 1,225"
          steps={[
            'Brüt maaşı belirleyin',
            'SGK işveren payını hesaplayın (×0,205)',
            'İşsizlik işveren payını hesaplayın (×0,02)',
            'Tüm tutarları toplayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="isveren-maliyeti-hesaplama" />
      </div>
    </>
  );
}

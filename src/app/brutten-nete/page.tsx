import type { Metadata } from 'next';
import BruttenNeteForm from '@/components/BruttenNeteForm';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Brütten Nete Maaş Hesaplama 2026',
  description:
    '2026 güncel dilimlerle SGK, gelir vergisi, damga vergisi otomatik. Anlık sonuç.',
  keywords: ['brütten nete', 'brütten nete hesaplama', 'maaş hesaplama 2026', 'net maaş hesaplama', 'sgk hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/brutten-nete' },
  openGraph: {
    title: 'Brütten Nete Maaş Hesaplama 2026',
    description: 'SGK, gelir vergisi ve tüm kesintilerle anlık hesaplama.',
    url: 'https://hesaplayim.com/brutten-nete',
    images: ['/og?title=Brütten+Nete+Maaş+Hesaplama&desc=2026+güncel+SGK+ve+vergi+hesaplama'],
  },
};

const faqs = [
  {
    q: 'Brütten nete maaş nasıl hesaplanır?',
    a: 'Brüt maaştan önce SGK işçi payı (%14) ve işsizlik sigortası (%1) düşülerek vergi matrahı bulunur. Ardından 2026 gelir vergisi dilimleri uygulanır: 110.000 TL\'ye kadar %15, 230.000 TL\'ye kadar %20, 580.000 TL\'ye kadar %27, 3.000.000 TL\'ye kadar %35, üzeri %40. Son olarak damga vergisi (%0,759) düşülür, AGİ eklenir. Net maaş ortaya çıkar.',
  },
  {
    q: '2026 gelir vergisi dilimleri nelerdir?',
    a: '2026 yılında Gelir İdaresi Başkanlığı tarafından açıklanan dilimler şunlardır: 0–110.000 TL arası %15, 110.001–230.000 TL arası %20, 230.001–580.000 TL arası %27, 580.001–3.000.000 TL arası %35, 3.000.001 TL ve üzeri %40 gelir vergisi uygulanır.',
  },
  {
    q: 'AGİ nedir, nasıl hesaplanır?',
    a: 'Asgari Geçim İndirimi (AGİ), çalışanın medeni durumu ve çocuk sayısına göre hesaplanan vergi iadesidir. 2026\'da asgari ücret 22.104,67 TL olup bekâr bir çalışan için AGİ tutarı aylık yaklaşık 165,79 TL\'dir. Evli ve çocuklu çalışanlarda bu tutar artar.',
  },
  {
    q: 'İşverenin toplam maliyeti ne kadar?',
    a: 'İşveren, net maaşın yanı sıra SGK işveren payı olarak brüt maaşın %15,5\'ini, işsizlik sigortası işveren payı olarak %2\'sini öder. Yani toplam işveren maliyeti brüt maaşın yaklaşık %117,5\'ine eşittir.',
  },
];

export default function BruttenNetePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Brütten Nete Maaş Hesaplama', url: 'https://hesaplayim.com/brutten-nete' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Brütten Nete Maaş Hesaplama' },
          ]}
        />
        <BruttenNeteForm />
        <InfoSection
          title="Brütten Nete Maaş Nasıl Hesaplanır?"
          intro="Brütten nete hesaplama, işverenin belirlediği brüt maaştan yasal kesintiler düşüldükten sonra çalışanın eline geçen net maaşı bulmak için kullanılır. Türkiye'de kesintiler; SGK işçi payı (%14), işsizlik sigortası işçi payı (%1), gelir vergisi (artan oranlı %15-40) ve damga vergisinden (%0,759) oluşur. Asgari geçim indirimi, gelir vergisinden düşülerek net maaşı artırır. Hesaplama, kümülatif vergi matrahına göre değişkenlik gösterir."
          formula="Net Maaş = Brüt - SGK İşçi (%14) - İşsizlik (%1) - Gelir Vergisi - Damga Vergisi + AGİ"
          steps={[
            'Brüt maaşı girin',
            'SGK ve işsizlik primlerini düşün',
            'Gelir vergisi matrahını hesaplayın',
            'Gelir vergisini artan oranlı dilimlerle hesaplayın',
            'Damga vergisini çıkarın',
            'AGİ ekleyerek net maaşa ulaşın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="brutten-nete" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import KidemTazminatiForm from '@/components/KidemTazminatiForm';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kıdem Tazminatı Hesaplama 2026',
  description:
    'Giriş-çıkış tarihi ve maaşınızla kıdem tazminatı hesaplayın. 2026 tavan: 64.948 TL',
  keywords: ['kıdem tazminatı', 'kıdem tazminatı hesaplama', 'kıdem tazminatı 2026', 'kıdem hesaplama', 'tazminat hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kidem-tazminati' },
  openGraph: {
    title: 'Kıdem Tazminatı Hesaplama 2026',
    description: 'Giriş-çıkış tarihi ve maaşınızla kıdem tazminatı hesaplayın. 2026 tavan: 64.948 TL',
    url: 'https://hesaplayim.com/kidem-tazminati',
  },
};

const faqs = [
  {
    q: 'Kıdem tazminatı için kaç yıl çalışmak gerekir?',
    a: 'Aynı işyerinde aralıksız en az 1 tam yıl çalışmış olmak gerekir. 1 yılı tamamlamadan ayrılanlar tazminat alamaz.',
  },
  {
    q: 'İstifa edince kıdem tazminatı alınır mı?',
    a: 'Normal istifada alınamaz. Ancak; askerlik, evlendikten sonra 1 yıl içinde ayrılan kadın çalışan, emeklilik hakkı kazananlar ve haklı nedenle fesih (İK m.24) hallerinde istifa edilse de tazminat hakkı doğar.',
  },
  {
    q: '2026 kıdem tazminatı tavanı ne kadar?',
    a: '2026 yılı için yasal tavan 64.948,77 TL\'dir. Brüt maaşınız bu tutarın üzerindeyse hesaplamada tavan esas alınır.',
  },
  {
    q: 'Kıdem tazminatından vergi kesilir mi?',
    a: 'Gelir vergisi kesilmez; yalnızca %0,759 oranında damga vergisi kesilir.',
  },
];

export default function KidemTazminatiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kıdem Tazminatı Hesaplama', url: 'https://hesaplayim.com/kidem-tazminati' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Kıdem Tazminatı Hesaplama' },
          ]}
        />
        <KidemTazminatiForm />
        <InfoSection
          title="Kıdem Tazminatı Nasıl Hesaplanır?"
          intro="Kıdem tazminatı, aynı işyerinde en az 1 yıl çalışan ve iş sözleşmesi tazminat doğuran bir nedenle sona eren çalışanlara ödenir. Her tam çalışma yılı için bir aylık brüt maaş esas alınır."
          formula="Tazminat = Brüt Maaş × (Toplam Çalışma Günü ÷ 365)   |   2026 Tavan: 64.948,77 TL"
          steps={[
            'Giriş ve çıkış tarihleri arasındaki toplam gün hesaplanır',
            'Brüt maaş (ikramiye dahil ortalama) belirlenir',
            'Brüt maaş × (gün ÷ 365) formülü uygulanır',
            'Sonuç tavandan büyükse tavan esas alınır',
            'Damga vergisi (%0,759) düşülür — gelir vergisi kesilmez',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kidem-tazminati" />
      </div>
    </>
  );
}

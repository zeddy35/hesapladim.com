import type { Metadata } from 'next';
import TapuHarciForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Tapu Harcı Hesaplama 2026 | Satış, Bağış, İpotek',
  description:
    'Gayrimenkul satış, bağış ve ipotek işlemleri için 2026 tapu harcı hesaplama. Alıcı ve satıcı payları ayrı gösterilir.',
  alternates: { canonical: 'https://hesaplayim.com/tapu-harci-hesaplama' },
  openGraph: {
    title: 'Tapu Harcı Hesaplama 2026 | Satış, Bağış, İpotek',
    description: 'Gayrimenkul alım satımında ödenecek tapu harcını hesaplayın.',
    url: 'https://hesaplayim.com/tapu-harci-hesaplama',
  },
};

const faqs = [
  {
    q: 'Tapu harcı oranı nedir?',
    a: 'Gayrimenkul satışında alıcı ve satıcıdan ayrı ayrı binde 20 (% 2) oranında tapu harcı alınır. Toplam oran % 4\'tür.',
  },
  {
    q: 'Tapu harcı nasıl ödenir?',
    a: 'Tapu randevu günü tapu müdürlüğü veznesine veya online bankacılık/GİB kanalları üzerinden ödenir.',
  },
  {
    q: 'Tapu harcı beyan değerine göre mi hesaplanır?',
    a: 'Satış bedeli ile beyan değerinden hangisi yüksekse o esas alınır. Düşük beyanname yasal sorumluluk doğurur.',
  },
];

export default function TapuHarciPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Tapu Harcı Hesaplama', url: 'https://hesaplayim.com/tapu-harci-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'Tapu Harcı Hesaplama' },
          ]}
        />
        <TapuHarciForm />
        <InfoSection
          title="Tapu Harcı Nasıl Hesaplanır?"
          intro="Tapu harcı, gayrimenkul alım satımında alıcı ve satıcının ayrı ayrı ödediği bir vergidir. 492 sayılı Harçlar Kanunu'na göre satış bedeli üzerinden hesaplanır."
          formula="Tapu Harcı = Satış Bedeli × 0,02 (alıcı) + Satış Bedeli × 0,02 (satıcı) = Toplam %4"
          faqs={faqs}
        />
        <RelatedTools slug="tapu-harci-hesaplama" />
      </div>
    </>
  );
}

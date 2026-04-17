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
  {
    q: 'Tapu harcına ek olarak başka masraflar var mı?',
    a: 'Evet. Tapu harcı dışında döner sermaye ücreti, kadastro müdürlüğü payı ve tapu siciline işleme ücreti gibi ek kalemler ödenir. Bunların toplamı birkaç bin TL düzeyinde olabilir.',
  },
  {
    q: 'İlk kez konut alanlara tapu harcı indirimi var mı?',
    a: "Belirli koşulları sağlayan ilk konut alımlarında KDV indirimi veya muafiyeti söz konusu olabilir; ancak tapu harcı konusunda genel olarak indirim uygulanmaz. Güncel teşvik ve istisnalar için Hazine ve Maliye Bakanlığı'nın duyurularını takip edin.",
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
          intro="Tapu harcı, gayrimenkul alım satımında alıcı ve satıcının ayrı ayrı ödediği bir vergidir. 492 sayılı Harçlar Kanunu'na göre satış bedeli üzerinden hesaplanır. Araç alıcı ve satıcı paylarını, döner sermaye ücretini ve toplam maliyeti ayrı ayrı gösterir."
          formula="Tapu Harcı = Satış Bedeli × 0,02 (alıcı) + Satış Bedeli × 0,02 (satıcı) = Toplam %4"
          steps={[
            'İşlem türünü seçin: satış, bağış veya ipotek',
            'Gayrimenkulün satış bedelini girin',
            'Alıcı ve satıcı payları ayrı ayrı hesaplanır',
            'Döner sermaye ve toplam maliyet gösterilir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="tapu-harci-hesaplama" />
      </div>
    </>
  );
}

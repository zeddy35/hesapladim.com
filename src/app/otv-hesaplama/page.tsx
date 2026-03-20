import type { Metadata } from 'next';
import OtvForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'ÖTV Hesaplama 2026 | Araç ÖTV ve KDV Dökümü',
  description:
    '2026 araç ÖTV oranlarıyla liste fiyatından ÖTV ve KDV miktarını hesaplayın. 0-1600cc, 1601-2000cc, 2001cc+ ve elektrikli araçlar.',
  alternates: { canonical: 'https://hesaplayim.com/otv-hesaplama' },
  openGraph: {
    title: 'ÖTV Hesaplama 2026 | Araç ÖTV ve KDV Dökümü',
    description: '2026 araç ÖTV oranlarıyla liste fiyatından ÖTV ve KDV miktarını hesaplayın.',
    url: 'https://hesaplayim.com/otv-hesaplama',
  },
};

const faqs = [
  {
    q: 'Otomobilde ÖTV nasıl hesaplanır?',
    a: "Taşıtın motor hacmine ve fiyatına göre değişen oranlarda ÖTV uygulanır. Motor hacmi arttıkça ÖTV oranı da artar. ÖTV üzerine ayrıca %20 KDV eklenir.",
  },
  {
    q: 'ÖTV oranları değişiyor mu?',
    a: "Evet. ÖTV oranları her yıl bütçe kanunuyla güncellenebilir. Araç alımından önce güncel oranları Gelir İdaresi Başkanlığı'ndan teyit edin.",
  },
];

export default function OtvPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'ÖTV Hesaplama', url: 'https://hesaplayim.com/otv-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'ÖTV Hesaplama' },
          ]}
        />
        <OtvForm />
        <InfoSection
          title="ÖTV (Özel Tüketim Vergisi) Nasıl Hesaplanır?"
          intro="Özel Tüketim Vergisi (ÖTV), motorlu taşıtlar, akaryakıt, alkol, tütün ve lüks ürünler gibi seçili ürünlere uygulanan dolaylı bir vergidir. Otomobil alımında ÖTV, satış fiyatının önemli bir bölümünü oluşturur."
          formula="ÖTV Tutarı = Matrah × ÖTV Oranı   |   KDV Matrahı = Matrah + ÖTV"
          faqs={faqs}
        />
        <RelatedTools slug="otv-hesaplama" />
      </div>
    </>
  );
}

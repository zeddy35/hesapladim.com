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
  {
    q: '2026 araç ÖTV dilimleri nelerdir?',
    a: '2026 itibarıyla 0-1600 cc araçlarda matrah 320.000 TL altında %45, üstünde %50; 1601-2000 cc için %130-150; 2001 cc ve üzeri için %220 oranları uygulanmaktadır. Elektrikli araçlarda matrah 1.500.000 TL altında %10, üstünde %40 ÖTV alınmaktadır. Kesin oranlar için GİB tebliğlerini kontrol edin.',
  },
  {
    q: 'İkinci el araçta ÖTV ödenir mi?',
    a: 'Hayır. ÖTV yalnızca ilk tescil sırasında, yani aracın sıfır satışında bir kez ödenir. İkinci el alım-satım işlemlerinde ÖTV tekrar hesaplanmaz.',
  },
  {
    q: 'Elektrikli araçlarda ÖTV avantajı var mı?',
    a: "Evet. 2026 itibarıyla elektrikli araçlar benzinli ve dizel araçlara kıyasla çok daha düşük ÖTV dilimine tabidir. Düşük matrahlı elektrikli araçlarda %10 ÖTV uygulanması, satın alma maliyetini önemli ölçüde düşürmektedir.",
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
          intro="Özel Tüketim Vergisi (ÖTV), motorlu taşıtlar, akaryakıt, alkol, tütün ve lüks ürünler gibi seçili ürünlere uygulanan dolaylı bir vergidir. Otomobil alımında ÖTV, satış fiyatının önemli bir bölümünü oluşturur. Bu araç 2026 güncel oranlarıyla motor hacmi ve yakıt türüne göre ÖTV + KDV dökümünü hesaplar."
          formula="ÖTV Tutarı = Matrah × ÖTV Oranı   |   KDV Matrahı = Matrah + ÖTV"
          steps={[
            'Aracın motor hacmi veya yakıt türünü seçin (benzin, dizel, elektrikli)',
            'Bayi liste fiyatını (ÖTV ve KDV hariç matrahı) girin',
            'ÖTV tutarı, KDV ve toplam fiyat hesaplanır',
            'Farklı motor hacimleri arasında karşılaştırma yapabilirsiniz',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="otv-hesaplama" />
      </div>
    </>
  );
}

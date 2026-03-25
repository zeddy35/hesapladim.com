import type { Metadata } from 'next';
import MtvForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'MTV Hesaplama 2026 — Motorlu Taşıtlar Vergisi',
  description: 'Motor hacmi ve araç yaşına göre 2026 yılı MTV tutarını hesaplayın.',
  keywords: ['mtv hesaplama', 'motorlu taşıtlar vergisi', 'mtv 2026', 'araç vergisi', 'motor hacmi'],
  alternates: { canonical: 'https://hesaplayim.com/mtv-hesaplama' },
  openGraph: {
    title: 'MTV Hesaplama 2026 — Motorlu Taşıtlar Vergisi',
    description: 'Motor hacmi ve araç yaşına göre 2026 yılı MTV tutarını hesaplayın.',
    url: 'https://hesaplayim.com/mtv-hesaplama',
  },
};

const faqs = [
  {
    q: 'MTV ne zaman ödenir?',
    a: 'MTV yılda iki eşit taksitte ödenir: birinci taksit Ocak ayının sonuna kadar, ikinci taksit Temmuz ayının sonuna kadar.',
  },
  {
    q: "MTV'yi nasıl öderim?",
    a: "e-Devlet, GİB'in dijital vergi dairesi, bankalar ve PTT şubeleri üzerinden ödenebilir.",
  },
  {
    q: 'Araç kaç yaşında sayılır?',
    a: 'Aracın model yılı esas alınır. Tescil yılı değil, üretim/model yılı kullanılır.',
  },
  {
    q: "İkinci el araç alınca MTV borcu devredilir mi?",
    a: "Evet. Araç satışında önceki sahibe ait ödenmemiş MTV borcu yeni sahibe geçer. Satın almadan önce borç sorgulama yapılması önerilir.",
  },
];

export default function MtvHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'MTV Hesaplama', url: 'https://hesaplayim.com/mtv-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'MTV Hesaplama' },
          ]}
        />
        <MtvForm />
        <InfoSection
          title="MTV Nasıl Hesaplanır?"
          intro="Motorlu Taşıtlar Vergisi (MTV), 197 Sayılı Motorlu Taşıtlar Vergisi Kanunu'na göre her yıl Ocak ve Temmuz aylarında iki eşit taksitte ödenir. Vergi tutarı aracın motor silindir hacmine ve yaşına göre belirlenir; her yıl yeniden değerleme oranında güncellenir."
          formula="MTV = Araç Yaşı + Motor Hacmi Dilimine Göre Tarife Tutarı"
          steps={[
            'Motor silindir hacmini seçin',
            'Araç yılını girin',
            "2026 tarifesine göre yıllık MTV'yi görün",
            'Her taksit Ocak ve Temmuz\'da ödenir',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="mtv-hesaplama" />
      </div>
    </>
  );
}

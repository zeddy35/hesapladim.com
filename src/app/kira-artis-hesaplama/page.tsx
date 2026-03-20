import type { Metadata } from 'next';
import KiraArtisForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kira Artış Hesaplama 2026 | Yasal Tavan TÜFE Oranı',
  description:
    '2026 TÜFE 12 aylık ortalama kira artış tavanına göre yeni kiranızı ve yasal üst sınırı hesaplayın.',
  alternates: { canonical: 'https://hesaplayim.com/kira-artis-hesaplama' },
  openGraph: {
    title: 'Kira Artış Hesaplama 2026 | Yasal Tavan',
    description: '2026 TÜFE bazlı yasal kira artış tavanını ve yeni kira tutarınızı hesaplayın.',
    url: 'https://hesaplayim.com/kira-artis-hesaplama',
  },
};

const faqs = [
  {
    q: '2026 kira artış oranı ne kadar?',
    a: 'Kira artış oranı her ay TÜİK tarafından açıklanan 12 aylık ortalama TÜFE verisiyle belirlenir. Güncel oran için hesaplama aracımızı kullanın.',
  },
  {
    q: 'Kira artışı zorunlu mu, ev sahibi daha fazla isteyebilir mi?',
    a: 'Konut kiralarında ev sahibi yasal sınırın üzerinde artış yapamaz. Yüksek artış talebi geçersiz sayılır ve kiracı yasal oranı ödemekle yükümlüdür.',
  },
  {
    q: 'İşyeri kirasında artış sınırı var mı?',
    a: 'İşyeri kiralarında TÜFE sınırlaması uygulanmaz. Taraflar sözleşmede belirlenen oran veya koşulları uygular.',
  },
];

export default function KiraArtisPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kira Artış Hesaplama', url: 'https://hesaplayim.com/kira-artis-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'Kira Artış Hesaplama' },
          ]}
        />
        <KiraArtisForm />
        <InfoSection
          title="Kira Artış Oranı Nasıl Hesaplanır?"
          intro="Türkiye'de konut kira artışı; 7409 sayılı Kanun kapsamında TÜFE (12 aylık ortalama) oranıyla sınırlandırılmaktadır. İşyeri kiralarında ise taraflar serbestçe belirleyebilir."
          formula="Yeni Kira = Mevcut Kira × (1 + TÜFE Oranı ÷ 100)"
          steps={[
            'Mevcut kira tutarını girin',
            'Kira sözleşme yenileme tarihini seçin',
            'İlgili dönemin 12 aylık ortalama TÜFE oranı otomatik uygulanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kira-artis-hesaplama" />
      </div>
    </>
  );
}

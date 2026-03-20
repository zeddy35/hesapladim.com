import type { Metadata } from 'next';
import KdvForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'KDV Hesaplama - Ekle veya Çıkar 2026',
  description:
    'KDV hariç/dahil fiyat hesaplama. %1, %8, %10, %18, %20 oranları. Anlık sonuç.',
  keywords: ['kdv hesaplama', 'kdv ekle çıkar', 'kdv dahil hariç', 'katma değer vergisi hesaplama', 'kdv 2026'],
  alternates: { canonical: 'https://hesaplayim.com/kdv-hesaplama' },
  openGraph: {
    title: 'KDV Hesaplama - Ekle veya Çıkar 2026',
    description: 'KDV hariç/dahil fiyat hesaplama. %1, %8, %10, %18, %20 oranları. Anlık sonuç.',
    url: 'https://hesaplayim.com/kdv-hesaplama',
  },
};

const faqs = [
  {
    q: '2026 KDV oranları nelerdir?',
    a: '2026 yılında temel KDV oranları: %1 (temel gıda, gazete), %10 (işlenmiş gıda, bazı hizmetler), %20 (genel oran — elektronik, giyim, hizmetler). 8 Temmuz 2023 itibarıyla genel oran %18\'den %20\'ye yükseltilmiştir.',
  },
  {
    q: 'KDV dahil fiyattan KDV nasıl çıkarılır?',
    a: 'KDV Hariç = KDV Dahil ÷ (1 + oran÷100). Örnek: %20 KDV dahil 1.200 TL → 1.200 ÷ 1,20 = 1.000 TL KDV hariç, KDV tutarı 200 TL.',
  },
  {
    q: 'Hangi ürünlerde hangi KDV oranı uygulanır?',
    a: '%1: Süt, yumurta, ekmek, gazete. %10: İşlenmiş gıda, restoran, otel. %20: Elektronik, giyim, mobilya, alkol. Güncel liste için Gelir İdaresi Başkanlığı web sitesini inceleyin.',
  },
];

export default function KdvHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'KDV Hesaplama', url: 'https://hesaplayim.com/kdv-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'KDV Hesaplama' },
          ]}
        />
        <KdvForm />
        <InfoSection
          title="KDV Nasıl Hesaplanır?"
          intro="Katma Değer Vergisi (KDV), mal ve hizmetlerin satışında uygulanan tüketim vergisidir. Türkiye'de 2026 yılında geçerli KDV oranları %1, %10, %20'dir."
          formula="KDV Tutarı = KDV Hariç Tutar × Oran ÷ 100   |   KDV Hariç = KDV Dahil ÷ (1 + Oran÷100)"
          steps={[
            'KDV oranını seçin (%1, %10 veya %20)',
            'Tutarı ve hesaplama yönünü (hariç→dahil veya dahil→hariç) girin',
            'KDV tutarı ve toplam fiyat otomatik hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kdv-hesaplama" />
      </div>
    </>
  );
}

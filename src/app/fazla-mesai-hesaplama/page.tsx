import type { Metadata } from 'next';
import FazlaMesaiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Fazla Mesai Hesaplama 2026 | Haftalık, Gece, Tatil Zammı',
  description:
    'Brüt maaşınızdan saatlik ücretinizi ve fazla mesai tutarını hesaplayın. Haftalık %50, tatil %100 zam.',
  alternates: { canonical: 'https://hesaplayim.com/fazla-mesai-hesaplama' },
  openGraph: {
    title: 'Fazla Mesai Hesaplama 2026 | Haftalık, Gece, Tatil Zammı',
    description: 'Brüt maaşınızdan fazla mesai ücretini hesaplayın.',
    url: 'https://hesaplayim.com/fazla-mesai-hesaplama',
  },
};

const faqs = [
  {
    q: 'Fazla mesainin yasal üst sınırı nedir?',
    a: "İş Kanunu'na göre yılda 270 saat fazla mesai yapılabilir. Bu sınırı aşan çalışma hukuki açıdan sorun yaratabilir.",
  },
  {
    q: 'Hafta sonu çalışması fazla mesai sayılır mı?',
    a: 'Haftalık 45 saatin içinde kalıyorsa fazla mesai sayılmaz; ancak hafta sonu çalışması için ek ücret veya izin hakkı sözleşmede belirtilebilir.',
  },
  {
    q: 'Fazla mesai izinle telafi edilebilir mi?',
    a: 'Evet. İşçinin onayıyla her saat fazla mesai için 1 saat 30 dakika serbest zaman verilebilir.',
  },
  {
    q: 'Resmi tatil günü çalışmak için ücret zammı ne kadardır?',
    a: 'Ulusal bayram ve genel tatil günlerinde çalışan işçiye, çalıştığı her gün için bir ilave günlük ücret ödenir. Bu, toplam ücretin iki katı anlamına gelir (%100 zam).',
  },
  {
    q: 'Parça başı ya da komisyon bazlı çalışanlarda fazla mesai nasıl hesaplanır?',
    a: 'Parça başı veya komisyon bazlı çalışanlarda saatlik ücret, aylık toplam kazancın haftalık çalışma saatine bölünmesiyle bulunur. Hesaplama yöntemi İş Kanunu\'nun 47. maddesiyle düzenlenmiştir.',
  },
];

export default function FazlaMesaiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Fazla Mesai Hesaplama', url: 'https://hesaplayim.com/fazla-mesai-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Fazla Mesai Hesaplama' },
          ]}
        />
        <FazlaMesaiForm />
        <InfoSection
          title="Fazla Mesai Ücreti Nasıl Hesaplanır?"
          intro="4857 sayılı İş Kanunu'na göre haftalık 45 saati aşan çalışma fazla mesai sayılır. Her saat için normal saatlik ücretin %50 fazlası ödenir."
          formula="Fazla Mesai Ücreti = Saatlik Ücret × 1.5 × Fazla Mesai Saati   |   Saatlik = Aylık Brüt ÷ 225"
          steps={[
            'Aylık brüt maaşınızı girin',
            'Haftalık fazla çalışma saatinizi girin',
            'Yasal artışlı ücret otomatik hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="fazla-mesai-hesaplama" />
      </div>
    </>
  );
}

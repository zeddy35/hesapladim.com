import type { Metadata } from 'next';
import VucutYagForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Vücut Yağ Oranı Hesaplama',
  description:
    'ABD Deniz Kuvvetleri (US Navy) formülüyle vücut ölçülerinizden yağ oranınızı ve kategorinizi hesaplayın.',
  keywords: ['vücut yağ oranı', 'yağ yüzdesi hesaplama', 'us navy formülü', 'body fat', 'yağ kategorisi'],
  alternates: { canonical: 'https://hesaplayim.com/vucut-yag-orani-hesaplama' },
  openGraph: {
    title: 'Vücut Yağ Oranı Hesaplama',
    description: 'US Navy formülüyle vücut yağ oranınızı ve kategorinizi öğrenin.',
    url: 'https://hesaplayim.com/vucut-yag-orani-hesaplama',
  },
};

const faqs = [
  {
    q: 'Sağlıklı vücut yağ oranı nedir?',
    a: 'Erkekler için %6-24, kadınlar için %16-30 normal aralık kabul edilir. Sporcularda bu değerler daha düşük olabilir.',
  },
  {
    q: 'VKİ ile yağ oranı farkı nedir?',
    a: 'VKİ ağırlık ve boy ilişkisine bakar; yağ ve kas ayrımı yapmaz. Vücut yağ oranı daha doğrudan bir bileşim ölçütüdür; yüksek VKİ\'li bir sporcu düşük yağ oranına sahip olabilir.',
  },
  {
    q: 'Yağ oranını düşürmenin en etkili yolu nedir?',
    a: 'Kalori açığı (beslenme) ile direnç egzersizini birleştirmek, hem yağ yakmayı hem de kas kütlesini korumayı destekler. Aşırı kısıtlayıcı diyetler kas kaybına yol açabilir.',
  },
  {
    q: 'US Navy yöntemi ne kadar doğrudur?',
    a: 'US Navy formülü, bant ölçüm yöntemine dayalı olduğundan DEXA veya suya daldırma testine kıyasla %3-5 hata payı taşır; ancak pratikte en erişilebilir yöntemlerden biridir.',
  },
  {
    q: 'Yağ oranım %30 çıktı, bu ne anlama geliyor?',
    a: 'Erkekler için %30 obezite sınırındayken kadınlar için "kabul edilebilir" kategorisinin üst sınırına denk gelir. Bu seviyede kardiyovasküler risk artış gösterebilir; bir sağlık profesyoneline danışmanız önerilir.',
  },
];

export default function VucutYagPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Vücut Yağ Oranı Hesaplama', url: 'https://hesaplayim.com/vucut-yag-orani-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık', href: '/#saglik' },
            { label: 'Vücut Yağ Oranı Hesaplama' },
          ]}
        />
        <VucutYagForm />
        <InfoSection
          title="Vücut Yağ Oranı Nasıl Hesaplanır?"
          intro="Vücut yağ oranı, toplam vücut ağırlığının yağ kütlesine bölünmesiyle bulunur. ABD Ordusu yöntemi boyun, bel ve kalça ölçülerini kullanırken Katch-McArdle formülü yağsız kütleye dayanır. Daha hassas ölçüm için DEXA taraması veya biyoelektrik empedans analizi kullanılır."
          formula="U.S. Navy (Erkek): %Yağ = 86,01 × log(bel - boyun) - 70,04 × log(boy) + 36,76"
          steps={[
            'Cinsiyet, boy, bel, boyun ve (kadınlar için) kalça ölçüsünü girin',
            'ABD Ordusu formülüyle yağ oranını hesaplayın',
            'Sağlıklı yağ oranı aralığıyla karşılaştırın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="vucut-yag-orani-hesaplama" />
      </div>
    </>
  );
}

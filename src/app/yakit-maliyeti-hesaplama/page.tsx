import type { Metadata } from 'next';
import YakitMaliyetiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Yakıt Maliyeti Hesaplama',
  description:
    'Mesafe, yakıt tüketimi ve yakıt fiyatına göre yolculuk yakıt maliyetini ve km başına maliyeti hesaplayın.',
  keywords: ['yakıt maliyeti', 'benzin hesaplama', 'yakıt tüketimi', 'yolculuk maliyeti', 'mazot hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/yakit-maliyeti-hesaplama' },
  openGraph: {
    title: 'Yakıt Maliyeti Hesaplama',
    description: 'Mesafe ve yakıt tüketimine göre yolculuk maliyetinizi hesaplayın.',
    url: 'https://hesaplayim.com/yakit-maliyeti-hesaplama',
  },
};

const faqs = [
  {
    q: 'Ortalama yakıt tüketimi nasıl ölçülür?',
    a: 'Depoyu doldurun ve km sayacını sıfırlayın. Bir sonraki doldurmada: Harcanan yakıt / Alınan mesafe × 100 = L/100km.',
  },
  {
    q: 'Elektrikli araç için maliyeti nasıl hesaplarım?',
    a: 'kWh/100km tüketimini girin ve kWh fiyatıyla çarpın. Elektrikli araçların enerji maliyeti genellikle benzinli araçların 1/3 ile 1/4\'ü kadardır.',
  },
  {
    q: 'Şehir içi ve şehirlerarası tüketim farkı neden önemli?',
    a: 'Şehir içi duraklar, trafik ve sık fren kullanımı yakıt tüketimini artırır. Şehirlerarası sabit hızda seyahat daha düşük tüketim sağlar; bu nedenle ayrı hesaplama yapılabilir.',
  },
];

export default function YakitMaliyetiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Yakıt Maliyeti Hesaplama', url: 'https://hesaplayim.com/yakit-maliyeti-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Genel', href: '/#genel' },
            { label: 'Yakıt Maliyeti Hesaplama' },
          ]}
        />
        <YakitMaliyetiForm />
        <InfoSection
          title="Yakıt Maliyeti Nasıl Hesaplanır?"
          intro="Yakıt maliyeti hesaplama, belirli bir mesafe için araçta kullanılan yakıt miktarını ve tutarını hesaplar. Araç yakıt tüketimi 100 km başına litre (L/100km) veya km/lt cinsinden ifade edilir. Yolculuk planlama, araç karşılaştırma ve aylık yakıt bütçesi için kullanılır."
          formula="Yakıt Miktarı (lt) = Mesafe × (Tüketim / 100) | Maliyet = Yakıt Miktarı × Litre Fiyatı"
          steps={[
            'Gidilecek mesafeyi girin',
            'Aracın ortalama yakıt tüketimini girin (L/100km)',
            'Yakıt litre fiyatını girin',
            'Toplam maliyeti hesaplayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="yakit-maliyeti-hesaplama" />
      </div>
    </>
  );
}

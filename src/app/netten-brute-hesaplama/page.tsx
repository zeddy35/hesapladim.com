import type { Metadata } from 'next';
import NettenBruteForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Netten Brüte Maaş Hesaplama 2026',
  description:
    'Almak istediğiniz net maaşa göre brüt rakamını 2026 SGK ve vergi dilimleriyle tersine hesaplayın.',
  keywords: ['netten brüte', 'net maaş brüt hesaplama', 'brüt maaş bulma', 'maaş hesaplama 2026'],
  alternates: { canonical: 'https://hesaplayim.com/netten-brute-hesaplama' },
  openGraph: {
    title: 'Netten Brüte Maaş Hesaplama 2026',
    description: 'Hedef net maaşınızdan brüt rakamı ve tüm kesintileri tersine hesaplayın.',
    url: 'https://hesaplayim.com/netten-brute-hesaplama',
  },
};

const faqs = [
  {
    q: 'Netten brüte hesaplama neden karmaşık?',
    a: 'Gelir vergisi artan oranlı olduğu için net maaş ve brüt maaş arasındaki oran sabit değildir. Brüt yükseldikçe vergi dilimi de değişebilir, bu nedenle basit bir formül yerine iteratif hesaplama gerekir.',
  },
  {
    q: 'İşveren maliyeti nedir?',
    a: 'İşveren yalnızca brüt maaş ödemez; ayrıca SGK işveren payı (%20,5) ve işsizlik sigorta payı (%2) ekler. Toplam işveren maliyeti brüt maaşın yaklaşık %22,5 fazlasıdır.',
  },
  {
    q: 'Bu hesaplayıcıyı ne zaman kullanmalıyım?',
    a: "Yeni iş tekliflerinde 'elimde X TL kalsın' şartı koşuyorsanız ya da maaş artışı müzakerelerinde hedef belirliyorsanız bu araç işinize yarar.",
  },
];

export default function NettenBrutePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Netten Brüte Maaş Hesaplama', url: 'https://hesaplayim.com/netten-brute-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Netten Brüte Maaş Hesaplama' },
          ]}
        />
        <NettenBruteForm />
        <InfoSection
          title="Netten Brüte Maaş Nasıl Hesaplanır?"
          intro="Netten brüte hesaplama, çalışanın eline geçmesini istediği net tutardan geriye gidilerek brüt maaşı bulmak için kullanılır. İşe alım süreçlerinde veya maaş müzakerelerinde 'elde X TL kalsın' hedefiyle başvurulur. Hesaplama, Türkiye'deki SGK, işsizlik ve gelir vergisi oranları kullanılarak iteratif yöntemle yapılır."
          formula="Brüt ≈ Net / (1 - SGK İşçi - İşsizlik - Vergi Oranı) + Düzeltme"
          steps={[
            'Hedef net maaşı girin',
            'Tahmini bir brüt değerle başlayın',
            'Brütten nete hesaplayın',
            'Hesaplanan net ile hedef neti karşılaştırın',
            'Fark kapanana kadar brütü ayarlayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="netten-brute-hesaplama" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import DamgaVergisiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Damga Vergisi Hesaplama 2026 | Belge Türüne Göre Oran',
  description:
    'Kira kontratı, maaş bordrosu, sözleşme ve diğer belgeler için 2026 damga vergisi hesaplama.',
  alternates: { canonical: 'https://hesaplayim.com/damga-vergisi-hesaplama' },
  openGraph: {
    title: 'Damga Vergisi Hesaplama 2026 | Belge Türüne Göre Oran',
    description: 'Belge türüne ve tutarına göre 2026 damga vergisini hesaplayın.',
    url: 'https://hesaplayim.com/damga-vergisi-hesaplama',
  },
};

const faqs = [
  {
    q: 'Maaş bordrosunda damga vergisi oranı nedir?',
    a: '2026 yılında maaş bordrosunda damga vergisi oranı binde 7,59\'dur (% 0,759).',
  },
  {
    q: 'Kira sözleşmesinde damga vergisi ödenir mi?',
    a: 'Evet. Kira sözleşmeleri damga vergisine tabidir. Oran, sözleşme türüne göre değişir; kira sözleşmeleri için binde 1,89 uygulanmaktadır.',
  },
  {
    q: 'Damga vergisini kim öder?',
    a: 'Genel kural olarak belgeyi düzenleyen taraf öder. Maaş bordrosunda damga vergisi işveren tarafından çalışanın bordrosundan kesilir.',
  },
  {
    q: 'Damga vergisi her yıl değişiyor mu?',
    a: 'Evet. Damga vergisi oranları her yıl Bakanlar Kurulu kararıyla güncellenebilir ve Resmi Gazete\'de yayımlanır. Oran listesi 488 sayılı Damga Vergisi Kanunu\'na ekli tablolarda yer alır.',
  },
  {
    q: 'Damga vergisinden muaf belgeler var mı?',
    a: 'Evet. Kanunun 2 sayılı tablosunda muaf tutulan belgeler listelenir; örneğin belirli koşullarla düzenlenen bazı kamu belgeleri ve resmi daireler arasındaki yazışmalar damga vergisinden muaf olabilir.',
  },
];

export default function DamgaVergisiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Damga Vergisi Hesaplama', url: 'https://hesaplayim.com/damga-vergisi-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Vergi & Hukuk', href: '/#vergi' },
            { label: 'Damga Vergisi Hesaplama' },
          ]}
        />
        <DamgaVergisiForm />
        <InfoSection
          title="Damga Vergisi Nasıl Hesaplanır?"
          intro="Damga vergisi; maaş bordrosu, kira sözleşmesi, iş sözleşmesi ve çeşitli belgeler üzerinden alınan bir vergidir. Maaş bordrosunda oran binde 7,59, kira sözleşmelerinde binde 1,89'dur. Bu araç 2026 güncel oranlarıyla belge türüne göre otomatik hesaplama yapar."
          formula="Damga Vergisi = Belge Tutarı × Oran ÷ 1000"
          steps={[
            'Belge türünü seçin (bordro, kira sözleşmesi, iş sözleşmesi vb.)',
            'Belge tutarını girin',
            '2026 oranıyla damga vergisi tutarı hesaplanır',
            'Net tutarı damga vergisini düşerek kontrol edin',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="damga-vergisi-hesaplama" />
      </div>
    </>
  );
}

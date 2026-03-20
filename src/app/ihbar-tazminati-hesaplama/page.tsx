import type { Metadata } from 'next';
import IhbarTazminatiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'İhbar Tazminatı Hesaplama 2026 | İş Kanunu 17. Madde',
  description:
    'İşe giriş ve çıkış tarihinizden ihbar süresini ve tazminat tutarını hesaplayın. İş Kanunu 17. madde.',
  alternates: { canonical: 'https://hesaplayim.com/ihbar-tazminati-hesaplama' },
  openGraph: {
    title: 'İhbar Tazminatı Hesaplama 2026 | İş Kanunu 17. Madde',
    description: 'İhbar süresini ve tazminat tutarını İş Kanunu 17. maddeye göre hesaplayın.',
    url: 'https://hesaplayim.com/ihbar-tazminati-hesaplama',
  },
};

const faqs = [
  {
    q: 'İhbar tazminatı ne zaman ödenir?',
    a: 'Taraflardan biri ihbar süresine uymadan sözleşmeyi sonlandırırsa ihbar tazminatı ödemek zorundadır. Hem işveren hem işçi bu yükümlülüğe tabidir.',
  },
  {
    q: 'İhbar tazminatından vergi kesilir mi?',
    a: 'Evet. İhbar tazminatı gelir vergisine ve damga vergisine tabidir; kıdem tazminatından farklı olarak gelir vergisinden muaf değildir.',
  },
  {
    q: 'Kıdem ve ihbar tazminatı aynı anda alınabilir mi?',
    a: 'Evet. Her iki tazminat birbirinden bağımsızdır ve aynı anda talep edilebilir.',
  },
];

export default function IhbarTazminatiPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'İhbar Tazminatı Hesaplama', url: 'https://hesaplayim.com/ihbar-tazminati-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'İhbar Tazminatı Hesaplama' },
          ]}
        />
        <IhbarTazminatiForm />
        <InfoSection
          title="İhbar Tazminatı Nasıl Hesaplanır?"
          intro="İhbar tazminatı, iş sözleşmesini fesheden tarafın yasal ihbar süresine uymadığında ödemesi gereken tazminattır. 4857 sayılı İş Kanunu Madde 17'ye göre kıdeme bağlı ihbar süreleri uygulanır."
          formula="İhbar Tazminatı = Brüt Günlük Ücret × İhbar Süresi (gün)"
          steps={[
            'Kıdeme göre ihbar süresi belirlenir (6 ay altı: 2 hafta, 1.5 yıla kadar: 4 hafta, 3 yıla kadar: 6 hafta, üzeri: 8 hafta)',
            'Günlük brüt ücret hesaplanır (aylık brüt ÷ 30)',
            'İhbar tazminatı = günlük ücret × ihbar günü',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="ihbar-tazminati-hesaplama" />
      </div>
    </>
  );
}

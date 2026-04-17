import type { Metadata } from 'next';
import GebelikForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Gebelik Haftası Hesaplama 2026 | Kaçıncı Haftadasınız?',
  description:
    'Son adet tarihinizi girerek gebelik haftanızı, tahmini doğum tarihinizi ve trimester bilgisini hesaplayın. Haftalık bebek büyüklüğü bilgisi ile.',
  alternates: { canonical: 'https://hesaplayim.com/gebelik-haftasi-hesaplama' },
  openGraph: {
    title: 'Gebelik Haftası Hesaplama 2026 | Kaçıncı Haftadasınız?',
    description: 'Son adet tarihinden gebelik haftasını ve tahmini doğum tarihini hesaplayın.',
    url: 'https://hesaplayim.com/gebelik-haftasi-hesaplama',
  },
};

const faqs = [
  {
    q: 'Tahmini doğum tarihi nasıl hesaplanır?',
    a: 'Son adet tarihinin ilk gününe 280 gün (40 hafta) eklenerek tahmini doğum tarihi bulunur. Naegele kuralı olarak bilinir.',
  },
  {
    q: 'Gebelik kaç trimestere ayrılır?',
    a: '3 trimestere ayrılır: 1. Trimester (1-13. hafta), 2. Trimester (14-26. hafta), 3. Trimester (27-40. hafta).',
  },
  {
    q: 'Bu hesaplama doktor muayenesinin yerini tutar mı?',
    a: 'Hayır. Bu araç yalnızca bilgilendirme amaçlıdır; kesin gebelik takibi için doktorunuza başvurunuz.',
  },
  {
    q: 'Düzensiz adet döngüsünde gebelik haftası nasıl hesaplanır?',
    a: 'Naegele kuralı 28 günlük döngüyü esas alır. Döngünüz daha kısa veya uzunsa fark gün olarak hesaplanır ve tahmini doğum tarihine eklenir/çıkarılır. Ultrason gebelik haftasını en doğru şekilde belirler.',
  },
  {
    q: 'Erken doğum hangi haftadan itibaren başlar?',
    a: '37. haftanın altında gerçekleşen doğum erken (prematüre) doğum kabul edilir. 34-36. hafta arası "geç prematüre", 28-33. hafta "orta prematüre", 28 haftanın altı "çok erken prematüre" olarak sınıflandırılır.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Gebelik Haftası Hesaplama', url: 'https://hesaplayim.com/gebelik-haftasi-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'Gebelik Haftası Hesaplama' },
          ]}
        />
        <GebelikForm />
        <InfoSection
          title="Gebelik Haftası Nasıl Hesaplanır?"
          intro="Gebelik haftası, son adet tarihinizin (SAT) ilk gününden itibaren hesaplanır. Ortalama gebelik süresi 40 haftadır (280 gün). Araç trimester bilgisi, tahmini doğum tarihi ve o haftaki bebek büyüklüğü ile gelişim aşamasını da gösterir."
          formula="Gebelik Haftası = (Bugün − Son Adet Tarihi) ÷ 7"
          steps={[
            'Son adet tarihinizin ilk gününü girin',
            'Kaçıncı haftada olduğunuz ve trimester hesaplanır',
            'Tahmini doğum tarihi (EDD) gösterilir',
            'Her hafta için bebek boyutu ve gelişim bilgisini inceleyin',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="gebelik-haftasi-hesaplama" />
      </div>
    </>
  );
}

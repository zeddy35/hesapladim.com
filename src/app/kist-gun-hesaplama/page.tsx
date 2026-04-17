import type { Metadata } from 'next';
import KistGunForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Kıst Gün Maaşı Hesaplama',
  description:
    'Aylık brüt maaş, çalışılan gün ve toplam iş günü sayısına göre eksik aylık maaşı (kıst gün) hesaplayın.',
  keywords: ['kıst gün', 'eksik ay maaşı', 'günlük maaş', 'yarım ay maaş', 'kıst maaş hesaplama'],
  alternates: { canonical: 'https://hesaplayim.com/kist-gun-hesaplama' },
  openGraph: {
    title: 'Kıst Gün Maaşı Hesaplama',
    description: 'Çalışılan gün sayısına göre kıst gün maaşını hesaplayın.',
    url: 'https://hesaplayim.com/kist-gun-hesaplama',
  },
};

const faqs = [
  {
    q: 'Kıst gün hesabında hangi günler sayılır?',
    a: 'Genel uygulama takvim günü bazında yapılır; pazar ve resmi tatiller de dahil edilir. İş sözleşmesi veya toplu iş sözleşmesinde farklı bir hesaplama yöntemi kararlaştırılmış olabilir.',
  },
  {
    q: "SGK bildirimi kıst günde nasıl yapılır?",
    a: "SGK'ya çalışanın ay içindeki fiili çalışma gün sayısı bildirilir. Eksik gün nedeninin de (giriş/çıkış, ücretsiz izin vb.) beyan edilmesi gerekir.",
  },
  {
    q: 'Kıst gün maaşında vergi kesintileri nasıl uygulanır?',
    a: 'Kıst ücret üzerinden normal maaş gibi SGK, işsizlik ve gelir vergisi kesintileri yapılır. Gelir vergisinde kümülatif matrah o aya ait ücret kadar artar.',
  },
  {
    q: 'Ay ortasında başlayan biri için maaş tam ay mı ödenir?',
    a: 'Hayır. Yalnızca çalışılan günler için maaş ödenir. Örneğin 15 Mart\'ta işe başlayan ve 31 gün çeken martta çalışan biri 17 günlük maaş alır (15 Mart dahil 17 gün).',
  },
];

export default function KistGunPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Kıst Gün Maaşı Hesaplama', url: 'https://hesaplayim.com/kist-gun-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Kıst Gün Maaşı Hesaplama' },
          ]}
        />
        <KistGunForm />
        <InfoSection
          title="Kıst Gün Maaşı Nasıl Hesaplanır?"
          intro="Kıst gün, ayın tamamında değil yalnızca bir kısmında çalışılan durumlarda maaşın orantılı hesaplanmasıdır. İşe başlama, işten ayrılma veya ücretsiz izin gibi durumlar kıst gün uygulamasını gerektirir. Hesaplama genellikle o ayın takvim günü sayısına bölünerek yapılır."
          formula="Kıst Maaş = (Aylık Maaş / Ayın Toplam Günü) × Çalışılan Gün"
          steps={[
            'Tam aylık maaşı girin',
            'Ayın kaç gün çektiğini belirleyin',
            'Gerçekte kaç gün çalışıldığını hesaplayın',
            'Orantılı maaşı bulun',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="kist-gun-hesaplama" />
      </div>
    </>
  );
}

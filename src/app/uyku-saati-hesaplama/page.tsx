import type { Metadata } from 'next';
import UykuForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Uyku Saati Hesaplama 2026 | Ne Zaman Uyumalıyım?',
  description:
    'Sabah kalmak istediğiniz saati girerek uyku döngüsüne göre ideal yatma saatlerini bulun. 90 dakikalık uyku döngüsü hesaplama.',
  alternates: { canonical: 'https://hesaplayim.com/uyku-saati-hesaplama' },
  openGraph: {
    title: 'Uyku Saati Hesaplama 2026 | Ne Zaman Uyumalıyım?',
    description: 'Uyku döngüsüne göre ideal yatma saatlerini hesaplayın.',
    url: 'https://hesaplayim.com/uyku-saati-hesaplama',
  },
};

const faqs = [
  {
    q: 'Kaç saat uyumak gerekir?',
    a: 'Yetişkinler için 7-9 saat (4-6 döngü) önerilir. Gençler için 8-10, yaşlılar için 7-8 saat uygundur.',
  },
  {
    q: '90 dakikalık döngü neden önemli?',
    a: 'Her uyku döngüsü hafif uyku, derin uyku ve REM aşamalarını içerir. Döngü ortasında uyanmak yorgunluk hissi yaratır.',
  },
  {
    q: 'Neden erken yatsam da sabah yorgun uyanıyorum?',
    a: 'Uyku döngüsünün ortasında uyanmak hafif baş ağrısı ve yorgunluğa neden olabilir. Uyanış saatinizi döngü sonlarına denk getirecek şekilde yatış saatinizi ayarlamanız bu durumu azaltır.',
  },
  {
    q: 'REM uykusu ne işe yarar?',
    a: 'REM (Rapid Eye Movement) uykusunda beyin bilgileri işler ve hafızaya alır; rüyalar bu aşamada görülür. Yetersiz REM uykusu öğrenme güçlüğüne ve duygusal dengesizliğe yol açabilir.',
  },
  {
    q: 'Şekerleme uyku döngüsünü bozar mı?',
    a: '20–30 dakikalık kısa şekerleme (güç uykusu) dinlendiricidir ve döngüye girmez. 60 dakikayı aşan şekerlemeler derin uykuya dalınmasına neden olur ve gece uyku döngüsünü olumsuz etkileyebilir.',
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Uyku Saati Hesaplama', url: 'https://hesaplayim.com/uyku-saati-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Sağlık & Yaşam', href: '/#saglik' },
            { label: 'Uyku Saati Hesaplama' },
          ]}
        />
        <UykuForm />
        <InfoSection
          title="Uyku Saati Nasıl Hesaplanır?"
          intro="Uyku döngüleri yaklaşık 90 dakika sürer. En dinlendirici uyanış, döngü sonlarında gerçekleşir. Bu araç istenen uyanış saatine göre ideal uyuma saatlerini hesaplar; her seçenek için kaç döngü tamamlandığını ve toplam uyku süresini gösterir."
          formula="Uyuma Saati = Uyanış Saati − (90 dk × Döngü Sayısı) − 15 dk (uykuya dalma süresi)"
          steps={[
            'Sabah kalkmak istediğiniz saati girin',
            'Uykuya dalma sürenizi seçin (genellikle 10–15 dakika)',
            'Araç 4, 5 ve 6 döngü için uyuma saatlerini listeler',
            'Size en uygun seçeneği belirleyip alarmınızı ayarlayın',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="uyku-saati-hesaplama" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import MevduatFaizForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Mevduat Faiz Hesaplama 2026 | Net Kazanç ve Stopaj',
  description:
    'Mevduat faiz hesaplama: anapara, faiz oranı ve vadeye göre net kazanç, stopaj vergisi ve vade karşılaştırması.',
  alternates: { canonical: 'https://hesaplayim.com/mevduat-faiz-hesaplama' },
  openGraph: {
    title: 'Mevduat Faiz Hesaplama 2026 | Net Kazanç ve Stopaj',
    description: 'Anapara ve faiz oranına göre net mevduat faiz gelirinizi hesaplayın.',
    url: 'https://hesaplayim.com/mevduat-faiz-hesaplama',
  },
};

const faqs = [
  {
    q: 'Mevduat faizinden vergi kesiliyor mu?',
    a: 'Evet. TL mevduat faiz geliri üzerinden %15 stopaj vergisi kesilir. Bu oran değişebilir; güncel oran için bankanızı veya GİB\'i kontrol edin.',
  },
  {
    q: 'Bileşik faiz mi basit faiz mi uygulanır?',
    a: 'Mevduat hesapları genellikle vade sonunda basit faiz uygular. Yenilenen hesaplarda anaparaya faiz eklenerek bileşik etki oluşabilir.',
  },
  {
    q: '1 ay, 3 ay ve 6 ay vadeli mevduattan hangisi daha avantajlıdır?',
    a: 'Faiz oranları sabit kaldığında uzun vade daha yüksek toplam getiri sağlar. Ancak faiz oranlarının yükseleceği beklentisinde kısa vade daha esnektir; vade dolunca daha yüksek faizle yenileme yapılabilir.',
  },
  {
    q: 'Döviz mevduatında stopaj oranı farklı mı?',
    a: 'Evet. Döviz cinsinden mevduat hesaplarında stopaj oranı TL mevduata kıyasla farklı uygulanabilir. Güncel oranlar için Resmi Gazete yayımlarını veya bankanızı kontrol etmeniz önerilir.',
  },
];

export default function MevduatFaizPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Mevduat Faiz Hesaplama', url: 'https://hesaplayim.com/mevduat-faiz-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Kişisel Finans', href: '/#finans' },
            { label: 'Mevduat Faiz Hesaplama' },
          ]}
        />
        <MevduatFaizForm />
        <InfoSection
          title="Mevduat Faizi Nasıl Hesaplanır?"
          intro="Mevduat faizi; anapara, yıllık faiz oranı ve vade süresine göre hesaplanır. Türkiye'de mevduat faizi geliri stopaj vergisine (genellikle %15) tabidir."
          formula="Brüt Faiz = Anapara × Faiz Oranı × (Gün ÷ 365)   |   Net Faiz = Brüt Faiz × (1 − Stopaj Oranı)"
          steps={[
            'Anapara tutarını girin',
            'Yıllık faiz oranını girin',
            'Vade süresini gün olarak belirtin',
            'Brüt ve net faiz geliri hesaplanır',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="mevduat-faiz-hesaplama" />
      </div>
    </>
  );
}

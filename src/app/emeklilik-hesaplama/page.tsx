import type { Metadata } from 'next';
import EmeklilikForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Emeklilik Hesaplama 2026 — Yaş ve Prim Gün Şartı',
  description: 'Doğum yılı, cinsiyet ve prim gün sayısına göre 2026 emeklilik şartlarını kontrol edin.',
  keywords: ['emeklilik hesaplama', 'emeklilik yaşı 2026', 'prim gün sayısı', 'sgk emeklilik', 'eyt', 'emekliliğe ne kadar kaldı'],
  alternates: { canonical: 'https://hesaplayim.com/emeklilik-hesaplama' },
  openGraph: {
    title: 'Emeklilik Hesaplama 2026 — Yaş ve Prim Gün Şartı',
    description: 'Doğum yılı, cinsiyet ve prim gün sayısına göre 2026 emeklilik şartlarını kontrol edin.',
    url: 'https://hesaplayim.com/emeklilik-hesaplama',
  },
};

const faqs = [
  {
    q: '2026 emeklilik şartları nelerdir?',
    a: '5510 Sayılı Kanun ve geçici maddelere göre değişmekle birlikte genel kural: 1999 öncesi sigortalılar için kadınlarda 58, erkeklerde 60 yaş; 2008 sonrası girişlerde kadın 58, erkek 60 yaş ve en az 7.200 prim gün şartı.',
  },
  {
    q: 'Prim günümü nereden öğrenirim?',
    a: "SGK e-Devlet üzerinden 'Hizmet Dökümü' sorgusunu açarak toplam prim ödeme gün sayınızı görebilirsiniz.",
  },
  {
    q: 'Erkenden emeklilik (EYT) nedir?',
    a: "EYT düzenlemesi, 1999 öncesinde çalışmaya başlayanlar için yaş şartı olmaksızın kıdem ve prim günü koşulunu karşılayanların emekli olmasına imkan tanımıştır.",
  },
  {
    q: 'İsteğe bağlı sigorta prim günü emekliliğe sayılır mı?',
    a: 'Evet, isteğe bağlı sigorta primleri hizmet süresine ve prim gün sayısına eklenir. Kesin bilgi için SGK ile teyit ediniz.',
  },
];

export default function EmeklilikHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Emeklilik Hesaplama', url: 'https://hesaplayim.com/emeklilik-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Çalışan & Bordro', href: '/#calisma' },
            { label: 'Emeklilik Hesaplama' },
          ]}
        />
        <EmeklilikForm />
        <InfoSection
          title="Emeklilik Şartları Nasıl Hesaplanır?"
          intro="5510 Sayılı Sosyal Sigortalar ve Genel Sağlık Sigortası Kanunu'nun geçici ve kalıcı maddeleri çerçevesinde emeklilik hakkı; sigortalılık başlangıç tarihi, prim ödeme gün sayısı ve yaş olmak üzere üç temel kritere bağlıdır. 1999 öncesi sigortalılar eski sisteme, sonrası ise yeni sisteme tabidir."
          formula="Emeklilik = Sigortalılık Başlangıcına Göre Yaş Haddi + Prim Gün Sayısı Koşulu"
          steps={[
            'Doğum yılınızı girin',
            'Cinsiyetinizi seçin',
            'SGK hizmet dökümünüzdeki prim gün sayısını girin',
            'Yaş ve gün şartını karşılayıp karşılamadığınızı görün',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="emeklilik-hesaplama" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import NotOrtalamasiForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Not Ortalaması Hesaplama | Ağırlıklı Ortalama ve GPA',
  description:
    'Ders notlarınızı ve kredilerini girerek ağırlıklı not ortalamanızı (GNO), harf notunuzu ve 4\'lük GPA değerinizi hesaplayın.',
  alternates: { canonical: 'https://hesaplayim.com/not-ortalamasi-hesaplama' },
  openGraph: {
    title: 'Not Ortalaması Hesaplama | GNO ve GPA Hesapla',
    description: 'Ağırlıklı not ortalaması, harf notu ve GPA hesaplama aracı.',
    url: 'https://hesaplayim.com/not-ortalamasi-hesaplama',
  },
};

const faqs = [
  {
    q: 'AA notu 4.00 mü?',
    a: "Evet. Türkiye'deki standart 4'lük sistemde AA=4.00, BA=3.50, BB=3.00, CB=2.50, CC=2.00, DC=1.50, DD=1.00, FF=0.00'dır.",
  },
  {
    q: 'GNO 3.00 iyi midir?',
    a: 'GNO 3.00 (BB ortalaması) genel olarak iyi sayılır. Yüksek lisans başvurularında çoğu program en az 2.50-3.00 GNO şartı arar.',
  },
  {
    q: 'Ağırlıklı not ortalaması neden önemlidir?',
    a: 'Farklı kredilere sahip dersler, ortalamayı farklı ölçüde etkiler. 4 kredilik bir dersin notu, 2 kredilik bir dersin notundan iki kat daha fazla ağırlık taşır. Bu yüzden basit ortalama yerine ağırlıklı ortalama kullanmak daha doğrudur.',
  },
  {
    q: 'Onur ve yüksek onur belgesi için kaç GNO gerekir?',
    a: "Çoğu Türk üniversitesinde onur belgesi için GNO ≥ 3.00, yüksek onur belgesi için GNO ≥ 3.50 şartı aranır. Ancak üniversiteden üniversiteye farklılık gösterebilir; kesin bilgi için öğrenci işlerinize danışın.",
  },
];

export default function NotOrtalamasiHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Not Ortalaması Hesaplama', url: 'https://hesaplayim.com/not-ortalamasi-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Eğitim & Sınav', href: '/#egitim' },
            { label: 'Not Ortalaması Hesaplama' },
          ]}
        />
        <NotOrtalamasiForm />
        <InfoSection
          title="Not Ortalaması Nasıl Hesaplanır?"
          intro="Ağırlıklı not ortalaması (GNO/AGNO), her dersin kredisiyle çarpılmış notların toplamının toplam krediye bölünmesiyle hesaplanır. Bu araç harf notunu veya 100'lük puanı kabul eder ve onur belgesi için gereken GNO eşiğini de gösterir."
          formula="GNO = Σ(Harf Notu Katsayısı × Kredi) ÷ Toplam Kredi"
          steps={[
            "Her ders için harf notunu veya 100'lük puanı girin",
            'Dersin kredi saatini ekleyin; birden fazla ders ekleyebilirsiniz',
            'GNO ve 4.0 GPA eşdeğeri otomatik hesaplanır',
            'Mezuniyet onur durumunu tabloda kontrol edin',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="not-ortalamasi-hesaplama" />
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import AlanForm from './Form';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';
import { InfoSection } from '@/components/InfoSection';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Alan Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
  description:
    'Kare, dikdörtgen, üçgen, daire, trapez, paralelkenar ve elips için alan ve çevre hesaplama. Formül gösterimi ve birim seçimi.',
  alternates: { canonical: 'https://hesaplayim.com/alan-hesaplama' },
  openGraph: {
    title: 'Alan Hesaplama 2026 | Hızlı ve Güncel Hesaplama',
    description: '7 şekil için alan ve çevre hesaplama aracı. Formül adım adım gösterilir.',
    url: 'https://hesaplayim.com/alan-hesaplama',
  },
};

const faqs = [
  {
    q: 'Dönüm nedir, kaç metrekare eder?',
    a: "1 dönüm = 1.000 m². Arazi alım satımında yaygın kullanılan Türkiye'ye özgü bir alandır.",
  },
  {
    q: 'Ev metrekaresi nasıl hesaplanır?',
    a: 'Her odanın uzunluk × genişlik (metre cinsinden) çarpımı alınır, tüm alanlar toplanır. Balkon ve ortak alanlar dahil mi sorusunu satıcınıza sormayı unutmayın.',
  },
  {
    q: 'Üçgen alanı nasıl bulunur?',
    a: 'Üçgenin tabanı ve yüksekliği biliniyorsa Alan = (taban × yükseklik) ÷ 2 formülü kullanılır. Yalnızca üç kenar biliniyorsa Heron formülü uygulanır.',
  },
  {
    q: 'Daire alanı hesaplarken pi değeri olarak ne kullanılmalı?',
    a: "Hesap makinelerinde π ≈ 3.14159 kullanılır. Araç tam π değeriyle hesaplar ve sonucu metrekare veya seçilen birimde gösterir.",
  },
  {
    q: 'Hektar ile dönüm farkı nedir?',
    a: '1 hektar = 10.000 m² iken 1 dönüm = 1.000 m²dir. Yani 1 hektar = 10 dönüm eder. Büyük tarım arazileri için hektar, küçük parseller için dönüm tercih edilir.',
  },
];

export default function AlanHesaplamaPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Alan Hesaplama', url: 'https://hesaplayim.com/alan-hesaplama' },
        ]}
      />
      <FaqSchema faqs={faqs} />
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Matematik', href: '/#matematik' },
            { label: 'Alan Hesaplama' },
          ]}
        />
        <AlanForm />
        <InfoSection
          title="Alan Hesaplama Formülleri"
          intro="Kare, dikdörtgen, üçgen, daire, yamuk ve daha fazla şeklin alanı tek araçta hesaplanır. Şekil seçildikten sonra gerekli ölçüler girilir; hem alan hem de çevre sonucu anında gösterilir. Birim olarak metre, santimetre, milimetre veya yard seçilebilir."
          formula="Dikdörtgen: A = a × b   |   Üçgen: A = (taban × yükseklik) ÷ 2   |   Daire: A = π × r²"
          steps={[
            'Hesaplamak istediğiniz şekli seçin (kare, dikdörtgen, üçgen vb.)',
            'İstenen ölçüleri (kenar, yükseklik, yarıçap) girin',
            'Birim olarak m², cm² veya başka bir seçenek belirleyin',
            'Alan ve çevre sonuçlarını okuyun; formülü kontrol edin',
          ]}
          faqs={faqs}
        />
        <RelatedTools slug="alan-hesaplama" />
      </div>
    </>
  );
}

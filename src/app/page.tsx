import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wallet,
  FileText,
  Receipt,
  Percent,
  CalendarDays,
  Cake,
  Ruler,
  Scale,
  Timer,
  ArrowLeftRight,
  Building2,
  Activity,
  Flame,
  Baby,
  Target,
  Droplets,
  Footprints,
  Moon,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hesapladım.com | Türkiye Çalışan Hesaplama Araçları 2026',
};

const ARACLAR: {
  href: string;
  baslik: string;
  aciklama: string;
  Ikon: LucideIcon;
  renk: string;
  yakinDa?: boolean;
}[] = [
  {
    href: '/brutten-nete',
    baslik: 'Brütten Nete Maaş',
    aciklama:
      '2026 güncel gelir vergisi dilimleriyle brüt maaşınızdan net ele geçen tutarı hesaplayın.',
    Ikon: Wallet,
    renk: 'from-blue-600 to-blue-800',
  },
  {
    href: '/kidem-tazminati',
    baslik: 'Kıdem Tazminatı',
    aciklama:
      'İşe giriş ve çıkış tarihinizi girerek yasal tavan dahilinde kıdem tazminatınızı öğrenin.',
    Ikon: FileText,
    renk: 'from-indigo-600 to-indigo-800',
  },
  {
    href: '/kdv-hesaplama',
    baslik: 'KDV Hesaplama',
    aciklama:
      'KDV hariç/dahil fiyatları %1, %8, %10, %18 ve %20 oranlarıyla anında hesaplayın.',
    Ikon: Receipt,
    renk: 'from-emerald-500 to-emerald-700',
  },
  {
    href: '/yuzde-hesaplama',
    baslik: 'Yüzde Hesaplama',
    aciklama:
      '5 farklı modda yüzde hesaplama: artış, azalış, oran bulma ve yüzde değişim hesaplama.',
    Ikon: Percent,
    renk: 'from-orange-500 to-orange-700',
  },
  {
    href: '/tarih-farki-hesaplama',
    baslik: 'Tarih Farkı',
    aciklama:
      'İki tarih arasındaki gün, ay, yıl, hafta farkını ve X gün sonrasını hesaplayın.',
    Ikon: CalendarDays,
    renk: 'from-pink-500 to-pink-700',
  },
  {
    href: '/yas-hesaplama',
    baslik: 'Yaş Hesaplama',
    aciklama:
      'Doğum tarihinizden yaşınızı, burç bilginizi ve doğum gününüze kalan günü öğrenin.',
    Ikon: Cake,
    renk: 'from-purple-500 to-purple-700',
  },
  {
    href: '/alan-hesaplama',
    baslik: 'Alan Hesaplama',
    aciklama:
      'Kare, daire, üçgen ve daha fazlası için alan ve çevre hesaplama. Formül gösterimi ile.',
    Ikon: Ruler,
    renk: 'from-teal-500 to-teal-700',
  },
  {
    href: '/oran-orantiyi-hesaplama',
    baslik: 'Oran Orantı',
    aciklama:
      'a/b = c/d denkleminde bilinmeyeni adım adım çözün. Doğru orantı hesaplama aracı.',
    Ikon: Scale,
    renk: 'from-cyan-500 to-cyan-700',
  },
  {
    href: '/zaman-donusturme',
    baslik: 'Zaman Dönüştürme',
    aciklama:
      'Saniye, dakika, saat, gün, hafta, ay ve yıl arasında anında zaman dönüştürme tablosu.',
    Ikon: Timer,
    renk: 'from-rose-500 to-rose-700',
  },
  {
    href: '/vki-hesaplama',
    baslik: 'VKİ Hesaplama',
    aciklama:
      'Boy ve kilonuza göre Vücut Kitle İndeksinizi, ideal kilo aralığınızı ve kategorinizi öğrenin.',
    Ikon: Activity,
    renk: 'from-lime-500 to-lime-700',
  },
  {
    href: '/kalori-hesaplama',
    baslik: 'Kalori Hesaplama',
    aciklama:
      'Harris-Benedict formülüyle günlük kalori ihtiyacınızı aktivite seviyenize göre hesaplayın.',
    Ikon: Flame,
    renk: 'from-amber-500 to-amber-700',
  },
  {
    href: '/gebelik-haftasi-hesaplama',
    baslik: 'Gebelik Haftası',
    aciklama:
      'Son adet tarihinize göre gebelik haftanızı, trimestır aşamanızı ve tahmini doğum gününüzü bulun.',
    Ikon: Baby,
    renk: 'from-pink-400 to-pink-600',
  },
  {
    href: '/ideal-kilo-hesaplama',
    baslik: 'İdeal Kilo',
    aciklama:
      'Devine, Robinson, Miller ve Hamilton formülleriyle boyunuza göre ideal kilonuzu hesaplayın.',
    Ikon: Target,
    renk: 'from-green-500 to-green-700',
  },
  {
    href: '/su-ihtiyaci-hesaplama',
    baslik: 'Su İhtiyacı',
    aciklama:
      'Kilonuza, aktivite seviyenize ve iklime göre günlük su ihtiyacınızı ve bardak sayınızı bulun.',
    Ikon: Droplets,
    renk: 'from-sky-400 to-sky-600',
  },
  {
    href: '/adim-kalori-hesaplama',
    baslik: 'Adım / Kalori',
    aciklama:
      'Attığınız adım sayısına göre yakılan kalori, kat edilen mesafe ve yürüyüş süresini hesaplayın.',
    Ikon: Footprints,
    renk: 'from-orange-400 to-orange-600',
  },
  {
    href: '/uyku-saati-hesaplama',
    baslik: 'Uyku Saati',
    aciklama:
      'Uyanmak istediğiniz saate göre uyku döngüsüne uygun ideal yatış saatlerini keşfedin.',
    Ikon: Moon,
    renk: 'from-violet-500 to-violet-700',
  },
  {
    href: '#',
    baslik: 'Netten Brüte',
    aciklama: 'Almak istediğiniz net maaşa göre brüt rakamını tersine hesaplayın.',
    Ikon: ArrowLeftRight,
    renk: 'from-sky-500 to-sky-700',
    yakinDa: true,
  },
  {
    href: '#',
    baslik: 'İşveren Maliyeti',
    aciklama: 'Bir çalışan için toplam işveren maliyetini SGK işveren payıyla birlikte görün.',
    Ikon: Building2,
    renk: 'from-violet-600 to-violet-800',
    yakinDa: true,
  },
];

export default function AnaSayfa() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Çalışan Hesaplama Araçları
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            2026 güncel vergi dilimleri ve yasal parametrelerle hızlı, doğru hesaplama. GİB ve
            ÇSGB mevzuatına dayalı sonuçlar.
          </p>
        </div>
      </section>

      {/* Araçlar */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Tüm Hesaplama Araçları
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ARACLAR.map((arac) => (
            <div key={arac.baslik} className="relative">
              <Link
                href={arac.href}
                className={`flex flex-col h-44 rounded-2xl p-6 bg-gradient-to-br ${arac.renk} text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 ${arac.yakinDa ? 'pointer-events-none opacity-70' : ''}`}
              >
                <arac.Ikon size={32} strokeWidth={1.75} className="mb-3 shrink-0" />
                <h3 className="font-bold text-lg mb-1 leading-snug">{arac.baslik}</h3>
                <p className="text-sm text-white/80 leading-relaxed line-clamp-2">{arac.aciklama}</p>
              </Link>
              {arac.yakinDa && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  Yakında
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bilgi notu */}
      <section className="bg-white border-t border-gray-200 py-10 px-4">
        <div className="max-w-3xl mx-auto text-center text-gray-500 text-sm leading-relaxed">
          <p>
            Tüm hesaplamalar <strong>2026 yılı</strong> için geçerli vergi dilimleri, asgari ücret
            (₺22.104,67) ve kıdem tazminatı tavanı (₺64.948,77) esas alınarak gerçekleştirilir.
            Veriler GİB ve ÇSGB mevzuatına dayanmaktadır. Sonuçlar bilgilendirme amaçlıdır, yasal
            danışmanlık niteliği taşımaz.
          </p>
        </div>
      </section>
    </>
  );
}

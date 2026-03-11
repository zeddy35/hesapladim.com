import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '@/data/tools';
import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';

export const metadata: Metadata = {
  title: "Hesaplayim.com | Türkiye'nin En Hızlı Hesaplama Platformu",
  description:
    '2026 güncel hesaplama araçları: brütten nete maaş, KDV, TYT puanı, kira artış, tapu harcı ve 30+ araç.',
};

const POPULAR_LINKS = [
  { name: 'Brütten Nete', href: '/brutten-nete' },
  { name: 'KDV Hesaplama', href: '/kdv-hesaplama' },
  { name: 'TYT Puan', href: '/tyt-puan-hesaplama' },
  { name: 'Kıdem Tazminatı', href: '/kidem-tazminati' },
  { name: 'VKİ', href: '/vki-hesaplama' },
];

const POPULAR_SIDEBAR = [
  { name: 'Brütten Nete Maaş', href: '/brutten-nete' },
  { name: 'KDV Hesaplama', href: '/kdv-hesaplama' },
  { name: 'TYT Puan Hesaplama', href: '/tyt-puan-hesaplama' },
  { name: 'VKİ Hesaplama', href: '/vki-hesaplama' },
  { name: 'Kıdem Tazminatı', href: '/kidem-tazminati' },
];

const RECENTLY_ADDED = [
  { name: 'ÖTV Hesaplama', href: '/otv-hesaplama' },
  { name: 'Mevduat Faizi', href: '/mevduat-faiz-hesaplama' },
  { name: 'Kira Artış', href: '/kira-artis-hesaplama' },
  { name: 'GPA Hesaplama', href: '/gpa-hesaplama' },
  { name: 'Uyku Saati', href: '/uyku-saati-hesaplama' },
];

function buildCategoriesWithIndex() {
  let idx = 0;
  return CATEGORIES.map(cat => {
    const startIndex = idx;
    idx += cat.tools.length;
    return { cat, startIndex };
  });
}

const CATEGORIES_WITH_INDEX = buildCategoriesWithIndex();

export default function AnaSayfa() {
  return (
    <>
      {/* ── Compact Hero ── */}
      <section className="bg-white border-b border-slate-200 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            30+ Araç · 2026 Güncel Mevzuat
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 py-4 tracking-tight mb-2 leading-tight">
            Türkiye&apos;nin En Hızlı
            <br />
            <span className="text-blue-600">Hesaplama Platformu</span>
          </h1>
          <p className="text-slate-500 text-sm mb-7">
            GİB ve ÇSGB mevzuatına dayalı güncel hesaplamalar — hızlı, doğru, ücretsiz.
          </p>



          <div className="flex flex-wrap justify-center items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Popüler:</span>
            {POPULAR_LINKS.map(p => (
              <Link
                key={p.href}
                href={p.href}
                className="text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 px-3 py-1.5 rounded-full transition-colors"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main content + sidebar ── */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex gap-8 items-start">

          {/* Category sections */}
          <div className="flex-1 min-w-0 space-y-10">
            {CATEGORIES_WITH_INDEX.map(({ cat, startIndex }) => (
              <CategorySection key={cat.id} category={cat} startIndex={startIndex} />
            ))}
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden xl:block w-56 shrink-0 sticky top-24 space-y-4">

            {/* Popüler */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <TrendingUp size={13} />
                Popüler
              </h3>
              <ol className="space-y-2">
                {POPULAR_SIDEBAR.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2.5 text-sm text-slate-600 hover:text-blue-600 transition-colors group"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                        {i + 1}
                      </span>
                      <span className="truncate text-xs">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Son Eklenen */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Sparkles size={13} />
                Son Eklenen
              </h3>
              <ul className="space-y-2">
                {RECENTLY_ADDED.map(item => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                      <ArrowRight size={12} className="text-slate-300 shrink-0" />
                      <span className="truncate text-xs">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
}

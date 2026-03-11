import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { CATEGORIES } from '@/data/tools';

const FOOTER_CATS = CATEGORIES.filter(c => c.id !== 'yakinda');

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Calculator size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-slate-800">
                hesaplayim<span className="text-blue-600">.com</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Türkiye&apos;nin hesaplama platformu. 30+ araç, güncel vergi dilimleri
              ve yasal mevzuat ile hızlı, doğru sonuçlar.
            </p>
          </div>

          {/* Araçlar */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4 text-xs uppercase tracking-widest">
              Araçlar
            </h3>
            <ul className="space-y-2">
              {FOOTER_CATS.map(cat => (
                <li key={cat.id}>
                  <span className="text-sm text-slate-500">
                    {cat.emoji} {cat.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hakkında */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-4 text-xs uppercase tracking-widest">
              Hakkında
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                  Hakkımızda
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
          © 2026 hesaplayim.com &mdash; Veriler GİB ve ÇSGB mevzuatına dayanmaktadır.
          Sonuçlar bilgilendirme amaçlıdır, yasal danışmanlık niteliği taşımaz.
        </div>
      </div>
    </footer>
  );
}

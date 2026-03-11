'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { damgaVergisiHesapla } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';
import { DAMGA_VERGISI_BELGE_ORANLARI } from '@/lib/config';

const BELGELER = Object.entries(DAMGA_VERGISI_BELGE_ORANLARI).map(([key, val]) => ({
  key,
  etiket: val.etiket,
  oran: val.oran,
}));

export default function DamgaVergisiForm() {
  const [belge, setBelge] = useState('kiraKontrati');
  const [tutar, setTutar] = useState('');

  const tutarSayi = Number(tutar.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc = tutarSayi > 0 ? damgaVergisiHesapla(belge, tutarSayi) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Damga Vergisi Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Belge türünü ve tutarı girerek ödenecek damga vergisini anında hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Belge Türü</label>
            <select
              value={belge}
              onChange={(e) => setBelge(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {BELGELER.map((b) => (
                <option key={b.key} value={b.key}>
                  {b.etiket} (‰{(b.oran * 1000).toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">İşlem Tutarı (₺)</label>
            <input
              type="number" min="0" value={tutar}
              onChange={(e) => setTutar(e.target.value)}
              placeholder="örn: 500.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-blue-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Damga Vergisi</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.vergiTutari)}</p>
                <p className="text-sm text-blue-200 mt-1">
                  Oran: ‰{(sonuc.vergiOrani * 1000).toFixed(2)} &nbsp;·&nbsp; Toplam: {formatCurrency(sonuc.toplamTutar)}
                </p>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 text-gray-600">Belge Türü</td><td className="py-2 text-right font-medium">{DAMGA_VERGISI_BELGE_ORANLARI[belge]?.etiket}</td></tr>
                  <tr><td className="py-2 text-gray-600">İşlem Tutarı</td><td className="py-2 text-right">{formatCurrency(tutarSayi)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Damga Vergisi Oranı</td><td className="py-2 text-right">‰{(sonuc.vergiOrani * 1000).toFixed(2)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Damga Vergisi Tutarı</td><td className="py-2 text-right text-red-600 font-semibold">{formatCurrency(sonuc.vergiTutari)}</td></tr>
                  <tr className="border-t-2 border-blue-200"><td className="py-2.5 font-bold text-blue-800">Toplam (Tutar + Vergi)</td><td className="py-2.5 text-right font-bold text-blue-800">{formatCurrency(sonuc.toplamTutar)}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {/* Karşılaştırma tablosu */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-bold text-gray-800 mb-4">Tüm Belge Türleri</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-500 font-medium">Belge</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Oran</th>
                  {tutarSayi > 0 && <th className="text-right py-2 text-gray-500 font-medium">Bu tutar için</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {BELGELER.map((b) => (
                  <tr key={b.key} className={b.key === belge ? 'bg-blue-50 font-semibold' : ''}>
                    <td className="py-2 cursor-pointer hover:text-blue-700" onClick={() => setBelge(b.key)}>{b.etiket}</td>
                    <td className="py-2 text-right">‰{(b.oran * 1000).toFixed(2)}</td>
                    {tutarSayi > 0 && (
                      <td className="py-2 text-right text-red-600">{formatCurrency(tutarSayi * b.oran)}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdBanner slot="mid" size="728x90" />

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'Damga vergisi nedir?', a: '488 sayılı Damga Vergisi Kanunu\'na göre kâğıtlar (sözleşme, bordro, ihale kararı vb.) üzerinden alınan bir vergi türüdür. Belgenin türüne ve tutarına göre binde cinsinden hesaplanır.' },
            { q: 'Kira kontratı damga vergisi kim öder?', a: 'Kira sözleşmelerinde damga vergisi genellikle kiracı tarafından ödenir; ancak taraflarca farklı bir düzenleme yapılabilir.' },
            { q: 'Damga vergisi üst sınırı var mı?', a: 'Evet. Her bir kâğıt için ödenen belirli türlerdeki damga vergisinin azami (tavan) tutarı her yıl yeniden değerleme oranına göre belirlenir.' },
          ].map(({ q, a }) => (
            <details key={q} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer group">
              <summary className="font-semibold text-gray-800 list-none flex justify-between items-center gap-4">
                {q}
                <ChevronDown size={16} className="text-blue-600 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <AdBanner slot="footer" size="728x90" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown, AlertTriangle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { yuzdelikDilim, type YksSinav } from '@/lib/calculations';

const SINAV_TIPLERI: { id: YksSinav; label: string }[] = [
  { id: 'TYT', label: 'TYT' },
  { id: 'SAY', label: 'AYT Sayısal' },
  { id: 'EA',  label: 'AYT Eşit Ağırlık' },
  { id: 'SOZ', label: 'AYT Sözel' },
  { id: 'DIL', label: 'AYT Dil' },
];

function yuzdelikRenk(y: number) {
  if (y <= 5)  return { text: 'text-green-600', bg: 'bg-green-50 border-green-200' };
  if (y <= 20) return { text: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200'  };
  if (y <= 50) return { text: 'text-yellow-600',bg: 'bg-yellow-50 border-yellow-200' };
  return { text: 'text-red-500', bg: 'bg-red-50 border-red-200' };
}

function formatSiralama(n: number) {
  if (n >= 1_000_000) return `~${(n / 1_000_000).toFixed(1)} milyon`;
  if (n >= 1_000)     return `~${Math.round(n / 1000)}K`;
  return `~${n}`;
}

export default function YuzdelikForm() {
  const [puan, setPuan] = useState('');
  const [sinav, setSinav] = useState<YksSinav>('TYT');

  const puanN = parseFloat(puan);
  const sonuc = puan && puanN >= 100 && puanN <= 500 ? yuzdelikDilim(puanN, sinav) : null;
  const renk = sonuc ? yuzdelikRenk(sonuc.tahminiYuzdelik) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">YKS Yüzdelik Dilim Hesaplama 2024</h1>
      <p className="text-gray-500 mb-8">
        Puan ve sınav tipini girerek tahmini yüzdelik diliminizi ve sıralamanızı öğrenin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Sınav Tipi</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {SINAV_TIPLERI.map((s) => (
              <button
                key={s.id}
                onClick={() => setSinav(s.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${sinav === s.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Puanınız (100–500)</label>
          <input
            type="number" min="100" max="500" step="0.01"
            value={puan}
            onChange={(e) => setPuan(e.target.value)}
            placeholder="Örn: 250"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />

          <div className="mt-5 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>Bu hesaplama tahminidir. Resmi yüzdelik dilim ÖSYM tarafından sınav sonuçlarıyla birlikte açıklanır.</span>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && renk && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              {/* Yüzdelik */}
              <div className={`rounded-xl border p-5 text-center ${renk.bg}`}>
                <p className="text-sm text-gray-500 mb-1">Tahmini Yüzdelik Diliminiz</p>
                <p className={`text-6xl font-extrabold ${renk.text}`}>%{sonuc.tahminiYuzdelik}</p>
              </div>

              {/* Sıralama */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 mb-1">Tahmini Sıralama</p>
                <p className="text-3xl font-bold text-gray-800">{formatSiralama(sonuc.tahminiSiralama)}. sıra</p>
              </div>

              {/* Üniversite olasılığı */}
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-900 leading-relaxed">
                <p className="font-semibold mb-1">Genel Değerlendirme</p>
                <p>{sonuc.universiteOlasiligi}</p>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>İlk %0</span>
                  <span className="font-semibold text-gray-600">%{sonuc.tahminiYuzdelik}</span>
                  <span>%100</span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all ${renk.text.replace('text-', 'bg-')}`}
                    style={{ width: `${Math.min(sonuc.tahminiYuzdelik, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" size="728x90" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'YKS yüzdelik dilim ne anlama gelir?', a: 'Yüzdelik dilim, sınava giren adaylar içinde sizden düşük puan alanların yüzdesini gösterir. %1\'lik dilim olmak demek, adayların %99\'unun sizden düşük puan aldığı anlamına gelir.' },
            { q: 'Bu hesaplama ne kadar doğru?', a: '2024 ÖSYM verileri baz alınarak hazırlanmıştır ancak her yılın tablo değerleri değişebilir. Kesin sonuç için ÖSYM\'nin resmi yüzdelik dilim tablosunu kontrol edin.' },
            { q: 'Hangi dilim hangi üniversiteye denk gelir?', a: 'İlk %1: Prestijli bölümler — İlk %5: İyi devlet üniversiteleri — İlk %20: Orta-üstü devlet programları — İlk %50: Bazı devlet ve vakıf üniversiteleri.' },
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

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

interface Ders {
  key: string;
  label: string;
  katsayi: number;
  maxSoru: number;
}

const DERSLER: Ders[] = [
  { key: 'turkce', label: 'Türkçe', katsayi: 4.0, maxSoru: 20 },
  { key: 'matematik', label: 'Matematik', katsayi: 4.0, maxSoru: 20 },
  { key: 'fen', label: 'Fen Bilimleri', katsayi: 2.8, maxSoru: 20 },
  { key: 'inkılap', label: 'İnkılap Tarihi', katsayi: 2.0, maxSoru: 10 },
  { key: 'ingilizce', label: 'İngilizce', katsayi: 1.2, maxSoru: 10 },
  { key: 'din', label: 'Din Kültürü', katsayi: 1.0, maxSoru: 10 },
];

type Inputs = Record<string, { dogru: string; yanlis: string }>;

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function LgsPuanForm() {
  const [inputs, setInputs] = useState<Inputs>(
    Object.fromEntries(DERSLER.map((d) => [d.key, { dogru: '', yanlis: '' }]))
  );

  function setVal(key: string, field: 'dogru' | 'yanlis', val: string) {
    setInputs((prev) => ({ ...prev, [key]: { ...prev[key], [field]: val } }));
  }

  interface DersResult {
    dogru: number;
    yanlis: number;
    net: number;
    agirlikliNet: number;
    katsayi: number;
  }

  const results: Record<string, DersResult> = {};
  let toplamAgirlikliNet = 0;
  let valid = false;

  for (const d of DERSLER) {
    const dogru = Number(inputs[d.key].dogru) || 0;
    const yanlis = Number(inputs[d.key].yanlis) || 0;
    if (dogru > 0 || yanlis > 0) valid = true;
    const net = dogru - yanlis / 3;
    const agirlikliNet = net * d.katsayi;
    toplamAgirlikliNet += agirlikliNet;
    results[d.key] = { dogru, yanlis, net, agirlikliNet, katsayi: d.katsayi };
  }

  const tahminiPuan = valid ? Math.max(200, Math.min(500, 200 + toplamAgirlikliNet * 1.5)) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">LGS Puan Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Her ders için doğru ve yanlış sayılarını girerek ağırlıklı net puanınızı ve tahmini LGS puanınızı hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-4">
          <p className="text-xs text-gray-400">Her ders için doğru ve yanlış sayısını girin</p>
          {DERSLER.map((d) => (
            <div key={d.key} className="border border-gray-100 rounded-xl p-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">{d.label}</span>
                <span className="text-xs text-blue-600 font-medium">Katsayı: {d.katsayi}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Doğru (0-{d.maxSoru})</label>
                  <input
                    type="number"
                    min="0"
                    max={d.maxSoru}
                    value={inputs[d.key].dogru}
                    onChange={(e) => setVal(d.key, 'dogru', e.target.value)}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Yanlış</label>
                  <input
                    type="number"
                    min="0"
                    max={d.maxSoru}
                    value={inputs[d.key].yanlis}
                    onChange={(e) => setVal(d.key, 'yanlis', e.target.value)}
                    placeholder="0"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {tahminiPuan !== null && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-emerald-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Tahmini LGS Puanı</p>
                <p className="text-5xl font-extrabold">{fmt2(tahminiPuan)}</p>
                <p className="text-sm text-emerald-200 mt-1">Toplam Ağırlıklı Net: {fmt2(toplamAgirlikliNet)}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Ders</th>
                      <th className="p-2 text-center border border-gray-200">D</th>
                      <th className="p-2 text-center border border-gray-200">Y</th>
                      <th className="p-2 text-center border border-gray-200">Net</th>
                      <th className="p-2 text-center border border-gray-200">Katsayı</th>
                      <th className="p-2 text-right border border-gray-200">Ağırlıklı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DERSLER.map((d) => {
                      const r = results[d.key];
                      return (
                        <tr key={d.key} className="hover:bg-gray-50">
                          <td className="p-2 border border-gray-200 text-xs">{d.label}</td>
                          <td className="p-2 border border-gray-200 text-center text-green-700">{r.dogru}</td>
                          <td className="p-2 border border-gray-200 text-center text-red-600">{r.yanlis}</td>
                          <td className="p-2 border border-gray-200 text-center font-semibold">{fmt2(r.net)}</td>
                          <td className="p-2 border border-gray-200 text-center text-gray-500">{r.katsayi}</td>
                          <td className="p-2 border border-gray-200 text-right font-semibold text-blue-700">{fmt2(r.agirlikliNet)}</td>
                        </tr>
                      );
                    })}
                    <tr className="bg-gray-50 font-bold">
                      <td colSpan={5} className="p-2 border border-gray-200 text-right text-gray-700">Toplam</td>
                      <td className="p-2 border border-gray-200 text-right text-blue-800">{fmt2(toplamAgirlikliNet)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                <strong>Uyarı:</strong> Bu hesaplama yaklaşık bir tahmindir. Gerçek LGS puanları ÖSYM tarafından karmaşık bir istatistiksel yöntemle hesaplanır ve sınava giren öğrenci sayısına, soru güçlüğüne göre farklılık gösterebilir.
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" />

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'LGS\'de net nasıl hesaplanır?',
              a: 'LGS\'de her ders için net = Doğru Sayısı − Yanlış Sayısı / 3 formülüyle hesaplanır. Yani 3 yanlış, 1 doğruyu siler.',
            },
            {
              q: 'LGS ders katsayıları nelerdir?',
              a: 'Türkçe ve Matematik 4,0 katsayısıyla en yüksek ağırlığa sahipken; Fen Bilimleri 2,8, İnkılap Tarihi 2,0, İngilizce 1,2 ve Din Kültürü 1,0 katsayısıyla hesaplanır.',
            },
            {
              q: 'LGS puanı kaç puan üzerinden hesaplanır?',
              a: 'LGS puanları 200-500 puan arasında değişir. En düşük puan 200, en yüksek puan 500\'dür. Puanlar, sınava giren öğrencilerin performansına göre istatistiksel olarak hesaplanır.',
            },
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

      <AdBanner slot="footer" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function KarZararForm() {
  const [maliyet, setMaliyet] = useState('');
  const [satis, setSatis] = useState('');

  const cost = Number(maliyet.replace(/\./g, '').replace(',', '.')) || 0;
  const sell = Number(satis.replace(/\./g, '').replace(',', '.')) || 0;

  let sonuc: { fark: number; oran: number; karMi: boolean } | null = null;

  if (cost > 0 && sell > 0) {
    const fark = sell - cost;
    const oran = (fark / cost) * 100;
    sonuc = { fark, oran, karMi: fark >= 0 };
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kar / Zarar Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Maliyet ve satış fiyatını girerek kar veya zarar tutarını ve kârlılık oranını öğrenin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Maliyet Fiyatı (₺)</label>
            <input
              type="number"
              min="0"
              value={maliyet}
              onChange={(e) => setMaliyet(e.target.value)}
              placeholder="örn: 1.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Satış Fiyatı (₺)</label>
            <input
              type="number"
              min="0"
              value={satis}
              onChange={(e) => setSatis(e.target.value)}
              placeholder="örn: 1.400"
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
              <div
                className={`${sonuc.karMi ? 'bg-green-600' : 'bg-red-600'} text-white rounded-xl p-5 text-center`}
              >
                <p className="text-sm opacity-80 mb-1">{sonuc.karMi ? 'Kar' : 'Zarar'}</p>
                <p className="text-5xl font-extrabold">
                  {sonuc.karMi ? '+' : ''}{fmt2(sonuc.fark)} ₺
                </p>
                <p className={`text-sm mt-1 ${sonuc.karMi ? 'text-green-200' : 'text-red-200'}`}>
                  {sonuc.karMi ? '+' : ''}{fmt2(sonuc.oran)}% {sonuc.karMi ? 'kâr marjı' : 'zarar'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Maliyet Fiyatı</p>
                  <p className="text-xl font-bold text-gray-800">{fmt2(cost)} ₺</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">Satış Hasılatı</p>
                  <p className="text-xl font-bold text-blue-800">{fmt2(sell)} ₺</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Maliyet Fiyatı</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(cost)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Satış Fiyatı</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(sell)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">{sonuc.karMi ? 'Kar Tutarı' : 'Zarar Tutarı'}</td>
                    <td className={`py-2.5 text-right font-semibold ${sonuc.karMi ? 'text-green-600' : 'text-red-600'}`}>
                      {sonuc.karMi ? '+' : ''}{fmt2(sonuc.fark)} ₺
                    </td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">{sonuc.karMi ? 'Kâr Marjı' : 'Zarar Oranı'}</td>
                    <td className={`pt-3 text-right text-lg ${sonuc.karMi ? 'text-green-700' : 'text-red-700'}`}>
                      {sonuc.karMi ? '+' : ''}{fmt2(sonuc.oran)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" size="728x90" />

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Kar oranı nasıl hesaplanır?',
              a: 'Kar oranı (kâr marjı) = (Satış Fiyatı − Maliyet Fiyatı) / Maliyet Fiyatı × 100 formülüyle hesaplanır. Örneğin 1.000 ₺ maliyetle alınan ürünü 1.400 ₺\'ye satarsanız kar oranınız %40\'tır.',
            },
            {
              q: 'Zarar ne zaman oluşur?',
              a: 'Satış fiyatı maliyet fiyatının altında kaldığında zarar oluşur. Zarar oranı da aynı formülle hesaplanır; yalnızca sonuç negatif çıkar.',
            },
            {
              q: 'Kâr marjı ile kârlılık oranı aynı şey midir?',
              a: 'Kâr marjı genellikle satış fiyatına oranı ifade eder; ancak bu hesaplayıcıda kâr oranı, maliyete göre hesaplanmaktadır (cost-based markup). Örneğin %40 kâr oranı, satış fiyatının maliyetin 1,4 katı olduğu anlamına gelir.',
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

      <AdBanner slot="footer" size="728x90" />
    </div>
  );
}

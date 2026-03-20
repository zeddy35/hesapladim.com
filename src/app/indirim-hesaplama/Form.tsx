'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function IndirimForm() {
  const [orijinal, setOrijinal] = useState('');
  const [oran, setOran] = useState('');

  const originalPrice = Number(orijinal.replace(/\./g, '').replace(',', '.')) || 0;
  const discountRate = Number(oran.replace(',', '.')) || 0;

  let sonuc: { indirimliTutar: number; tasarruf: number; indirimTutari: number } | null = null;

  if (originalPrice > 0 && discountRate > 0 && discountRate <= 100) {
    const tasarruf = (originalPrice * discountRate) / 100;
    const indirimliTutar = originalPrice - tasarruf;
    sonuc = { indirimliTutar, tasarruf, indirimTutari: tasarruf };
  }

  const quickRates = [5, 10, 15, 20, 25, 30, 40, 50];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">İndirim Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Orijinal fiyat ve indirim oranına göre indirimli fiyatı ve tasarruf edilen tutarı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Orijinal Fiyat (₺)</label>
            <input
              type="number"
              min="0"
              value={orijinal}
              onChange={(e) => setOrijinal(e.target.value)}
              placeholder="örn: 1.200"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">İndirim Oranı (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={oran}
              onChange={(e) => setOran(e.target.value)}
              placeholder="örn: 30"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <div className="grid grid-cols-4 gap-1.5">
              {quickRates.map((r) => (
                <button
                  key={r}
                  onClick={() => setOran(String(r))}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    oran === String(r) ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  %{r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-green-600 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">İndirimli Fiyat</p>
                <p className="text-5xl font-extrabold">{fmt2(sonuc.indirimliTutar)} ₺</p>
                <p className="text-sm text-green-200 mt-1">%{discountRate} indirim uygulandı</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Orijinal Fiyat</p>
                  <p className="text-xl font-bold text-gray-800 line-through">{fmt2(originalPrice)} ₺</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <p className="text-xs text-red-500 mb-1">Tasarruf</p>
                  <p className="text-xl font-bold text-red-700">{fmt2(sonuc.tasarruf)} ₺</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Orijinal Fiyat</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(originalPrice)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">İndirim Oranı</td>
                    <td className="py-2.5 text-right font-semibold">%{discountRate}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">İndirim Tutarı</td>
                    <td className="py-2.5 text-right text-red-600">−{fmt2(sonuc.indirimTutari)} ₺</td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">İndirimli Fiyat</td>
                    <td className="pt-3 text-right text-green-700 text-lg">{fmt2(sonuc.indirimliTutar)} ₺</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
                <strong>Tasarruf:</strong> %{discountRate} indirimle {fmt2(originalPrice)} ₺ yerine{' '}
                {fmt2(sonuc.indirimliTutar)} ₺ ödersiniz. {fmt2(sonuc.tasarruf)} ₺ tasarruf edersiniz.
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
              q: 'İndirimli fiyat nasıl hesaplanır?',
              a: 'İndirimli Fiyat = Orijinal Fiyat × (1 − İndirim Oranı / 100). Örneğin 1.200 ₺\'lik ürünün %30 indirimli fiyatı = 1.200 × 0,70 = 840 ₺\'dir.',
            },
            {
              q: 'İndirim tutarı nasıl bulunur?',
              a: 'İndirim Tutarı = Orijinal Fiyat × İndirim Oranı / 100. 1.200 ₺\'de %30 indirim → 1.200 × 0,30 = 360 ₺ indirim.',
            },
            {
              q: 'Seri indirim nedir?',
              a: 'Seri indirim, birden fazla indirimin sırayla uygulanmasıdır. Örneğin %20 ve %10 iki ayrı indirim %30 değil, %28 toplam indirime eşittir: (1−0,20) × (1−0,10) = 0,72 → %28 indirim.',
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

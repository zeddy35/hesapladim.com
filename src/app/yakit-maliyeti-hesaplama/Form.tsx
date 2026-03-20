'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { yakitMaliyeti } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

const YAKIT_FIYATLARI = [
  { label: 'Benzin (örn)', deger: 45 },
  { label: 'Motorin (örn)', deger: 42 },
  { label: 'LPG (örn)', deger: 20 },
];

export default function YakitMaliyetiForm() {
  const [mesafe, setMesafe] = useState('');
  const [tuketim, setTuketim] = useState('');
  const [litreFiyati, setLitreFiyati] = useState('');

  const mes = Number(mesafe) || 0;
  const tuk = Number(tuketim) || 0;
  const fiyat = Number(litreFiyati.replace(',', '.')) || 0;

  const sonuc = mes > 0 && tuk > 0 && fiyat > 0 ? yakitMaliyeti(mes, tuk, fiyat) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Yakıt Maliyeti Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Mesafe, yakıt tüketimi ve litre fiyatıyla yolculuk yakıt maliyetinizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mesafe (km)</label>
            <input
              type="number"
              min="0"
              value={mesafe}
              onChange={(e) => setMesafe(e.target.value)}
              placeholder="örn: 350"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Yakıt Tüketimi (L/100km)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={tuketim}
              onChange={(e) => setTuketim(e.target.value)}
              placeholder="örn: 7.5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Litre Fiyatı (₺)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={litreFiyati}
              onChange={(e) => setLitreFiyati(e.target.value)}
              placeholder="örn: 45.00"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {YAKIT_FIYATLARI.map(({ label, deger }) => (
                <button
                  key={label}
                  onClick={() => setLitreFiyati(String(deger))}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  {label}: ₺{deger}
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
              <div className="bg-orange-600 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Toplam Yakıt Maliyeti</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.toplamMaliyet)}</p>
                <p className="text-sm text-orange-200 mt-1">{mes} km için</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Harcanan Yakıt</p>
                  <p className="text-xl font-bold text-gray-800">{sonuc.harcananYakit.toFixed(1)} L</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Km Başına</p>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(sonuc.kmBasinaMaliyet)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">L Başına Km</p>
                  <p className="text-xl font-bold text-green-700">{sonuc.litreBaSinaKm.toFixed(1)} km</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Mesafe</td>
                    <td className="py-2.5 text-right font-semibold">{mes} km</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Tüketim</td>
                    <td className="py-2.5 text-right font-semibold">{tuk} L/100km</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Litre Fiyatı</td>
                    <td className="py-2.5 text-right font-semibold">{formatCurrency(fiyat)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Harcanan Yakıt</td>
                    <td className="py-2.5 text-right font-semibold">{sonuc.harcananYakit.toFixed(2)} L</td>
                  </tr>
                  <tr className="font-bold">
                    <td className="py-2.5 text-gray-800">Toplam Maliyet</td>
                    <td className="py-2.5 text-right text-orange-700 text-lg">{formatCurrency(sonuc.toplamMaliyet)}</td>
                  </tr>
                </tbody>
              </table>
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
              q: 'Yakıt maliyeti nasıl hesaplanır?',
              a: 'Formül: Maliyet = (Mesafe ÷ 100) × Tüketim × Litre Fiyatı. Örneğin 350 km, 7,5 L/100km tüketim ve 45 TL litre fiyatıyla: (350÷100) × 7,5 × 45 = 1.181,25 TL.',
            },
            {
              q: 'Ortalama araç yakıt tüketimi nedir?',
              a: 'Türkiye\'de ortalama benzinli araç 6–10 L/100km, dizel araç 5–8 L/100km tüketir. Şehir içi sürüşte tüketim %20-30 artabilir.',
            },
            {
              q: 'L/100km ne anlama gelir?',
              a: '100 km yol için kaç litre yakıt harcandığını gösterir. Düşük değer daha ekonomik araç anlamına gelir. Avrupa\'da yaygın kullanılan standarttır.',
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

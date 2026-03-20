'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { otvHesapla } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';
import { OTV_ORANLARI } from '@/lib/config';

const ARAC_TURLERI = [
  { key: 'benzin-dizel', etiket: 'Benzin / Dizel' },
  { key: 'elektrikli',   etiket: 'Elektrikli' },
] as const;

const CC_SEVIYELERI = [1200, 1400, 1600, 1800, 2000, 2500, 3000];

export default function OtvForm() {
  const [aracTipi, setAracTipi] = useState<string>('benzin-dizel');
  const [motorHacmi, setMotorHacmi] = useState<number>(1600);
  const [fiyat, setFiyat] = useState('');

  const efektifTip = aracTipi === 'elektrikli' ? 'elektrikli' : 'benzin-dizel';
  const fiyatSayi = Number(fiyat.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc = fiyatSayi > 0 ? otvHesapla(efektifTip, motorHacmi, fiyatSayi) : null;

  const otvYuzde = sonuc ? Math.round((sonuc.otvOrani / (1 + sonuc.otvOrani)) * 100) : 0;
  const toplamVergiYuzde = sonuc ? Math.round((sonuc.toplamVergi / fiyatSayi) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">ÖTV Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Araç liste fiyatından ÖTV ve KDV tutarlarını, vergisiz fiyatı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Yakıt Türü</label>
            <div className="grid grid-cols-2 gap-2">
              {ARAC_TURLERI.map((t) => (
                <button key={t.key} onClick={() => setAracTipi(t.key)}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition ${
                    aracTipi === t.key ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {t.etiket}
                </button>
              ))}
            </div>
          </div>

          {aracTipi !== 'elektrikli' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Motor Hacmi (cc)</label>
              <div className="grid grid-cols-4 gap-1.5">
                {CC_SEVIYELERI.map((cc) => (
                  <button key={cc} onClick={() => setMotorHacmi(cc)}
                    className={`py-2 rounded-lg text-xs font-semibold transition ${
                      motorHacmi === cc ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    {cc}
                  </button>
                ))}
                <input
                  type="number" min="500" max="9999" value={motorHacmi}
                  onChange={(e) => setMotorHacmi(Number(e.target.value))}
                  placeholder="cc"
                  className="col-span-1 border border-gray-300 rounded-lg px-2 py-2 text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                {motorHacmi <= 1600
                  ? `≤1600 cc → ÖTV %${OTV_ORANLARI.cc1600alt.oran * 100}`
                  : motorHacmi <= 2000
                  ? `1601–2000 cc → ÖTV %${OTV_ORANLARI.cc1601_2000.oran * 100}`
                  : `2001 cc+ → ÖTV %${OTV_ORANLARI.cc2001ust.oran * 100}`}
              </p>
            </div>
          )}

          {aracTipi === 'elektrikli' && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-700">
              Elektrikli araçlarda ÖTV oranı <strong>%{OTV_ORANLARI.elektrikli.oran * 100}</strong> uygulanmaktadır.
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Liste Fiyatı (₺) — KDV dahil</label>
            <input type="number" min="0" value={fiyat} onChange={(e) => setFiyat(e.target.value)}
              placeholder="örn: 1.500.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              {/* Stacked bar */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Fiyat Dağılımı</p>
                <div className="flex h-10 rounded-xl overflow-hidden text-xs font-bold">
                  <div
                    style={{ width: `${Math.round((sonuc.vergisizFiyat / fiyatSayi) * 100)}%` }}
                    className="bg-blue-600 flex items-center justify-center text-white">
                    {Math.round((sonuc.vergisizFiyat / fiyatSayi) * 100)}%
                  </div>
                  <div
                    style={{ width: `${Math.round((sonuc.otvTutari / fiyatSayi) * 100)}%` }}
                    className="bg-red-500 flex items-center justify-center text-white">
                    ÖTV {Math.round((sonuc.otvTutari / fiyatSayi) * 100)}%
                  </div>
                  <div
                    style={{ width: `${Math.round((sonuc.kdvTutari / fiyatSayi) * 100)}%` }}
                    className="bg-orange-400 flex items-center justify-center text-white">
                    KDV {Math.round((sonuc.kdvTutari / fiyatSayi) * 100)}%
                  </div>
                </div>
                <div className="flex gap-4 mt-1.5 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>Vergisiz</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500 inline-block"></span>ÖTV</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400 inline-block"></span>KDV</span>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 text-gray-600">Liste Fiyatı (KDV dahil)</td><td className="py-2 text-right">{formatCurrency(fiyatSayi)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Vergisiz Fiyat</td><td className="py-2 text-right font-semibold text-blue-700">{formatCurrency(sonuc.vergisizFiyat)}</td></tr>
                  <tr><td className="py-2 text-gray-600">ÖTV Oranı</td><td className="py-2 text-right">%{sonuc.otvOrani * 100}</td></tr>
                  <tr><td className="py-2 text-gray-600">ÖTV Tutarı</td><td className="py-2 text-right text-red-600 font-semibold">{formatCurrency(sonuc.otvTutari)}</td></tr>
                  <tr><td className="py-2 text-gray-600">KDV Matrahı (Vergisiz + ÖTV)</td><td className="py-2 text-right">{formatCurrency(sonuc.kdvMatrahi)}</td></tr>
                  <tr><td className="py-2 text-gray-600">KDV Tutarı (%20)</td><td className="py-2 text-right text-orange-600">{formatCurrency(sonuc.kdvTutari)}</td></tr>
                  <tr className="border-t-2 border-red-200">
                    <td className="py-2.5 font-bold text-red-700">Toplam Vergi (ÖTV + KDV)</td>
                    <td className="py-2.5 text-right font-bold text-red-700">{formatCurrency(sonuc.toplamVergi)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 text-xs">Fiyatın ne kadarı vergi?</td>
                    <td className="py-2 text-right text-xs font-semibold">%{toplamVergiYuzde}</td>
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
            { q: '2026 araç ÖTV oranları ne kadar?', a: '2026 yılında: 0–1600 cc %45, 1601–2000 cc %145, 2001 cc ve üzeri %220. Elektrikli araçlarda ise geçici teşvik kapsamında %10 ÖTV uygulanmaktadır.' },
            { q: 'ÖTV nasıl hesaplanır?', a: 'ÖTV; aracın vergisiz (ÖTV ve KDV hariç) matrahı üzerinden hesaplanır. Satış fiyatı = Vergisiz Fiyat × (1 + ÖTV Oranı) × 1,20 formülünden vergisiz fiyat bulunur, üzerine ÖTV eklenir.' },
            { q: 'KDV matrahına ÖTV dahil mi?', a: 'Evet. Araçlarda KDV matrahı; vergisiz fiyat + ÖTV tutarından oluşur. Yani KDV, ÖTV dahil değer üzerinden hesaplanır.' },
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

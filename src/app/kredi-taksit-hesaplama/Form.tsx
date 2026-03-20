'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { krediTaksit } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function KrediTaksitForm() {
  const [anapara, setAnapara] = useState('');
  const [faizOrani, setFaizOrani] = useState('');
  const [vade, setVade] = useState('');

  const ana = Number(anapara.replace(/\./g, '').replace(',', '.')) || 0;
  const faiz = Number(faizOrani) || 0;
  const vadeAy = Number(vade) || 0;

  const sonuc = ana > 0 && faiz >= 0 && vadeAy > 0 ? krediTaksit(ana, faiz, vadeAy) : null;

  const HIZLI_VADELER = [12, 24, 36, 48, 60, 120];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kredi Taksit Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Anapara, faiz oranı ve vadeye göre aylık taksit tutarınızı ve toplam ödemenizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Kredi Tutarı / Anapara (₺)</label>
            <input
              type="number"
              min="0"
              value={anapara}
              onChange={(e) => setAnapara(e.target.value)}
              placeholder="örn: 500.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık Faiz Oranı (%)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={faizOrani}
              onChange={(e) => setFaizOrani(e.target.value)}
              placeholder="örn: 42"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vade (Ay)</label>
            <input
              type="number"
              min="1"
              max="360"
              value={vade}
              onChange={(e) => setVade(e.target.value)}
              placeholder="örn: 36"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="flex flex-wrap gap-2">
              {HIZLI_VADELER.map((v) => (
                <button
                  key={v}
                  onClick={() => setVade(String(v))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                    vadeAy === v ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {v} ay
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className="bg-blue-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Aylık Taksit</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.aylikTaksit)}</p>
                <p className="text-sm text-blue-200 mt-1">{vadeAy} ay × {formatCurrency(sonuc.aylikTaksit)}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Toplam Ödeme</p>
                  <p className="text-lg font-bold text-gray-800">{formatCurrency(sonuc.toplamOdeme)}</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Toplam Faiz</p>
                  <p className="text-lg font-bold text-red-600">{formatCurrency(sonuc.toplamFaiz)}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Faiz / Anapara</p>
                  <p className="text-lg font-bold text-orange-600">%{sonuc.anaparaFaizOrani.toFixed(1)}</p>
                </div>
              </div>

              {/* Ödeme Tablosu */}
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Ödeme Planı (ilk 12 ay{vadeAy > 12 ? ' + son ay' : ''})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left border border-gray-200">Ay</th>
                        <th className="p-2 text-right border border-gray-200">Taksit</th>
                        <th className="p-2 text-right border border-gray-200">Anapara</th>
                        <th className="p-2 text-right border border-gray-200">Faiz</th>
                        <th className="p-2 text-right border border-gray-200">Kalan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sonuc.odemeTablosu.map((satir) => (
                        <tr key={satir.ay} className={satir.ay === vadeAy ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                          <td className="p-2 border border-gray-200">{satir.ay}</td>
                          <td className="p-2 border border-gray-200 text-right">{formatCurrency(satir.taksit)}</td>
                          <td className="p-2 border border-gray-200 text-right text-blue-700">{formatCurrency(satir.anapara)}</td>
                          <td className="p-2 border border-gray-200 text-right text-red-600">{formatCurrency(satir.faiz)}</td>
                          <td className="p-2 border border-gray-200 text-right text-gray-600">{formatCurrency(satir.kalanBakiye)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
              q: 'Kredi taksiti nasıl hesaplanır?',
              a: 'Eşit taksitli kredi formülü: Taksit = Anapara × (r × (1+r)^n) / ((1+r)^n - 1). Burada r = aylık faiz oranı, n = vade (ay) sayısıdır. Aylık faiz oranı = yıllık oran / 12.',
            },
            {
              q: 'Erken ödeme yaparsam ne olur?',
              a: 'Erken ödeme halinde kalan anapara borcu kapanır ve sonraki dönemlerin faiz ödemelerinden kurtulursunuz. Türkiye\'de bankalar erken kapatma ücreti uygulayabilir; sözleşmenizi kontrol edin.',
            },
            {
              q: 'Yıllık faiz oranı ile aylık faiz oranı arasındaki fark nedir?',
              a: 'Yıllık faiz oranı 12\'ye bölünerek aylık orana çevrilir. Örneğin %36 yıllık oran = %3 aylık faiz demektir. Hesaplayıcı yıllık oranı girdi olarak alır ve otomatik dönüştürür.',
            },
            {
              q: 'Vade uzadıkça taksit neden düşer ama toplam ödeme artar?',
              a: 'Vade uzadıkça aylık taksit azalır çünkü anapara daha uzun süreye yayılır. Ancak her ay için faiz işlendiğinden toplam ödenen faiz ve dolayısıyla toplam ödeme artar.',
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

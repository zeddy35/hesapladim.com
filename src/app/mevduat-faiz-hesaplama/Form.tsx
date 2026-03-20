'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { mevduatFaiz } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

const VADELER = [32, 90, 180, 365] as const;

export default function MevduatFaizForm() {
  const [anapara, setAnapara] = useState('');
  const [faizOrani, setFaizOrani] = useState('');
  const [vade, setVade] = useState<number>(32);
  const [vergisizMi, setVergisizMi] = useState(false);

  const ana = Number(anapara.replace(/\./g, '').replace(',', '.')) || 0;
  const oran = Number(faizOrani) || 0;
  const sonuc = ana > 0 && oran > 0 ? mevduatFaiz(ana, oran, vade, vergisizMi) : null;
  const karsilastirma = ana > 0 && oran > 0
    ? VADELER.map((v) => ({ vade: v, ...mevduatFaiz(ana, oran, v, vergisizMi) }))
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Mevduat Faiz Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Anapara, faiz oranı ve vadeye göre net kazancınızı ve stopaj vergisini hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Anapara (₺)</label>
            <input
              type="number" min="0" value={anapara}
              onChange={(e) => setAnapara(e.target.value)}
              placeholder="örn: 100.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık Faiz Oranı (%)</label>
            <input
              type="number" min="0" step="0.1" value={faizOrani}
              onChange={(e) => setFaizOrani(e.target.value)}
              placeholder="örn: 42.5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vade</label>
            <div className="grid grid-cols-4 gap-2">
              {VADELER.map((v) => (
                <button
                  key={v}
                  onClick={() => setVade(v)}
                  className={`py-2 rounded-lg text-sm font-semibold transition ${
                    vade === v ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {v} gün
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setVergisizMi((v) => !v)}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
              vergisizMi ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {vergisizMi ? '✓ Stopajsız (muaf)' : 'Stopaj kesiliyor (%15)'}
          </button>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-blue-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Net Kazanç ({vade} gün)</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.netFaiz)}</p>
                <p className="text-sm text-blue-200 mt-1">Toplam: {formatCurrency(sonuc.toplamNetTutar)}</p>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 text-gray-600">Brüt Faiz</td><td className="py-2 text-right font-semibold">{formatCurrency(sonuc.brutFaiz)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Stopaj Vergisi (%{vergisizMi ? 0 : 15})</td><td className="py-2 text-right text-red-600">−{formatCurrency(sonuc.stopajVergisi)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Net Faiz</td><td className="py-2 text-right text-green-700 font-semibold">{formatCurrency(sonuc.netFaiz)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Günlük Net Getiri</td><td className="py-2 text-right">{formatCurrency(sonuc.gunlukGetiri)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Aylık Net Getiri</td><td className="py-2 text-right">{formatCurrency(sonuc.aylikGetiri)}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {karsilastirma && (
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-gray-800 mb-4">Vade Karşılaştırması</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-gray-500 font-medium">Vade</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Brüt Faiz</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Net Faiz</th>
                      <th className="text-right py-2 text-gray-500 font-medium">Toplam Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {karsilastirma.map((row) => (
                      <tr key={row.vade} className={row.vade === vade ? 'bg-blue-50 font-semibold' : ''}>
                        <td className="py-2">{row.vade} gün</td>
                        <td className="py-2 text-right">{formatCurrency(row.brutFaiz)}</td>
                        <td className="py-2 text-right text-green-700">{formatCurrency(row.netFaiz)}</td>
                        <td className="py-2 text-right">{formatCurrency(row.toplamNetTutar)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            { q: 'Mevduat faizinden stopaj kesiliyor mu?', a: '2026 yılında TL mevduat faiz gelirlerinden %15 stopaj (tevkifat) kesilmektedir. Bazı özel hesap türleri veya kurumsal müşteriler için muafiyet söz konusu olabilir; bankanızdan teyit edin.' },
            { q: 'Mevduat faizi nasıl hesaplanır?', a: 'Brüt faiz = Anapara × (Yıllık Faiz Oranı / 100) × (Vade Günü / 365) formülüyle hesaplanır. Bu tutardan stopaj düşüldükten sonra net kazanç elde edilir.' },
            { q: '32 gün vade neden var?', a: '32 günlük vade, Türk bankacılığında en kısa standart mevduat vadesidir (1 aylık mevduat). BDDK düzenlemeleri gereği vadesiz hesap faiz ödemez.' },
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

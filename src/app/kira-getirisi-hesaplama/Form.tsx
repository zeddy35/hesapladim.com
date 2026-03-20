'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function KiraGetirisiForm() {
  const [mulkDegeri, setMulkDegeri] = useState('');
  const [aylikKira, setAylikKira] = useState('');
  const [yillikGider, setYillikGider] = useState('');

  const deger = Number(mulkDegeri.replace(/\./g, '').replace(',', '.')) || 0;
  const kira = Number(aylikKira.replace(/\./g, '').replace(',', '.')) || 0;
  const gider = Number(yillikGider.replace(/\./g, '').replace(',', '.')) || 0;

  let sonuc: {
    brutGetiri: number;
    netGetiri: number;
    geriOdeme: number;
    yillikKira: number;
  } | null = null;

  if (deger > 0 && kira > 0) {
    const yillikKira = kira * 12;
    const brutGetiri = (yillikKira / deger) * 100;
    const netGetiri = ((yillikKira - gider) / deger) * 100;
    const geriOdeme = netGetiri > 0 ? 100 / netGetiri : 0;
    sonuc = { brutGetiri, netGetiri, geriOdeme, yillikKira };
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kira Getirisi Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Mülk değeri, aylık kira ve giderlere göre brüt/net getiri oranını ve yatırım geri ödeme süresini hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mülk Değeri (₺)</label>
            <input
              type="number"
              min="0"
              value={mulkDegeri}
              onChange={(e) => setMulkDegeri(e.target.value)}
              placeholder="örn: 5.000.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Aylık Kira (₺)</label>
            <input
              type="number"
              min="0"
              value={aylikKira}
              onChange={(e) => setAylikKira(e.target.value)}
              placeholder="örn: 20.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık Giderler (₺)</label>
            <p className="text-xs text-gray-400 mb-1">Aidat, bakım, vergiler vb. — boş bırakabilirsiniz</p>
            <input
              type="number"
              min="0"
              value={yillikGider}
              onChange={(e) => setYillikGider(e.target.value)}
              placeholder="örn: 24.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-800 text-white rounded-xl p-5 text-center">
                  <p className="text-xs opacity-80 mb-1">Brüt Getiri</p>
                  <p className="text-4xl font-extrabold">{fmt2(sonuc.brutGetiri)}%</p>
                  <p className="text-xs text-blue-200 mt-1">Gider hariç</p>
                </div>
                <div className="bg-green-600 text-white rounded-xl p-5 text-center">
                  <p className="text-xs opacity-80 mb-1">Net Getiri</p>
                  <p className="text-4xl font-extrabold">{fmt2(sonuc.netGetiri)}%</p>
                  <p className="text-xs text-green-200 mt-1">Gider dahil</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Mülk Değeri</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(deger)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Aylık Kira</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(kira)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Yıllık Kira Geliri</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(sonuc.yillikKira)} ₺</td>
                  </tr>
                  {gider > 0 && (
                    <tr>
                      <td className="py-2.5 text-gray-600">Yıllık Giderler</td>
                      <td className="py-2.5 text-right text-red-600">−{fmt2(gider)} ₺</td>
                    </tr>
                  )}
                  <tr>
                    <td className="py-2.5 text-gray-600">Brüt Getiri Oranı</td>
                    <td className="py-2.5 text-right font-semibold text-blue-700">%{fmt2(sonuc.brutGetiri)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Net Getiri Oranı</td>
                    <td className="py-2.5 text-right font-semibold text-green-700">%{fmt2(sonuc.netGetiri)}</td>
                  </tr>
                  {sonuc.geriOdeme > 0 && (
                    <tr className="font-bold border-t-2 border-gray-300">
                      <td className="pt-3 text-gray-800">Geri Ödeme Süresi</td>
                      <td className="pt-3 text-right text-blue-800 text-lg">{fmt2(sonuc.geriOdeme)} yıl</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>Özet:</strong> {fmt2(deger)} ₺ değerindeki mülkten aylık {fmt2(kira)} ₺ kira alarak yıllık{' '}
                %{fmt2(sonuc.netGetiri)} net getiri elde ediyorsunuz.
                {sonuc.geriOdeme > 0 && ` Mülk yaklaşık ${fmt2(sonuc.geriOdeme)} yılda kendini amorti eder.`}
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
              q: 'Kira getiri oranı nasıl hesaplanır?',
              a: 'Brüt getiri = (Yıllık Kira / Mülk Değeri) × 100. Net getiri = (Yıllık Kira − Yıllık Giderler) / Mülk Değeri × 100. Giderler; aidat, bakım, emlak vergisi ve boşluk dönemlerini kapsar.',
            },
            {
              q: 'İyi bir kira getiri oranı ne kadardır?',
              a: 'Türkiye\'de brüt kira getirisi yüksek enflasyon ortamında %3-6 arasında kabul görmektedir. Ancak gerçek yatırım kararlarında kira artış potansiyeli, lokasyon ve değer artışı da dikkate alınmalıdır.',
            },
            {
              q: 'Geri ödeme süresi nedir?',
              a: 'Geri ödeme süresi (payback period), mülk değerinin net kira gelirleriyle kaç yılda karşılanacağını gösterir. Geri ödeme süresi = 100 / Net Getiri Oranı. Örneğin %4 net getiri → 25 yıl.',
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

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

const SURELER = [12, 24, 36, 60, 120];

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function BirikimForm() {
  const [baslangic, setBaslangic] = useState('');
  const [aylikBirikim, setAylikBirikim] = useState('');
  const [faiz, setFaiz] = useState('');
  const [sure, setSure] = useState(12);

  const initial = Number(baslangic.replace(/\./g, '').replace(',', '.')) || 0;
  const monthly = Number(aylikBirikim.replace(/\./g, '').replace(',', '.')) || 0;
  const annualRate = Number(faiz.replace(',', '.')) || 0;
  const n = sure;

  let sonuc: { toplamBirikim: number; toplamYatirilan: number; faizKazanci: number } | null = null;

  if ((initial > 0 || monthly > 0) && annualRate >= 0 && n > 0) {
    let toplamBirikim: number;
    if (annualRate === 0) {
      toplamBirikim = initial + monthly * n;
    } else {
      const r = annualRate / 12 / 100;
      const futureInitial = initial * Math.pow(1 + r, n);
      const futureMonthly = monthly * ((Math.pow(1 + r, n) - 1) / r);
      toplamBirikim = futureInitial + futureMonthly;
    }
    const toplamYatirilan = initial + monthly * n;
    const faizKazanci = toplamBirikim - toplamYatirilan;
    sonuc = { toplamBirikim, toplamYatirilan, faizKazanci };
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Birikim Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Başlangıç tutarı, aylık birikim ve faiz oranıyla belirlenen süre sonundaki toplam birikimizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Başlangıç Tutarı (₺)</label>
            <input
              type="number"
              min="0"
              value={baslangic}
              onChange={(e) => setBaslangic(e.target.value)}
              placeholder="örn: 50.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Aylık Birikim (₺)</label>
            <input
              type="number"
              min="0"
              value={aylikBirikim}
              onChange={(e) => setAylikBirikim(e.target.value)}
              placeholder="örn: 5.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık Faiz Oranı (%)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={faiz}
              onChange={(e) => setFaiz(e.target.value)}
              placeholder="örn: 40"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Süre</label>
            <div className="grid grid-cols-3 gap-2">
              {SURELER.map((s) => (
                <button
                  key={s}
                  onClick={() => setSure(s)}
                  className={`py-2 rounded-lg text-sm font-semibold transition ${
                    sure === s ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s} ay
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
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-blue-800 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Toplam Birikim</p>
                <p className="text-5xl font-extrabold">{fmt2(sonuc.toplamBirikim)} ₺</p>
                <p className="text-sm text-blue-200 mt-1">{n} ay sonra</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Toplam Yatırılan</p>
                  <p className="text-xl font-bold text-gray-800">{fmt2(sonuc.toplamYatirilan)} ₺</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center border border-green-200">
                  <p className="text-xs text-green-600 mb-1">Faiz Kazancı</p>
                  <p className="text-xl font-bold text-green-700">{fmt2(sonuc.faizKazanci)} ₺</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Başlangıç Tutarı</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(initial)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Aylık Birikim</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(monthly)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Yıllık Faiz Oranı</td>
                    <td className="py-2.5 text-right font-semibold">%{annualRate}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Süre</td>
                    <td className="py-2.5 text-right font-semibold">{n} ay ({(n / 12).toFixed(1)} yıl)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Toplam Yatırılan</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(sonuc.toplamYatirilan)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Faiz Kazancı</td>
                    <td className="py-2.5 text-right text-green-600">+{fmt2(sonuc.faizKazanci)} ₺</td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">Toplam Birikim</td>
                    <td className="pt-3 text-right text-blue-800 text-lg">{fmt2(sonuc.toplamBirikim)} ₺</td>
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
              q: 'Bileşik faizli birikim nasıl hesaplanır?',
              a: 'Gelecek değer = Başlangıç × (1+r)^n + Aylık × ((1+r)^n − 1) / r formülüyle hesaplanır. Burada r = aylık faiz oranı ve n = ay sayısıdır. Bileşik faiz, zamanla faize faiz işleyerek birikimi hızlandırır.',
            },
            {
              q: 'Düzenli birikim mi yoksa toplu yatırım mı daha avantajlıdır?',
              a: 'Her ikisinin de avantajı vardır. Toplu yatırım daha uzun süre faiz kazanırken, düzenli birikim disiplin sağlar ve maaş döngüsüne uyum kolaylaştırır. En iyi strateji, her ikisini birleştirmektir.',
            },
            {
              q: 'Enflasyon birikimi etkiler mi?',
              a: 'Evet. Reel getiri = (1 + nominal getiri) / (1 + enflasyon) − 1 formülüyle hesaplanır. Enflasyonun altında kalan faiz oranı, birikimin gerçek satın alma gücünü azaltır.',
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

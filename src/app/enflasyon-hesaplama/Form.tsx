'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function EnflasyonForm() {
  const [tutar, setTutar] = useState('');
  const [oran, setOran] = useState('');
  const [yil, setYil] = useState('');

  const amount = Number(tutar.replace(/\./g, '').replace(',', '.')) || 0;
  const rate = Number(oran.replace(',', '.')) || 0;
  const years = Number(yil) || 0;

  let sonuc: { gelecekDeger: number; satinaAlmaKaybi: number; gercekDeger: number } | null = null;

  if (amount > 0 && rate >= 0 && years > 0) {
    const gelecekDeger = amount * Math.pow(1 + rate / 100, years);
    const gercekDeger = amount / Math.pow(1 + rate / 100, years);
    const satinaAlmaKaybi = amount - gercekDeger;
    sonuc = { gelecekDeger, satinaAlmaKaybi, gercekDeger };
  }

  const hizliOranlar = [20, 30, 40, 50, 60, 70];
  const hizliYillar = [1, 3, 5, 10, 15, 20];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Enflasyon Etkisi Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Enflasyon oranı ve süreye göre paranızın satın alma gücünü ve gerçek değerini hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tutar (₺)</label>
            <input
              type="number"
              min="0"
              value={tutar}
              onChange={(e) => setTutar(e.target.value)}
              placeholder="örn: 100.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Yıllık Enflasyon Oranı (%)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={oran}
              onChange={(e) => setOran(e.target.value)}
              placeholder="örn: 45"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="grid grid-cols-3 gap-1.5">
              {hizliOranlar.map((r) => (
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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Süre (Yıl)</label>
            <input
              type="number"
              min="1"
              max="50"
              value={yil}
              onChange={(e) => setYil(e.target.value)}
              placeholder="örn: 5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="grid grid-cols-3 gap-1.5">
              {hizliYillar.map((y) => (
                <button
                  key={y}
                  onClick={() => setYil(String(y))}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    yil === String(y) ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {y} yıl
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
              <div className="bg-orange-600 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">{years} yıl sonra aynı satın alma gücü için</p>
                <p className="text-5xl font-extrabold">{fmt2(sonuc.gelecekDeger)} ₺</p>
                <p className="text-sm text-orange-200 mt-1">gerekecek</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <p className="text-xs text-red-500 mb-1">Satın Alma Gücü Kaybı</p>
                  <p className="text-xl font-bold text-red-700">{fmt2(sonuc.satinaAlmaKaybi)} ₺</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Bugünün Gerçek Değeri</p>
                  <p className="text-xl font-bold text-gray-700">{fmt2(sonuc.gercekDeger)} ₺</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Başlangıç Tutarı</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(amount)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Yıllık Enflasyon</td>
                    <td className="py-2.5 text-right font-semibold">%{rate}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Süre</td>
                    <td className="py-2.5 text-right font-semibold">{years} yıl</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Değer Kaybı Oranı</td>
                    <td className="py-2.5 text-right text-red-600">
                      %{fmt2(((amount - sonuc.gercekDeger) / amount) * 100)}
                    </td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">Gelecek Değer Eşdeğeri</td>
                    <td className="pt-3 text-right text-orange-700 text-lg">{fmt2(sonuc.gelecekDeger)} ₺</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
                <strong>Sonuç:</strong> %{rate} enflasyonla {years} yıl sonra bugünkü {fmt2(amount)} ₺&apos;nin satın alma gücü yalnızca{' '}
                {fmt2(sonuc.gercekDeger)} ₺&apos;ye düşmüş olacak.
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
              q: 'Enflasyonun satın alma gücüne etkisi nasıl hesaplanır?',
              a: 'Gelecekteki eşdeğer = Bugünkü Tutar × (1 + Enflasyon / 100)^Yıl. Örneğin %40 enflasyonla 5 yıl sonra 100.000 ₺\'nin aynı satın alma gücü için yaklaşık 537.824 ₺ gerekir.',
            },
            {
              q: 'Reel değer kaybı ne demektir?',
              a: 'Paranızın enflasyona göre düzeltilmiş gerçek değerinin düşmesidir. Bugün 100.000 ₺\'niz varsa ve %40 enflasyon olursa, 1 yıl sonra bu paranın gerçek satın alma gücü yaklaşık 71.429 ₺\'ye düşer.',
            },
            {
              q: 'Enflasyona karşı korunmak için ne yapmalıyım?',
              a: 'Enflasyonun üzerinde getiri sağlayan araçlara yatırım yapmak önemlidir. Altın, döviz, hisse senedi ve enflasyona endeksli tahviller enflasyona karşı koruma araçlarından bazılarıdır. Profesyonel bir finansal danışmana başvurmanız önerilir.',
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

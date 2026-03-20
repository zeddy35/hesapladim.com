'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

const IS_GUNLERI = [20, 21, 22, 23];

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function KistGunForm() {
  const [brutMaas, setBrutMaas] = useState('');
  const [calisilan, setCalisilan] = useState('');
  const [toplamIsGunu, setToplamIsGunu] = useState(22);

  const brut = Number(brutMaas.replace(/\./g, '').replace(',', '.')) || 0;
  const worked = Number(calisilan) || 0;
  const total = toplamIsGunu;

  let sonuc: { gunlukMaas: number; kistMaas: number; kalanGunMaasSiz: number } | null = null;

  if (brut > 0 && worked > 0 && worked <= total) {
    const gunlukMaas = brut / total;
    const kistMaas = gunlukMaas * worked;
    const kalanGunMaasSiz = total - worked;
    sonuc = { gunlukMaas, kistMaas, kalanGunMaasSiz };
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kıst Gün Maaşı Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Ayın bir bölümünde çalışanlar için aylık brüt maaş ve çalışılan gün sayısından kıst gün maaşını hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Aylık Brüt Maaş (₺)</label>
            <input
              type="number"
              min="0"
              value={brutMaas}
              onChange={(e) => setBrutMaas(e.target.value)}
              placeholder="örn: 40.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Çalışılan Gün Sayısı</label>
            <input
              type="number"
              min="1"
              max={total}
              value={calisilan}
              onChange={(e) => setCalisilan(e.target.value)}
              placeholder={`örn: 15 (maks ${total})`}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Aydaki Toplam İş Günü</label>
            <div className="grid grid-cols-2 gap-2">
              {IS_GUNLERI.map((g) => (
                <button
                  key={g}
                  onClick={() => setToplamIsGunu(g)}
                  className={`py-2 rounded-lg text-sm font-semibold transition ${
                    toplamIsGunu === g ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {g} gün
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
                <p className="text-sm opacity-80 mb-1">Kıst Gün Brüt Maaş</p>
                <p className="text-5xl font-extrabold">{fmt2(sonuc.kistMaas)} ₺</p>
                <p className="text-sm text-blue-200 mt-1">{worked} / {total} gün</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Günlük Brüt Maaş</p>
                  <p className="text-xl font-bold text-gray-800">{fmt2(sonuc.gunlukMaas)} ₺</p>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center border border-red-200">
                  <p className="text-xs text-red-500 mb-1">Maaşsız Kalan Gün</p>
                  <p className="text-xl font-bold text-red-700">{sonuc.kalanGunMaasSiz} gün</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Aylık Brüt Maaş</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(brut)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Aydaki Toplam İş Günü</td>
                    <td className="py-2.5 text-right font-semibold">{total} gün</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Günlük Brüt Maaş</td>
                    <td className="py-2.5 text-right font-semibold">{fmt2(sonuc.gunlukMaas)} ₺</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Çalışılan Gün</td>
                    <td className="py-2.5 text-right font-semibold">{worked} gün</td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">Kıst Gün Brüt Maaşı</td>
                    <td className="pt-3 text-right text-blue-800 text-lg">{fmt2(sonuc.kistMaas)} ₺</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>Hesaplama:</strong> {fmt2(brut)} ₺ ÷ {total} gün = {fmt2(sonuc.gunlukMaas)} ₺/gün × {worked} gün = {fmt2(sonuc.kistMaas)} ₺
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
              q: 'Kıst gün maaşı nedir?',
              a: 'Kıst gün maaşı, bir çalışanın ayın tamamında değil belirli bir bölümünde çalışması durumunda (işe giriş, çıkış, ücretsiz izin vb.) hak ettiği orantılı maaştır. Günlük ücret × çalışılan gün sayısı ile hesaplanır.',
            },
            {
              q: 'Kıst gün hesabında aylık iş günü sayısı nasıl belirlenir?',
              a: 'İş Kanunu\'na göre genellikle ayda 22 iş günü esas alınır; ancak o ayın gerçek iş günü sayısı kullanılabilir. Bazı işyerleri 30 takvim günü üzerinden de hesaplar; sözleşme veya toplu iş sözleşmesine bakılması önerilir.',
            },
            {
              q: 'Kıst gün maaşı SGK\'ya nasıl bildirilir?',
              a: 'Eksik günlü çalışanlar için SGK\'ya eksik gün bildirimi yapılır (eksik gün kodu 15 vb.). Kıst gün brüt maaş üzerinden SGK primleri de orantılı olarak hesaplanır.',
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

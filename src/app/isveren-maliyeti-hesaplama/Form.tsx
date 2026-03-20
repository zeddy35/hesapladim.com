'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { grossToNet, type MedeniDurum } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function IsverenMaliyetiForm() {
  const [brutMaas, setBrutMaas] = useState('');
  const [medeniDurum, setMedeniDurum] = useState<MedeniDurum>('bekar');
  const [cocukSayisi, setCocukSayisi] = useState(0);

  const brut = Number(brutMaas.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc = brut > 0 ? grossToNet(brut, medeniDurum, cocukSayisi) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">İşveren Maliyeti Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Brüt maaş üzerinden SGK işveren payı ve işsizlik sigortasıyla toplam işveren maliyetini hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Brüt Maaş (₺)</label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medeni Durum (çalışan için)</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { val: 'bekar', label: 'Bekar' },
                { val: 'evliEsCalisiyor', label: 'Evli (eş çalışıyor)' },
                { val: 'evliEsCalismiyor', label: 'Evli (eş çalışmıyor)' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => setMedeniDurum(val as MedeniDurum)}
                  className={`py-2 px-3 rounded-lg text-sm font-semibold text-left transition ${
                    medeniDurum === val ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Çocuk Sayısı</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setCocukSayisi(n)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                    cocukSayisi === n ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {n === 3 ? '3+' : n}
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
                <p className="text-sm opacity-80 mb-1">Toplam İşveren Maliyeti</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.toplamIsverenMaliyeti)}</p>
                <p className="text-sm text-orange-200 mt-1">
                  Brüt maaşın {((sonuc.toplamIsverenMaliyeti / sonuc.brutMaas) * 100).toFixed(1)}%'i
                </p>
              </div>

              <h3 className="font-bold text-gray-800">İşveren Maliyet Dağılımı</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Brüt Maaş</td>
                    <td className="py-2.5 text-right font-semibold">{formatCurrency(sonuc.brutMaas)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">SGK İşveren Payı (%15,5)</td>
                    <td className="py-2.5 text-right text-orange-700">+{formatCurrency(sonuc.sgkIsverenBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">İşsizlik Sigortası İşveren (%2)</td>
                    <td className="py-2.5 text-right text-orange-700">+{formatCurrency(sonuc.issizlikIsverenBrut)}</td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">Toplam İşveren Maliyeti</td>
                    <td className="pt-3 text-right text-orange-700 text-lg">{formatCurrency(sonuc.toplamIsverenMaliyeti)}</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="font-bold text-gray-800 pt-2">Çalışan Maaş Özeti</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Net Maaş (çalışana ödenen)</td>
                    <td className="py-2.5 text-right text-green-700 font-semibold">{formatCurrency(sonuc.netMaas)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Toplam Kesintiler (işçi)</td>
                    <td className="py-2.5 text-right text-red-600">
                      {formatCurrency(sonuc.sgkIsciBrut + sonuc.issizlikIsciBrut + sonuc.gelirVergisi + sonuc.damgaVergisi - sonuc.agiTutari)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
                <strong>Maliyet özeti:</strong> {formatCurrency(brut)} brüt maaş için işveren toplam{' '}
                {formatCurrency(sonuc.toplamIsverenMaliyeti)} öder; çalışan eline{' '}
                {formatCurrency(sonuc.netMaas)} geçer.
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
              q: 'İşverenin ödediği SGK oranı nedir?',
              a: '2026 yılında işveren SGK prim oranı %15,5\'tir. Bu oran 5 puanlık Hazine desteği uygulandığında %10,5\'e düşebilir; ancak standart hesaplamada %15,5 esas alınır.',
            },
            {
              q: 'Toplam işveren maliyeti brüt maaşın kaç katıdır?',
              a: 'Standart hesaplamada toplam işveren maliyeti brüt maaşın yaklaşık 1.175 katıdır. Örneğin 40.000 TL brüt maaş için işveren yaklaşık 47.000 TL öder.',
            },
            {
              q: 'İşveren maliyetine asgari ücret teşviki dahil midir?',
              a: 'Bu hesaplayıcı standart oranları kullanır. Asgari ücret üzerindeki çalışanlar için uygulanan 5 puanlık SGK teşviki veya sektöre özel indirimler hesaba katılmamıştır.',
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

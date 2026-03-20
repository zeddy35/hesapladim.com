'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { netToGross, type MedeniDurum } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

export default function NettenBruteForm() {
  const [netMaas, setNetMaas] = useState('');
  const [medeniDurum, setMedeniDurum] = useState<MedeniDurum>('bekar');
  const [cocukSayisi, setCocukSayisi] = useState(0);

  const net = Number(netMaas.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc = net > 0 ? netToGross(net, medeniDurum, cocukSayisi) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Netten Brüte Maaş Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Almak istediğiniz net maaşa göre brüt rakamını ve tüm kesintileri tersine hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Hedef Net Maaş (₺)</label>
            <input
              type="number"
              min="0"
              value={netMaas}
              onChange={(e) => setNetMaas(e.target.value)}
              placeholder="örn: 30.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Medeni Durum</label>
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
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Hedef Net Maaş</p>
                  <p className="text-2xl font-bold text-gray-700">{formatCurrency(net)}</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">Gerekli Brüt Maaş</p>
                  <p className="text-2xl font-bold text-blue-800">{formatCurrency(sonuc.brutMaas)}</p>
                </div>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2.5 text-gray-600">Brüt Maaş</td>
                    <td className="py-2.5 text-right font-semibold">{formatCurrency(sonuc.brutMaas)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">SGK İşçi Payı (%14)</td>
                    <td className="py-2.5 text-right text-red-600">−{formatCurrency(sonuc.sgkIsciBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">İşsizlik Sigortası (%1)</td>
                    <td className="py-2.5 text-right text-red-600">−{formatCurrency(sonuc.issizlikIsciBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Gelir Vergisi Matrahı</td>
                    <td className="py-2.5 text-right">{formatCurrency(sonuc.vergiBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Gelir Vergisi</td>
                    <td className="py-2.5 text-right text-red-600">−{formatCurrency(sonuc.gelirVergisi)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">Damga Vergisi (%0,759)</td>
                    <td className="py-2.5 text-right text-red-600">−{formatCurrency(sonuc.damgaVergisi)}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 text-gray-600">AGİ</td>
                    <td className="py-2.5 text-right text-green-600">+{formatCurrency(sonuc.agiTutari)}</td>
                  </tr>
                  <tr className="font-bold border-t-2 border-gray-300">
                    <td className="pt-3 text-gray-800">Net Maaş</td>
                    <td className="pt-3 text-right text-green-700 text-lg">{formatCurrency(sonuc.netMaas)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-orange-800 mb-1">İşveren Toplam Maliyeti</p>
                <p className="text-2xl font-bold text-orange-700">{formatCurrency(sonuc.toplamIsverenMaliyeti)}</p>
                <p className="text-xs text-orange-600 mt-1">
                  SGK işveren payı (%15,5) + İşsizlik (%2) dahil
                </p>
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
              q: 'Netten brüte nasıl hesaplanır?',
              a: 'Net maaş bilindiğinde brüt maaş, ikili arama (binary search) yöntemiyle hesaplanır. Olası bir brüt maaş denenir, sonuçta elde edilen net maaş hedef net maaş ile karşılaştırılır ve fark minimuma düşene kadar iterasyon yapılır.',
            },
            {
              q: 'AGİ (Asgari Geçim İndirimi) netten brüte hesaplamayı etkiler mi?',
              a: 'Evet. AGİ, medeni durum ve çocuk sayısına göre belirlenen bir vergi iadesidir. Bekar çalışan için 2026\'da aylık yaklaşık 165,79 TL\'dir. Bu tutar net maaşa eklenerek fiili net ele geçen tutarı artırır.',
            },
            {
              q: '2026 SGK işçi prim oranları nelerdir?',
              a: 'İşçi SGK oranı %14, işçi işsizlik sigortası oranı %1\'dir. Toplamda işçi kesintisi brüt maaşın %15\'idir.',
            },
            {
              q: 'İşverenin ödediği ek maliyetler nelerdir?',
              a: 'İşveren, brüt maaşa ek olarak SGK işveren payı (%15,5) ve işsizlik sigortası işveren payı (%2) öder. Toplam işveren maliyeti brüt maaşın yaklaşık %117,5\'idir.',
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

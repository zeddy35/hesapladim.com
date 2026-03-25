'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

const SGK_ISCI = 0.14;
const ISSIZLIK_ISCI = 0.01;
const SGK_ISVEREN_NORMAL = 0.205;
const SGK_ISVEREN_TESVIK = 0.155;
const ISSIZLIK_ISVEREN = 0.02;

export default function SgkPrimForm() {
  const [brutUcret, setBrutUcret] = useState('');
  const [tesvik, setTesvik] = useState(false);
  const [hata, setHata] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const brut = parseInputToNumber(brutUcret);
  const sgkIsverenOran = tesvik ? SGK_ISVEREN_TESVIK : SGK_ISVEREN_NORMAL;

  const hesapla = brut > 0 ? {
    sgkIsci: brut * SGK_ISCI,
    issizlikIsci: brut * ISSIZLIK_ISCI,
    toplamIsciKesinti: brut * (SGK_ISCI + ISSIZLIK_ISCI),
    sgkIsveren: brut * sgkIsverenOran,
    issizlikIsveren: brut * ISSIZLIK_ISVEREN,
    toplamIsverenMaliyeti: brut + brut * (sgkIsverenOran + ISSIZLIK_ISVEREN),
  } : null;

  function handleBrut(v: string) {
    setBrutUcret(v);
    const val = parseInputToNumber(v);
    setHata(v && (isNaN(val) || val <= 0) ? 'Geçerli bir tutar girin' : '');
  }

  const paylasMetni = hesapla
    ? `SGK Prim Hesaplama 2026 → Brüt: ${formatNumber(brut)} ₺ | İşçi Kesintisi: ${formatNumber(hesapla.toplamIsciKesinti)} ₺ | İşveren Maliyeti: ${formatNumber(hesapla.toplamIsverenMaliyeti)} ₺ | hesaplayim.com/sgk-prim-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">SGK Prim Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Brüt maaş üzerinden SGK işçi ve işveren primlerini, işsizlik sigortasını ve toplam maliyeti hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Brüt Ücret (₺)</label>
          <input
            type="number"
            min="0"
            value={brutUcret}
            onChange={(e) => handleBrut(e.target.value)}
            placeholder="Örn: 33030"
            className={`w-full border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hata ? 'border-red-500 border-2' : 'border-gray-300'}`}
          />
          {hata && <p className="text-red-500 text-xs mb-2">{hata}</p>}

          <label className="flex items-center gap-3 mt-5 cursor-pointer">
            <input
              type="checkbox"
              checked={tesvik}
              onChange={(e) => setTesvik(e.target.checked)}
              className="w-4 h-4 accent-blue-700"
            />
            <span className="text-sm font-semibold text-gray-700">
              5 puanlık SGK teşvikinden yararlanıyorum
            </span>
          </label>
          <p className="text-xs text-gray-400 mt-1 ml-7">
            İşveren payı %20,5 yerine %15,5 uygulanır
          </p>
        </div>

        {/* Sağ: Sidebar Reklam + Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {hesapla && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Toplam İşçi Kesintisi (%15)</p>
                  <p className="text-3xl font-bold text-blue-700">{formatNumber(hesapla.toplamIsciKesinti)} ₺</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Toplam İşveren Maliyeti</p>
                  <p className="text-3xl font-bold text-green-600">{formatNumber(hesapla.toplamIsverenMaliyeti)} ₺</p>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(paylasMetni)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paylasMetni);
                    setKopyalandi(true);
                    setTimeout(() => setKopyalandi(false), 2000);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1.5"
                >
                  {kopyalandi ? <><Check size={15} /> Kopyalandı</> : <><Clipboard size={15} /> Kopyala</>}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Prim Kalemi</th>
                      <th className="p-2 text-right border border-gray-200">Oran</th>
                      <th className="p-2 text-right border border-gray-200">Tutar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">SGK İşçi Payı</td>
                      <td className="p-2 border border-gray-200 text-right">%14</td>
                      <td className="p-2 border border-gray-200 text-right text-blue-700">{formatNumber(hesapla.sgkIsci)} ₺</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">İşsizlik Sigortası (İşçi)</td>
                      <td className="p-2 border border-gray-200 text-right">%1</td>
                      <td className="p-2 border border-gray-200 text-right text-blue-700">{formatNumber(hesapla.issizlikIsci)} ₺</td>
                    </tr>
                    <tr className="bg-blue-50 font-semibold">
                      <td className="p-2 border border-gray-200">Toplam İşçi Kesintisi</td>
                      <td className="p-2 border border-gray-200 text-right">%15</td>
                      <td className="p-2 border border-gray-200 text-right text-blue-800">{formatNumber(hesapla.toplamIsciKesinti)} ₺</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">SGK İşveren Payı{tesvik ? ' (teşvikli)' : ''}</td>
                      <td className="p-2 border border-gray-200 text-right">%{tesvik ? '15,5' : '20,5'}</td>
                      <td className="p-2 border border-gray-200 text-right text-purple-700">{formatNumber(hesapla.sgkIsveren)} ₺</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-2 border border-gray-200">İşsizlik Sigortası (İşveren)</td>
                      <td className="p-2 border border-gray-200 text-right">%2</td>
                      <td className="p-2 border border-gray-200 text-right text-purple-700">{formatNumber(hesapla.issizlikIsveren)} ₺</td>
                    </tr>
                    <tr className="bg-green-50 font-semibold">
                      <td className="p-2 border border-gray-200">Toplam İşveren Maliyeti</td>
                      <td className="p-2 border border-gray-200 text-right">Brüt + %{tesvik ? '17,5' : '22,5'}</td>
                      <td className="p-2 border border-gray-200 text-right text-green-700">{formatNumber(hesapla.toplamIsverenMaliyeti)} ₺</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'SGK prim tavanı nedir?',
              a: "SGK prim tavanı asgari ücretin 7,5 katıdır. 2026 asgari ücreti 33.030 TL olduğuna göre tavan yaklaşık 247.725 TL'dir. Tavan üzerindeki ücret kısmı prim hesabına dahil edilmez.",
            },
            {
              q: '5 puanlık teşvik nedir?',
              a: "İşverenin ödemesi gereken %20,5 SGK payının 5 puanı Hazine tarafından karşılanır. Bu teşvikten yararlanan işverenler yalnızca %15,5 SGK işveren payı öder.",
            },
            {
              q: 'Prim ödeme gün sayısı ne anlama gelir?',
              a: "Bir takvim ayında SGK'ya bildirilen çalışma gün sayısıdır. Tam ay çalışmada genellikle 30 gün bildirilir. Eksik çalışma veya ücretsiz izin varsa gün sayısı düşer.",
            },
            {
              q: "Asgari ücretle çalışanda SGK kesintisi ne kadar?",
              a: "2026'da asgari ücret 33.030 TL brüt olduğunda: SGK işçi payı 4.624 TL, işsizlik işçi payı 330 TL olmak üzere toplam 4.954 TL işçiden kesilir.",
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
        <div className="mt-8 flex justify-center">
          <AdBanner slot="footer" />
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { formatNumber } from '@/lib/formatters';

type MotorHacmi = '0-1300' | '1301-1600' | '1601-1800' | '1801-2000' | '2001-2500' | '2501+';

interface MtvRow {
  label: string;
  yas1_3: number;
  yas4_6: number;
  yas7_11: number;
  yas12: number;
}

const MTV_TABLOSU: Record<MotorHacmi, MtvRow> = {
  '0-1300':    { label: '0–1300 cc',    yas1_3: 3400,  yas4_6: 2200,  yas7_11: 1100, yas12: 600  },
  '1301-1600': { label: '1301–1600 cc', yas1_3: 6200,  yas4_6: 4100,  yas7_11: 2100, yas12: 1100 },
  '1601-1800': { label: '1601–1800 cc', yas1_3: 11000, yas4_6: 7200,  yas7_11: 3600, yas12: 1800 },
  '1801-2000': { label: '1801–2000 cc', yas1_3: 17500, yas4_6: 11500, yas7_11: 5700, yas12: 2800 },
  '2001-2500': { label: '2001–2500 cc', yas1_3: 27000, yas4_6: 17500, yas7_11: 8700, yas12: 4300 },
  '2501+':     { label: '2501 cc ve üzeri', yas1_3: 42000, yas4_6: 27000, yas7_11: 13500, yas12: 6700 },
};

function getMtvTutar(hacim: MotorHacmi, yas: number): number {
  const row = MTV_TABLOSU[hacim];
  if (yas <= 3) return row.yas1_3;
  if (yas <= 6) return row.yas4_6;
  if (yas <= 11) return row.yas7_11;
  return row.yas12;
}

export default function MtvForm() {
  const [motorHacmi, setMotorHacmi] = useState<MotorHacmi>('1301-1600');
  const [aracYili, setAracYili] = useState('');
  const [hata, setHata] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const yil = parseInt(aracYili);
  const aracYasi = aracYili && !isNaN(yil) ? 2026 - yil : null;
  const sonuc = aracYasi !== null && aracYasi >= 0 ? getMtvTutar(motorHacmi, aracYasi) : null;

  function handleYil(v: string) {
    setAracYili(v);
    const val = parseInt(v);
    if (v && (isNaN(val) || val < 1900 || val > 2026)) {
      setHata('Geçerli bir model yılı girin (1900–2026)');
    } else {
      setHata('');
    }
  }

  const paylasMetni = sonuc
    ? `MTV Hesaplama 2026 → ${MTV_TABLOSU[motorHacmi].label}, ${aracYasi} yaş: Yıllık MTV ${formatNumber(sonuc)} ₺ (Her taksit ${formatNumber(sonuc / 2)} ₺) | hesaplayim.com/mtv-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">MTV Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Motor hacmi ve araç yaşına göre 2026 yılı Motorlu Taşıtlar Vergisi tutarını hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Motor Silindir Hacmi</label>
          <div className="relative mb-5">
            <select
              value={motorHacmi}
              onChange={(e) => setMotorHacmi(e.target.value as MotorHacmi)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              {(Object.keys(MTV_TABLOSU) as MotorHacmi[]).map((k) => (
                <option key={k} value={k}>{MTV_TABLOSU[k].label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-2.5 top-3 text-gray-400 pointer-events-none" />
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Araç Model Yılı</label>
          <input
            type="number"
            min="1900"
            max="2026"
            value={aracYili}
            onChange={(e) => handleYil(e.target.value)}
            placeholder="Örn: 2018"
            className={`w-full border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hata ? 'border-red-500 border-2' : 'border-gray-300'}`}
          />
          {hata && <p className="text-red-500 text-xs mb-2">{hata}</p>}
          {aracYasi !== null && aracYasi >= 0 && (
            <p className="text-xs text-gray-400 mt-1">Araç yaşı: {aracYasi} yıl</p>
          )}
        </div>

        {/* Sağ: Sidebar Reklam + Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc !== null && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Araç Yaşı</p>
                  <p className="text-2xl font-bold text-gray-800">{aracYasi} yıl</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Her Taksit (Ocak / Temmuz)</p>
                  <p className="text-2xl font-bold text-yellow-700">{formatNumber(sonuc / 2)} ₺</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Yıllık MTV Tutarı</p>
                  <p className="text-4xl font-bold text-green-600">{formatNumber(sonuc)} ₺</p>
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

              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">
                  2026 MTV Tarifesi — {MTV_TABLOSU[motorHacmi].label}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left border border-gray-200">Araç Yaşı</th>
                        <th className="p-2 text-right border border-gray-200">Yıllık MTV</th>
                        <th className="p-2 text-right border border-gray-200">Taksit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: '1–3 yıl', tutar: MTV_TABLOSU[motorHacmi].yas1_3, yasBand: [1, 3] },
                        { label: '4–6 yıl', tutar: MTV_TABLOSU[motorHacmi].yas4_6, yasBand: [4, 6] },
                        { label: '7–11 yıl', tutar: MTV_TABLOSU[motorHacmi].yas7_11, yasBand: [7, 11] },
                        { label: '12+ yıl', tutar: MTV_TABLOSU[motorHacmi].yas12, yasBand: [12, 999] },
                      ].map(({ label, tutar, yasBand }) => {
                        const isActive = aracYasi !== null && aracYasi >= yasBand[0] && aracYasi <= yasBand[1];
                        return (
                          <tr key={label} className={isActive ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                            <td className="p-2 border border-gray-200">
                              {label}{isActive ? <Check size={12} className="inline text-green-600 ml-1" /> : ''}
                            </td>
                            <td className="p-2 border border-gray-200 text-right text-green-600">{formatNumber(tutar)} ₺</td>
                            <td className="p-2 border border-gray-200 text-right text-yellow-700">{formatNumber(tutar / 2)} ₺</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
              q: "MTV ne zaman ödenir?",
              a: "MTV yılda iki eşit taksitte ödenir: birinci taksit Ocak ayının sonuna kadar, ikinci taksit Temmuz ayının sonuna kadar.",
            },
            {
              q: "MTV'yi nasıl öderim?",
              a: "e-Devlet, GİB'in dijital vergi dairesi, bankalar ve PTT şubeleri üzerinden ödenebilir.",
            },
            {
              q: "Araç kaç yaşında sayılır?",
              a: "Aracın model yılı esas alınır. Tescil yılı değil, üretim/model yılı kullanılır.",
            },
            {
              q: "İkinci el araç alınca MTV borcu devredilir mi?",
              a: "Evet. Araç satışında önceki sahibe ait ödenmemiş MTV borcu yeni sahibe geçer. Satın almadan önce borç sorgulama yapılması önerilir.",
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

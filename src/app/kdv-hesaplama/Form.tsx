'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { kdvHesapla, type KdvOrani } from '@/lib/calculations';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

const ORANLAR: KdvOrani[] = [1, 8, 10, 18, 20];

export default function KdvForm() {
  const [tutar, setTutar] = useState('');
  const [oran, setOran] = useState<KdvOrani>(18);
  const [mod, setMod] = useState<'haric' | 'dahil'>('haric');
  const [hata, setHata] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const n = parseInputToNumber(tutar);
  const sonuc = tutar && n > 0 ? kdvHesapla(n, oran, mod) : null;

  function handleTutar(v: string) {
    setTutar(v);
    const val = parseInputToNumber(v);
    setHata(v && (isNaN(val) || val <= 0) ? 'Geçerli bir tutar girin' : '');
  }

  const paylasMetni = sonuc
    ? `KDV (${oran}%) Hesaplama → KDV Hariç: ${formatNumber(sonuc.kdvsizTutar)} ₺, KDV: ${formatNumber(sonuc.kdvTutari)} ₺, KDV Dahil: ${formatNumber(sonuc.kdvliTutar)} ₺ | hesapladim.com/kdv-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">KDV Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        KDV ekleme ve çıkarma işlemlerini anında yapın. 2026 güncel oranlarıyla tüm KDV hesaplamaları.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          {/* Mod Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-blue-200 mb-6">
            <button
              onClick={() => setMod('haric')}
              className={`flex-1 py-2 text-sm font-semibold transition ${mod === 'haric' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              KDV Hariç → Dahil
            </button>
            <button
              onClick={() => setMod('dahil')}
              className={`flex-1 py-2 text-sm font-semibold transition ${mod === 'dahil' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              KDV Dahil → Hariç
            </button>
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {mod === 'haric' ? 'KDV Hariç Tutar (₺)' : 'KDV Dahil Tutar (₺)'}
          </label>
          <input
            type="number"
            min="0"
            value={tutar}
            onChange={(e) => handleTutar(e.target.value)}
            placeholder="Örn: 1000"
            className={`w-full border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hata ? 'border-red-500 border-2' : 'border-gray-300'}`}
          />
          {hata && <p className="text-red-500 text-xs mb-2">{hata}</p>}

          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-5">KDV Oranı</label>
          <div className="flex gap-2 flex-wrap">
            {ORANLAR.map((o) => (
              <button
                key={o}
                onClick={() => setOran(o)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${oran === o ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                %{o}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* 3 Sonuç Kutusu */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">KDV Hariç</p>
                  <p className="text-2xl font-bold text-gray-800">{formatNumber(sonuc.kdvsizTutar)} ₺</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">KDV Tutarı (%{oran})</p>
                  <p className="text-2xl font-bold text-yellow-700">{formatNumber(sonuc.kdvTutari)} ₺</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">KDV Dahil</p>
                  <p className="text-4xl font-bold text-green-600">{formatNumber(sonuc.kdvliTutar)} ₺</p>
                </div>
              </div>

              {/* Paylaş */}
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

              {/* Karşılaştırma Tablosu */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3 text-sm">
                  Tüm KDV Oranları Karşılaştırması ({formatNumber(n)} ₺ için)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 text-left border border-gray-200">Oran</th>
                        <th className="p-2 text-right border border-gray-200">KDV Hariç</th>
                        <th className="p-2 text-right border border-gray-200">KDV Tutarı</th>
                        <th className="p-2 text-right border border-gray-200">KDV Dahil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ORANLAR.map((o) => {
                        const r = kdvHesapla(n, o, mod);
                        return (
                          <tr
                            key={o}
                            className={o === oran ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}
                          >
                            <td className="p-2 border border-gray-200">%{o}{o === oran ? <Check size={12} className="inline text-green-600 ml-1" /> : ''}</td>
                            <td className="p-2 border border-gray-200 text-right">{formatNumber(r.kdvsizTutar)} ₺</td>
                            <td className="p-2 border border-gray-200 text-right text-yellow-700">{formatNumber(r.kdvTutari)} ₺</td>
                            <td className="p-2 border border-gray-200 text-right text-green-600">{formatNumber(r.kdvliTutar)} ₺</td>
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

      <AdBanner slot="mid" size="728x90" />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'KDV nasıl hesaplanır?',
              a: 'KDV Hariç tutardan hesaplama: KDV Tutarı = Tutar × KDV Oranı ÷ 100. Örneğin 1.000 ₺\'lik ürünün %18 KDV\'si 180 ₺\'dir; KDV Dahil fiyat 1.180 ₺ olur. Araç, her iki yönde de anında hesapler.',
            },
            {
              q: "Türkiye'de KDV oranları nelerdir 2026?",
              a: "2026 yılında geçerli KDV oranları: %1 (süt, yumurta, gazete, bazı temel gıdalar), %8 (işlenmiş gıda, ilaç, bazı tıbbi ürünler), %10 (bazı hizmetler), %18 (genel oran — elektronik, giyim, mobilya), %20 (alkol, tütün, lüks ürünler).",
            },
            {
              q: 'KDV dahil fiyattan KDV nasıl çıkarılır?',
              a: 'Formül: KDV Hariç Tutar = KDV Dahil Tutar ÷ (1 + KDV Oranı ÷ 100). Örnek: 1.180 ₺ KDV Dahil fiyatta (%18 KDV) → 1.180 ÷ 1.18 = 1.000 ₺ KDV Hariç, 180 ₺ KDV.',
            },
            {
              q: 'Hangi ürünlerde hangi KDV oranı uygulanır?',
              a: '%1: Süt, peynir, yumurta, ekmek, gazete, dergi. %8: Şeker, çikolata, konserve, ilaç, 1. ve 2. el konut. %18: Elektronik, giyim, mobilya, çoğu hizmet. %20: Alkol, tütün, mücevher. Güncel liste için GİB\'i takip edin.',
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
          <AdBanner slot="footer" size="336x280" />
        </div>
      </section>
    </div>
  );
}

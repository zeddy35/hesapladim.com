'use client';

import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { tapuHarci, type TapuIslem } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

const ISLEMLER: { key: TapuIslem; etiket: string; aciklama: string }[] = [
  { key: 'satis',  etiket: 'Satış',  aciklama: 'Alıcı %2 + Satıcı %2' },
  { key: 'bagis',  etiket: 'Bağış',  aciklama: 'Alıcı %3 (satıcı ödemez)' },
  { key: 'ipotek', etiket: 'İpotek', aciklama: 'Borçlu ‰4,55' },
];

export default function TapuHarciForm() {
  const [beyanDegeri, setBeyanDegeri] = useState('');
  const [islem, setIslem] = useState<TapuIslem>('satis');
  const [trafoBedeli, setTrafoBedeli] = useState('');

  const deger = Number(beyanDegeri.replace(/\./g, '').replace(',', '.')) || 0;
  const trafo = Number(trafoBedeli.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc = deger > 0 ? tapuHarci(deger, islem, trafo) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Tapu Harcı Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Gayrimenkul satış, bağış veya ipotek işlemi için tapu harcınızı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">İşlem Türü</label>
            <div className="grid grid-cols-3 gap-2">
              {ISLEMLER.map((i) => (
                <button
                  key={i.key}
                  onClick={() => setIslem(i.key)}
                  className={`py-2.5 rounded-lg text-sm font-semibold transition ${
                    islem === i.key ? 'bg-blue-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {i.etiket}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              {ISLEMLER.find((i) => i.key === islem)?.aciklama}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Beyan Değeri (₺)</label>
            <input
              type="number" min="0" value={beyanDegeri}
              onChange={(e) => setBeyanDegeri(e.target.value)}
              placeholder="örn: 3.500.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Diğer Masraflar (₺) — isteğe bağlı</label>
            <input
              type="number" min="0" value={trafoBedeli}
              onChange={(e) => setTrafoBedeli(e.target.value)}
              placeholder="örn: DASK, noter vb."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                  <p className="text-xs text-blue-600 mb-1">Alıcı Harcı</p>
                  <p className="text-2xl font-extrabold text-blue-800">{formatCurrency(sonuc.aliciHarci)}</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200 text-center">
                  <p className="text-xs text-indigo-600 mb-1">Satıcı Harcı</p>
                  <p className="text-2xl font-extrabold text-indigo-800">{formatCurrency(sonuc.saticiHarci)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
                  <p className="text-xs text-green-600 mb-1">Toplam Harç</p>
                  <p className="text-2xl font-extrabold text-green-800">{formatCurrency(sonuc.toplamHarc)}</p>
                </div>
              </div>

              {sonuc.donusumBedeli > 0 && (
                <div className="flex items-center justify-between bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <span className="text-sm text-orange-700 font-medium">Diğer Masraflar</span>
                  <span className="font-bold text-orange-700">{formatCurrency(sonuc.donusumBedeli)}</span>
                </div>
              )}

              <div className="bg-blue-700 text-white rounded-xl p-4 flex justify-between items-center">
                <span className="font-semibold">Toplam Maliyet</span>
                <span className="text-2xl font-extrabold">{formatCurrency(sonuc.toplamMaliyet)}</span>
              </div>

              {/* DASK info */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-2 text-sm text-yellow-800">
                <Info size={15} className="shrink-0 mt-0.5 text-yellow-600" />
                <div>
                  <p className="font-semibold mb-0.5">DASK zorunlu mu?</p>
                  <p>Evet. Zorunlu Deprem Sigortası (DASK) tüm konutlar için zorunludur. Tapu işleminde DASK poliçesi ibrazı istenebilir. Primler konuma, bina yaşına ve yapı tipine göre değişir.</p>
                </div>
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
            { q: '2026 tapu harcı oranı nedir?', a: 'Satış işlemlerinde alıcı ve satıcı ayrı ayrı beyan değeri üzerinden %2 tapu harcı öder (toplam %4). Bağışta alıcı %3, ipotekte borçlu binde 4,55 öder.' },
            { q: 'Tapu harcı beyan değeri mi gerçek değer mi?', a: 'Tapu harcı "beyan edilen değer" üzerinden hesaplanır. Ancak beyan edilen değer; Emlak Vergisi Değeri ve Tapu Müdürlüğü\'nün belirlediği asgari değerin altında olamaz.' },
            { q: 'Tapu harcını kim öder?', a: 'Yasal olarak hem alıcı hem satıcı kendi paylarını ödemek zorundadır. Ancak piyasada harçların tamamını alıcının üstlenmesi sıkça görülür.' },
            { q: 'DASK zorunlu mu?', a: 'Evet. 587 sayılı Kanun Hükmünde Kararname\'ye göre tüm konutlar için DASK (Zorunlu Deprem Sigortası) zorunludur. Tapu müdürlükleri işlem sırasında poliçe ibrazı isteyebilir.' },
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

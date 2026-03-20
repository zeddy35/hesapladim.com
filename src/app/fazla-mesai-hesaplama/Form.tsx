'use client';

import { useState } from 'react';
import { Info, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { fazlaMesai, type FazlaMesaiMod } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

const ZAM_TURLERI: { key: FazlaMesaiMod; etiket: string; aciklama: string; carpan: string }[] = [
  { key: 'haftalik', etiket: 'Haftalık Fazla', aciklama: 'Günlük 11,  haftalık 45 saati aşan çalışma', carpan: 'x1,5' },
  { key: 'gece',    etiket: 'Gece Çalışması', aciklama: '20:00–06:00 arası gece çalışması', carpan: 'x1,5' },
  { key: 'tatil',   etiket: 'Tatil Çalışması', aciklama: 'Hafta sonu veya resmi tatil çalışması', carpan: 'x2' },
];

export default function FazlaMesaiForm() {
  const [brutMaas, setBrutMaas] = useState('');
  const [normalSaat, setNormalSaat] = useState('45');
  const [fazlaSaat, setFazlaSaat] = useState('');
  const [mod, setMod] = useState<FazlaMesaiMod>('haftalik');

  const maas = Number(brutMaas.replace(/\./g, '').replace(',', '.')) || 0;
  const normal = Number(normalSaat) || 45;
  const fazla = Number(fazlaSaat) || 0;
  const sonuc = maas > 0 && fazla > 0 ? fazlaMesai(maas, normal, fazla, mod) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Fazla Mesai Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Brüt maaşınıza göre saatlik ücretinizi ve fazla mesai tazminatınızı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Aylık Brüt Maaş (₺)</label>
            <input type="number" min="0" value={brutMaas} onChange={(e) => setBrutMaas(e.target.value)}
              placeholder="örn: 30.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Haftalık Normal Mesai (saat) <span className="text-gray-400 font-normal">— varsayılan: 45</span>
            </label>
            <input type="number" min="1" max="60" value={normalSaat} onChange={(e) => setNormalSaat(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Fazla Mesai Saati</label>
            <input type="number" min="0" value={fazlaSaat} onChange={(e) => setFazlaSaat(e.target.value)}
              placeholder="örn: 10"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Zam Türü</label>
            <div className="space-y-2">
              {ZAM_TURLERI.map((z) => (
                <button key={z.key} onClick={() => setMod(z.key)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${
                    mod === z.key ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold text-sm ${mod === z.key ? 'text-blue-700' : 'text-gray-800'}`}>{z.etiket}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{z.aciklama}</p>
                    </div>
                    <span className={`font-bold text-lg ${mod === z.key ? 'text-blue-700' : 'text-gray-400'}`}>{z.carpan}</span>
                  </div>
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
              <div className="bg-blue-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Fazla Mesai Ücreti</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.fazlaMesaiUcreti)}</p>
                <p className="text-sm text-blue-200 mt-1">Zam faktörü: ×{sonuc.zamFaktoru}</p>
              </div>

              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="py-2 text-gray-600">Saatlik Brüt Ücret</td><td className="py-2 text-right font-semibold">{formatCurrency(sonuc.saatlikUcret)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Zam Faktörü</td><td className="py-2 text-right">×{sonuc.zamFaktoru}</td></tr>
                  <tr><td className="py-2 text-gray-600">Fazla Saat Başı Ücret</td><td className="py-2 text-right">{formatCurrency(sonuc.saatlikUcret * sonuc.zamFaktoru)}</td></tr>
                  <tr><td className="py-2 text-gray-600">Fazla Mesai Saati</td><td className="py-2 text-right">{fazla} saat</td></tr>
                  <tr className="border-t-2 border-blue-200"><td className="py-2.5 font-bold text-blue-800">Toplam Fazla Mesai</td><td className="py-2.5 text-right font-bold text-blue-800">{formatCurrency(sonuc.fazlaMesaiUcreti)}</td></tr>
                </tbody>
              </table>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2 text-sm text-blue-800">
                <Info size={14} className="shrink-0 mt-0.5 text-blue-500" />
                <span>Fazla mesai sınırı: İş Kanunu 41. madde uyarınca yılda <strong>270 saat</strong>.</span>
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
            { q: 'Fazla mesai ücreti nasıl hesaplanır?', a: 'Saatlik ücret = Brüt Maaş ÷ (Haftalık Normal Mesai × 4,33). Haftalık ve gece fazla mesaisinde ×1,5, tatil çalışmasında ×2 ile çarpılır.' },
            { q: 'Yıllık fazla mesai sınırı nedir?', a: 'İş Kanunu 41. maddesi uyarınca bir takvim yılında fazla çalışma süresi 270 saati geçemez. Bu sınırın üzerinde çalışma yaptırılması yasaktır.' },
            { q: 'İşveren fazla mesai ücretini ödemek zorunda mı?', a: 'Evet. İşçinin rızası alınmadan fazla mesai yaptırılamaz. Rıza ile yapılan fazla mesainin karşılığı ücret ya da izin olarak ödenmelidir.' },
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

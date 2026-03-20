'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, Info } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { kiraArtis } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';
import { KIRA_ARTIS_TAVAN_2026 } from '@/lib/config';

export default function KiraArtisForm() {
  const [mevcutKira, setMevcutKira] = useState('');
  const [artisOrani, setArtisOrani] = useState('');
  const [yasalTavanUygula, setYasalTavanUygula] = useState(false);

  const effectiveOran = yasalTavanUygula ? KIRA_ARTIS_TAVAN_2026 : Number(artisOrani) || 0;

  const sonuc =
    mevcutKira !== '' && effectiveOran > 0
      ? kiraArtis(Number(mevcutKira.replace(/\./g, '').replace(',', '.')) || 0, effectiveOran)
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kira Artış Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        TÜFE 12 aylık ortalama oranıyla yasal kira artış tavanını ve yeni kira tutarını hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mevcut Kira (₺/ay)</label>
            <input
              type="number"
              min="0"
              value={mevcutKira}
              onChange={(e) => setMevcutKira(e.target.value)}
              placeholder="örn: 15.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Artış Oranı (%)</label>
              <button
                onClick={() => setYasalTavanUygula((v) => !v)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition ${
                  yasalTavanUygula
                    ? 'bg-green-600 text-white'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                }`}
              >
                {yasalTavanUygula ? `✓ Yasal tavan: %${KIRA_ARTIS_TAVAN_2026}` : 'Yasal tavan uygula'}
              </button>
            </div>
            <input
              type="number"
              min="0"
              step="0.01"
              value={yasalTavanUygula ? KIRA_ARTIS_TAVAN_2026 : artisOrani}
              onChange={(e) => { setYasalTavanUygula(false); setArtisOrani(e.target.value); }}
              placeholder="örn: 28.82"
              className={`w-full border rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 ${
                yasalTavanUygula
                  ? 'border-green-300 bg-green-50 text-green-800 focus:ring-green-400'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex gap-2 text-sm text-blue-800">
            <Info size={15} className="shrink-0 mt-0.5 text-blue-500" />
            <span>2026 Yasal kira artış tavanı: <strong>%{KIRA_ARTIS_TAVAN_2026}</strong> (TÜFE 12 aylık ortalama)</span>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              {/* Karşılaştırma */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Eski Kira</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {formatCurrency(Number(mevcutKira.replace(/\./g, '').replace(',', '.')) || 0)}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                  <p className="text-xs text-blue-600 mb-1">Yeni Kira (%{effectiveOran})</p>
                  <p className="text-2xl font-bold text-blue-800">{formatCurrency(sonuc.yeniKira)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-orange-50 rounded-xl p-4 border border-orange-200">
                <span className="text-sm text-orange-700 font-medium">Aylık Artış Tutarı</span>
                <span className="text-xl font-bold text-orange-700">+{formatCurrency(sonuc.artisliMiktar)}</span>
              </div>

              {!yasalTavanUygula && sonuc.yeniKira > sonuc.yasalYeniKira && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm font-semibold text-red-700 mb-1">⚠️ Yasal tavanı aşıyor!</p>
                  <p className="text-sm text-red-600">
                    Yasal tavan (%{sonuc.yasalTavan}) ile hesaplanan yeni kira:{' '}
                    <strong>{formatCurrency(sonuc.yasalYeniKira)}</strong>
                  </p>
                </div>
              )}

              {!yasalTavanUygula && sonuc.yeniKira <= sonuc.yasalYeniKira && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
                  ✓ Belirlediğiniz artış oranı yasal tavanın altında.
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-2">
                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Kiracı ve kiraya veren haklarınız için bir avukata danışmanızı öneririz.
                </p>
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
              q: '2026 kira artış tavanı ne kadar?',
              a: `TÜİK tarafından açıklanan TÜFE 12 aylık ortalama değişim oranı %${KIRA_ARTIS_TAVAN_2026} olup 2026 yılı için konut kiralarında yasal artış tavanını oluşturmaktadır.`,
            },
            {
              q: 'Kiracı yasal tavanın üzerinde artışı reddedebilir mi?',
              a: 'Evet. Türk Borçlar Kanunu 344. maddesi uyarınca konut kiralarında yasal tavan (TÜFE 12 aylık ortalama) aşılamaz. Üzerindeki artış talepleri geçersiz sayılır.',
            },
            {
              q: 'İşyeri kiraları için de aynı tavan geçerli mi?',
              a: 'Hayır. Yasal tavan yalnızca konut kiralarını kapsar. İşyeri kiralarında taraflar sözleşmede belirledikleri oranda artış uygulayabilir.',
            },
            {
              q: 'Kira artış tavanı her ay güncellenir mi?',
              a: 'Evet. TÜFE 12 aylık ortalama değişim oranı TÜİK tarafından her ay açıklanır. Zam tarihinize en yakın açıklanan oranı esas almanız gerekir.',
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

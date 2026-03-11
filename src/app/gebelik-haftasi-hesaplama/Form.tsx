'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { gebelikHesapla } from '@/lib/calculations';

function formatTarih(d: Date) {
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function GebelikForm() {
  const [sat, setSat] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const bugun = new Date();
  const maxSat = new Date();
  maxSat.setDate(bugun.getDate() - 1);

  const sonuc = sat && new Date(sat) < bugun ? gebelikHesapla(new Date(sat)) : null;

  const paylasMetni = sonuc
    ? `Gebelik: ${sonuc.haftaSayisi}. hafta ${sonuc.gunSayisi}. gün | Tahmini doğum: ${formatTarih(sonuc.tahminiDogumTarihi)} | hesapladim.com/gebelik-haftasi-hesaplama`
    : '';

  const trimesterLabel = sonuc
    ? sonuc.trimester === 1 ? '1. Trimester (1–12. hafta)'
    : sonuc.trimester === 2 ? '2. Trimester (13–26. hafta)'
    : '3. Trimester (27–40. hafta)'
    : '';

  const trimesterPct = sonuc ? Math.min(100, Math.round((sonuc.haftaSayisi / 40) * 100)) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Gebelik Haftası Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Son adet tarihinizi girerek kaçıncı haftada olduğunuzu, tahmini doğum tarihinizi ve bebek büyüklüğünü öğrenin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Son Adet Tarihi (SAT)</label>
          <input
            type="date"
            value={sat}
            max={maxSat.toISOString().split('T')[0]}
            onChange={(e) => setSat(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {sat && new Date(sat) >= bugun && (
            <p className="text-red-500 text-xs mt-1">Son adet tarihi bugünden önce olmalıdır.</p>
          )}
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            Son adet tarihinizden itibaren hesaplanır (Naegele kuralı). Düzensiz döngüler için doktorunuzla görüşün.
          </p>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* Ana hafta göstergesi */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Gebelik haftanız</p>
                <p className="text-6xl font-extrabold text-blue-800">{sonuc.haftaSayisi}</p>
                <p className="text-lg text-gray-500 font-semibold">. hafta {sonuc.gunSayisi}. gün</p>
              </div>

              {/* Trimester Timeline */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>1. Trimester</span>
                  <span>2. Trimester</span>
                  <span>3. Trimester</span>
                  <span>40. hf</span>
                </div>
                <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all"
                    style={{ width: `${trimesterPct}%` }}
                  />
                </div>
                <p className="text-xs text-center text-pink-600 font-semibold mt-1">{trimesterLabel}</p>
              </div>

              {/* Tahmini doğum */}
              <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 text-center mb-4">
                <p className="text-sm text-gray-600 mb-1">Tahmini doğum tarihi</p>
                <p className="text-2xl font-bold text-pink-700">{formatTarih(sonuc.tahminiDogumTarihi)}</p>
                <p className="text-xs text-gray-400 mt-1">{sonuc.kalanHafta} hafta {sonuc.kalanGun} gün kaldı</p>
              </div>

              {/* Bebek büyüklüğü */}
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex items-center gap-4 mb-4">
                <span className="text-5xl">{sonuc.bebekEmoji}</span>
                <div>
                  <p className="text-sm text-gray-500">Bu hafta bebeğiniz</p>
                  <p className="font-bold text-gray-800 text-lg">{sonuc.bebeginBuyuklugu} büyüklüğünde</p>
                  <p className="text-xs text-gray-400">{sonuc.haftaSayisi}. hafta</p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(paylasMetni)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
                <button
                  onClick={() => { navigator.clipboard.writeText(paylasMetni); setKopyalandi(true); setTimeout(() => setKopyalandi(false), 2000); }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition inline-flex items-center gap-1.5"
                >
                  {kopyalandi ? <><Check size={15} /> Kopyalandı</> : <><Clipboard size={15} /> Kopyala</>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" size="728x90" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'Gebelik haftası nasıl hesaplanır?', a: 'Son adet tarihinizden (SAT) bugüne kadar geçen gün sayısı 7\'ye bölünür. Doktorlar bu yöntemi standart olarak kullanır. Ultrason ölçümleri farklı sonuç verebilir.' },
            { q: 'Tahmini doğum tarihi nasıl hesaplanır?', a: 'Naegele kuralına göre son adet tarihine 280 gün (40 hafta) eklenir. Gerçek doğumların %80\'i bu tarihten ±2 hafta içinde gerçekleşir.' },
            { q: 'Trimester nedir?', a: 'Gebelik 3 döneme (trimester) ayrılır: 1. Trimester (1–12. hafta): organ gelişimi. 2. Trimester (13–26. hafta): bebek hareket etmeye başlar. 3. Trimester (27–40. hafta): büyüme ve doğuma hazırlık.' },
            { q: 'Düzensiz adet döngüsünde hesaplama doğru mudur?', a: 'Bu araç 28 günlük standart döngüyü varsayar. Düzensiz döngünüz varsa sonuçlar yaklaşık olabilir. Kesin hafta tespiti için erken dönem ultrason gerekir.' },
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

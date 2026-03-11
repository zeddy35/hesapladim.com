'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check, Footprints, Flame, MapPin, Clock } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { adimKalori } from '@/lib/calculations';

const HIZLI_ADIM = [2000, 5000, 7500, 10000, 15000];

export default function AdimKaloriForm() {
  const [adim, setAdim] = useState('');
  const [kilo, setKilo] = useState('');
  const [boy, setBoy] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const adimN = parseInt(adim);
  const kiloN = parseFloat(kilo);
  const boyN = parseFloat(boy);

  const sonuc = adim && kilo && boy && adimN > 0 && kiloN > 0 && boyN > 0
    ? adimKalori(adimN, kiloN, boyN)
    : null;

  const ref10k = kilo && boy && kiloN > 0 && boyN > 0
    ? adimKalori(10000, kiloN, boyN)
    : null;

  const paylasMetni = sonuc
    ? `${adimN.toLocaleString('tr-TR')} adımda ${sonuc.yakilanKalori} kcal yaktım — ${sonuc.mesafeKm} km | hesapladim.com/adim-kalori-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Adım Kalori Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Günlük adım sayınıza göre yakılan kalori, yürünen mesafe ve süreyi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Adım Sayısı</label>
          <input
            type="number"
            min="1"
            value={adim}
            onChange={(e) => setAdim(e.target.value)}
            placeholder="Örn: 10000"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-wrap gap-1.5 mb-4">
            {HIZLI_ADIM.map((a) => (
              <button
                key={a}
                onClick={() => setAdim(String(a))}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg font-semibold hover:bg-blue-100 transition"
              >
                {a.toLocaleString('tr-TR')}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Kilo (kg)</label>
          <input
            type="number"
            min="1"
            value={kilo}
            onChange={(e) => setKilo(e.target.value)}
            placeholder="Örn: 70"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Boy (cm)</label>
          <input
            type="number"
            min="1"
            value={boy}
            onChange={(e) => setBoy(e.target.value)}
            placeholder="Örn: 175"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <Flame size={24} className="text-red-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 mb-1">Yakılan Kalori</p>
                  <p className="text-3xl font-bold text-red-600">{sonuc.yakilanKalori}</p>
                  <p className="text-xs text-gray-400 mt-1">kcal</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <MapPin size={24} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 mb-1">Mesafe</p>
                  <p className="text-3xl font-bold text-blue-700">{sonuc.mesafeKm}</p>
                  <p className="text-xs text-gray-400 mt-1">km</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <Clock size={24} className="text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 mb-1">Süre</p>
                  <p className="text-3xl font-bold text-green-700">{sonuc.yuruyusSuresiDakika}</p>
                  <p className="text-xs text-gray-400 mt-1">dakika</p>
                </div>
              </div>

              {ref10k && (
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center gap-3 mb-4">
                  <Footprints size={28} className="text-orange-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-orange-800">10.000 adım referansı</p>
                    <p className="text-xs text-gray-600">
                      {ref10k.yakilanKalori} kcal — {ref10k.mesafeKm} km — {ref10k.yuruyusSuresiDakika} dk
                    </p>
                  </div>
                </div>
              )}

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
            { q: '10.000 adım kaç kalori yakar?', a: '10.000 adım, ortalama 70 kg ağırlığında 175 cm boyundaki bir kişi için yaklaşık 350–400 kcal yakar. Kilo ve boy kişiden kişiye farklılık gösterir.' },
            { q: '10.000 adım kaç km yapar?', a: 'Ortalama adım uzunluğu boy × 0.415 formülüyle hesaplanır. 175 cm boy için ~72.6 cm adım = 10.000 adımda ~7.26 km.' },
            { q: 'Adım sayısı kalori hesaplaması nasıl yapılır?', a: 'MET değeri (yürüyüş ≈ 3.5) × vücut ağırlığı × yürüyüş süresi (saat) formülü kullanılır. Bu araç ortalama 5 km/h yürüyüş hızını varsayar.' },
            { q: 'Günde kaç adım atmalıyım?', a: 'DSÖ günde en az 8.000–10.000 adım önermektedir. Sedanter bireyler için 5.000–7.500 adım hedeflemek iyi bir başlangıçtır.' },
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

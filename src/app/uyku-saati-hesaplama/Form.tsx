'use client';

import { useState } from 'react';
import { ChevronDown, Moon } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { uykuSaati } from '@/lib/calculations';

const DONGU_LABEL = ['6. döngü (9 sa)', '5. döngü (7.5 sa)', '4. döngü (6 sa)', '3. döngü (4.5 sa)', '2. döngü (3 sa)', '1. döngü (1.5 sa)'];
const DONGU_RENK = ['bg-green-100 border-green-400 text-green-800', 'bg-green-50 border-green-300 text-green-700', 'bg-yellow-50 border-yellow-300 text-yellow-700', 'bg-orange-50 border-orange-300 text-orange-700', 'bg-red-50 border-red-300 text-red-700', 'bg-red-100 border-red-400 text-red-800'];

function simdi(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export default function UykuForm() {
  const [uyanma, setUyanma] = useState('');

  const sonuc = uyanma ? uykuSaati(uyanma) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Uyku Saati Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Uyanmak istediğiniz saati girerek uyku döngüsüne göre en ideal yatış saatlerini bulun.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Kaçta uyanmak istiyorsun?
          </label>
          <input
            type="time"
            value={uyanma}
            onChange={(e) => setUyanma(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-mono"
          />
          <button
            onClick={() => setUyanma(simdi())}
            className="w-full text-sm bg-blue-50 text-blue-700 py-2 rounded-lg font-semibold hover:bg-blue-100 transition"
          >
            Şu anki saati kullan
          </button>

          <div className="mt-5 bg-purple-50 border border-purple-100 rounded-xl p-4">
            <p className="text-sm font-semibold text-purple-800 mb-1 flex items-center gap-2">
              <Moon size={16} /> Uyku Döngüsü Nedir?
            </p>
            <p className="text-xs text-purple-700 leading-relaxed">
              Her uyku döngüsü yaklaşık <strong>90 dakika</strong> sürer. Uyku döngüsünü tamamlayarak
              uyanmak, tam ortasında uyanmaktan çok daha dinç hissettirir. Bu hesaplayıcı, uyanmak 
              istediğiniz saate göre 14 dakikalık uykuya dalma süresi ekleyerek ideal yatış saatlerini belirler.
            </p>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">
                <strong>{uyanma}</strong>'da uyanmak için önerilen yatış saatleri:
              </p>
              <p className="text-xs text-gray-400 mb-4">Yeşil: ideal (5–6 döngü) / Sarı–Kırmızı: az uyku</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {sonuc.oneriliBakmaSaatleri.map((saat, i) => (
                  <div
                    key={saat}
                    className={`border-2 rounded-xl p-3 text-center ${DONGU_RENK[i]}`}
                  >
                    <p className="text-2xl font-extrabold font-mono">{saat}</p>
                    <p className="text-xs mt-1 font-semibold">{DONGU_LABEL[i]}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-3 text-center text-sm text-blue-800 font-semibold">
                Önerilen uyku süresi: <span className="font-bold">{sonuc.idealSure}</span>
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
            { q: 'Uyku döngüsü nedir?', a: 'Uyku döngüsü, hafif uyku → derin uyku → REM uyku aşamalarından oluşan yaklaşık 90 dakikalık bir süreçtir. Vücut gecede 4–6 döngü tamamlar. Döngü ortasında uyanmak yorgunluk hissi yaratır.' },
            { q: 'Kaç saat uyumalıyım?', a: 'Yetişkinler için önerilen 7–9 saattir (5–6 uyku döngüsü). 18–25 yaş: 7–9 saat, 26–64 yaş: 7–9 saat, 65+: 7–8 saat. Bu araç en az 5 döngü (7.5 saat) öneriyor.' },
            { q: '14 dakika neden ekleniyor?', a: 'Ortalama bir insan yatağa girip uykuya dalana kadar yaklaşık 14 dakika geçirir. Hesaplayıcı bu "uykuya dalma süresini" de hesaba katar.' },
            { q: 'Şekerleme REM uykusu sağlar mı?', a: '20–30 dakikalık kısa şekerlemeler enerji verir ancak tam bir REM döngüsü için yetmez. 90 dakikalık şekerleme bir döngüyü tamamlar ama gece uykusunun yerini alamaz.' },
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

'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { oranOrantiHesapla } from '@/lib/calculations';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

type Harf = 'a' | 'b' | 'c' | 'd';
const HARFLER: Harf[] = ['a', 'b', 'c', 'd'];

export default function OranOrantiForm() {
  const [degerler, setDegerler] = useState<Record<Harf, string>>({ a: '', b: '', c: '', d: '' });
  const [bos, setBos] = useState<Harf>('d');
  const [kopyalandi, setKopyalandi] = useState(false);

  function handleDeger(harf: Harf, val: string) {
    setDegerler((prev) => ({ ...prev, [harf]: val }));
  }

  function handleBosSecim(harf: Harf) {
    setBos(harf);
    setDegerler((prev) => ({ ...prev, [harf]: '' }));
  }

  const a = bos === 'a' ? null : parseInputToNumber(degerler.a) || null;
  const b = bos === 'b' ? null : parseInputToNumber(degerler.b) || null;
  const c = bos === 'c' ? null : parseInputToNumber(degerler.c) || null;
  const d = bos === 'd' ? null : parseInputToNumber(degerler.d) || null;

  const dolmuHarfler = HARFLER.filter((h) => h !== bos);
  const tumluDolu = dolmuHarfler.every((h) => {
    const v = parseInputToNumber(degerler[h]);
    return v !== 0;
  });

  const sonuc = tumluDolu ? oranOrantiHesapla(a, b, c, d) : null;

  const paylasMetni = sonuc
    ? `Oran Orantı: ${bos.toUpperCase()} = ${formatNumber(sonuc.sonuc)} | hesapladim.com/oran-orantiyi-hesaplama`
    : '';

  const gosterDeger = (harf: Harf) => {
    if (harf === bos) return sonuc ? formatNumber(sonuc.sonuc) : '?';
    return degerler[harf] || '?';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Oran Orantı Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        a / b = c / d denkleminde bilinmeyeni adım adım bulun. Hangi kutuyu boş bırakacağınızı seçin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          {/* 2×2 Grid */}
          <p className="text-sm text-gray-500 mb-3">
            Boş bırakmak istediğiniz kutuyu <strong>?</strong> olarak işaretleyin:
          </p>
          <div className="grid grid-cols-2 gap-4 mb-2">
            {HARFLER.map((harf, i) => (
              <div key={harf}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-gray-700 uppercase w-4">{harf}</span>
                  <button
                    onClick={() => handleBosSecim(harf)}
                    className={`text-xs px-2 py-0.5 rounded font-semibold transition ${bos === harf ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                    {bos === harf ? '?' : '?'} bilinmeyen
                  </button>
                </div>
                <input
                  type="number"
                  disabled={bos === harf}
                  value={bos === harf ? '' : degerler[harf]}
                  onChange={(e) => handleDeger(harf, e.target.value)}
                  placeholder={bos === harf ? '?' : `${harf} değeri`}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${bos === harf ? 'bg-blue-50 border-blue-300 text-blue-500 font-bold text-center cursor-not-allowed' : 'border-gray-300'}`}
                />
                {/* Orantı gösterimi */}
                {i === 1 && (
                  <div className="col-span-2 text-center my-1">
                    <span className="text-gray-400 text-xl font-bold">=</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Görsel orantı */}
          <div className="bg-gray-50 rounded-xl p-3 text-center mt-4">
            <span className="text-gray-700 font-mono text-base">
              {gosterDeger('a')} / {gosterDeger('b')} = {gosterDeger('c')} / {gosterDeger('d')}
            </span>
          </div>
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">Bilinmeyen değer ({sonuc.bilinmeyenHarf.toUpperCase()})</p>
              <p className="text-4xl font-bold text-green-600 mb-6">{formatNumber(sonuc.sonuc)}</p>

              {/* Adım adım çözüm */}
              <div className="bg-blue-50 rounded-xl p-4 mb-4">
                <p className="text-xs text-blue-700 font-semibold mb-2 uppercase tracking-wide">Adım Adım Çözüm</p>
                <ol className="space-y-1">
                  {sonuc.adimlar.map((adim, i) => (
                    <li key={i} className="flex gap-2 text-sm text-blue-900">
                      <span className="text-blue-400 font-bold shrink-0">{i + 1}.</span>
                      <span className="font-mono">{adim}</span>
                    </li>
                  ))}
                </ol>
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
              q: 'Oran orantı nasıl kurulur?',
              a: 'Oran orantı a/b = c/d şeklinde kurulur. Dört sayıdan biri bilinmeyense "bilinmeyen" kutusunu seçin, diğer üç değeri girin. Araç çapraz çarpım yöntemiyle adım adım çözer.',
            },
            {
              q: 'Doğru orantı ve ters orantı arasındaki fark nedir?',
              a: 'Doğru orantıda iki büyüklük aynı yönde değişir: a₁/a₂ = b₁/b₂. Ters orantıda ters yönde değişir: a₁ × b₁ = a₂ × b₂. Bu araç doğru orantı (a/b = c/d) için çalışır.',
            },
            {
              q: 'Çapraz çarpım yöntemi nedir?',
              a: 'a/b = c/d orantısında çapraz çarpım: a × d = b × c. Bu eşitlikten bilinmeyen çekilir. Örneğin d bilinmiyorsa → d = (b × c) ÷ a. Araç bu adımları otomatik gösterir.',
            },
            {
              q: 'Günlük hayatta oran orantı nerelerde kullanılır?',
              a: 'Tarif ölçekleme (4 kişilik yapıyı 10 kişiye çevirme), döviz çevirme, harita ölçeği, indirim hesaplama, karışım oranları, hız-süre-mesafe problemleri gibi pek çok alanda kullanılır.',
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

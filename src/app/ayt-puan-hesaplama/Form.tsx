'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check, AlertTriangle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { aytPuanHesapla, type AytAlan, type AytNetGiris } from '@/lib/calculations';

type Alan = AytAlan;

const ALAN_ETIKETLER: Record<Alan, string> = {
  SAY: 'Sayısal',
  EA: 'Eşit Ağırlık',
  SOZ: 'Sözel',
  DIL: 'Dil (YDT)',
};

const ALAN_DERSLER: Record<Alan, Array<{ key: keyof AytNetGiris; label: string; max: number }>> = {
  SAY: [
    { key: 'matNet',      label: 'Matematik',  max: 40 },
    { key: 'fizikNet',    label: 'Fizik',       max: 14 },
    { key: 'kimyaNet',    label: 'Kimya',       max: 13 },
    { key: 'biyolojiNet', label: 'Biyoloji',    max: 13 },
  ],
  EA: [
    { key: 'matNet',       label: 'Matematik',   max: 40 },
    { key: 'edebiyatNet',  label: 'Edebiyat',    max: 24 },
    { key: 'tarih1Net',    label: 'Tarih-1',     max: 10 },
    { key: 'cografya1Net', label: 'Coğrafya-1',  max: 6  },
  ],
  SOZ: [
    { key: 'edebiyatNet',  label: 'Edebiyat',    max: 24 },
    { key: 'tarih1Net',    label: 'Tarih-1',     max: 10 },
    { key: 'cografya1Net', label: 'Coğrafya-1',  max: 6  },
    { key: 'tarih2Net',    label: 'Tarih-2',     max: 11 },
    { key: 'cografya2Net', label: 'Coğrafya-2',  max: 11 },
    { key: 'felsefeNet',   label: 'Felsefe',     max: 12 },
    { key: 'dinNet',       label: 'Din Kültürü', max: 6  },
  ],
  DIL: [
    { key: 'ydtNet', label: 'Yabancı Dil (YDT)', max: 80 },
  ],
};

function renkSinif(puan: number) {
  if (puan >= 400) return 'text-green-600';
  if (puan >= 250) return 'text-yellow-600';
  return 'text-red-500';
}

export default function AytForm() {
  const [alan, setAlan] = useState<Alan>('SAY');
  const [netler, setNetler] = useState<Record<string, string>>({});
  const [kopyalandi, setKopyalandi] = useState(false);

  function alanDegistir(yeniAlan: Alan) {
    setAlan(yeniAlan);
    setNetler({});
  }

  const netGiris: AytNetGiris = {};
  for (const ders of ALAN_DERSLER[alan]) {
    if (netler[ders.key] !== undefined && netler[ders.key] !== '') {
      (netGiris as Record<string, number>)[ders.key] = parseFloat(netler[ders.key]) || 0;
    }
  }

  const herhangiGiris = Object.values(netler).some((v) => v !== '');
  const sonuc = herhangiGiris ? aytPuanHesapla(alan, netGiris) : null;

  const paylasMetni = sonuc
    ? `AYT ${ALAN_ETIKETLER[alan]} Puanım: ${sonuc.aytPuani} | Toplam Net: ${sonuc.toplamNet} | hesapladim.com/ayt-puan-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">AYT Puan Hesaplama 2024</h1>
      <p className="text-gray-500 mb-8">
        Alanınızı seçin, AYT net sayılarınızı girin ve tahmini puanınızı anında görün.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-[440px] shrink-0 h-fit">
          {/* Alan Seçimi */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {(Object.keys(ALAN_ETIKETLER) as Alan[]).map((a) => (
              <button
                key={a}
                onClick={() => alanDegistir(a)}
                className={`py-2 rounded-lg text-sm font-semibold transition ${alan === a ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {ALAN_ETIKETLER[a]}
              </button>
            ))}
          </div>

          {/* Ders Netleri */}
          <div className="space-y-3">
            {ALAN_DERSLER[alan].map((ders) => (
              <div key={ders.key} className="flex items-center gap-3">
                <label className="flex-1 text-sm font-medium text-gray-700">
                  {ders.label}
                  <span className="text-xs text-gray-400 ml-1">(max {ders.max})</span>
                </label>
                <input
                  type="number"
                  min={-ders.max}
                  max={ders.max}
                  step="0.25"
                  value={netler[ders.key] ?? ''}
                  onChange={(e) => setNetler((p) => ({ ...p, [ders.key]: e.target.value }))}
                  placeholder="Net"
                  className="w-24 border border-gray-300 rounded-lg px-3 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setNetler({})}
            className="w-full mt-4 py-2 text-sm font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
          >
            Temizle
          </button>

          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <span>Katsayılar ÖSYM tarafından değişebilir. Bu hesaplama tahmini niteliktedir.</span>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className="text-center bg-gray-50 rounded-xl p-5 border">
                <p className="text-sm text-gray-500 mb-1">AYT {ALAN_ETIKETLER[alan]} Puanınız</p>
                <p className={`text-6xl font-extrabold ${renkSinif(sonuc.aytPuani)}`}>{sonuc.aytPuani}</p>
                <p className="text-sm text-gray-500 mt-2">Ham Puan: <strong>{sonuc.aytHamPuan}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(sonuc.alanNetler).map(([ad, net]) => (
                  <div key={ad} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1 truncate">{ad}</p>
                    <p className={`text-xl font-bold ${(net as number) < 0 ? 'text-red-500' : 'text-gray-800'}`}>
                      {net as number}
                    </p>
                    <p className="text-xs text-gray-400">net</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-semibold">Toplam Net:</span> {sonuc.toplamNet}
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(paylasMetni)}`}
                  target="_blank" rel="noopener noreferrer"
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

      <AdBanner slot="mid" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'AYT puanı nasıl hesaplanır?', a: 'Sayısal alanda: 100 (taban) + her net × 3. EA alanda Matematik ve Edebiyat netler × 3, diğerleri × 2. ÖSYM bu ham puanı standardize ederek 100–500 arası puana dönüştürür.' },
            { q: 'AYT ve TYT puanı nasıl birleşir?', a: 'Yerleştirme puanı = TYT puanı × 0.4 + AYT puanı × 0.6. AYT belirleyici ağırlığa sahiptir.' },
            { q: 'AYT\'de kaç net yapmalıyım?', a: 'Sayısal için 300+ puan için yaklaşık 60–70 net hedeflenmelidir. EA ve Sözel için alan katsayıları farklı olduğundan standart net sayısı değişkenlik gösterir.' },
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

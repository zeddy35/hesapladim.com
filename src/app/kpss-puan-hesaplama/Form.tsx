'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check, Info } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { kpssPuanHesapla } from '@/lib/calculations';

const PUAN_TURLERI = [
  { key: 'kpssP3',  label: 'KPSS P3',  aciklama: 'Lisans — Devlet memurluğu (GK+GY)' },
  { key: 'kpssP10', label: 'KPSS P10', aciklama: 'Önlisans — Devlet memurluğu (GK+GY)' },
  { key: 'kpssP93', label: 'KPSS P93', aciklama: 'Lisans öğretmen — ÖABT + GK+GY' },
  { key: 'kpssP94', label: 'KPSS P94', aciklama: 'Önlisans öğretmen — ÖABT + GK+GY' },
] as const;

function puanRenk(puan: number) {
  if (puan >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (puan >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (puan >= 50) return 'text-yellow-700 bg-yellow-50 border-yellow-200';
  return 'text-red-600 bg-red-50 border-red-200';
}

export default function KpssForm() {
  const [gkD, setGkD] = useState('');
  const [gkY, setGkY] = useState('');
  const [gyD, setGyD] = useState('');
  const [gyY, setGyY] = useState('');
  const [alanAcik, setAlanAcik] = useState(false);
  const [alanD, setAlanD] = useState('');
  const [alanY, setAlanY] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const herhangiGiris = gkD !== '' || gkY !== '' || gyD !== '' || gyY !== '';

  const sonuc = herhangiGiris
    ? kpssPuanHesapla(
        Number(gkD) || 0,  Number(gkY) || 0,
        Number(gyD) || 0,  Number(gyY) || 0,
        alanAcik && alanD !== '' ? Number(alanD) || 0 : undefined,
        alanAcik && alanY !== '' ? Number(alanY) || 0 : undefined,
      )
    : null;

  const paylasMetni = sonuc
    ? `KPSS Puanlarım — P3: ${sonuc.kpssP3} | P10: ${sonuc.kpssP10}${sonuc.kpssP93 ? ` | P93: ${sonuc.kpssP93}` : ''} | hesapladim.com/kpss-puan-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">KPSS Puan Hesaplama 2024</h1>
      <p className="text-gray-500 mb-8">
        GK ve GY doğru/yanlış sayılarınızı girerek KPSS P3, P10, P93 ve P94 puanlarınızı hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          {/* GK */}
          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Genel Kültür (GK) — 60 soru</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Doğru</label>
                <input type="number" min="0" max="60" value={gkD} onChange={(e) => setGkD(e.target.value)} placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Yanlış</label>
                <input type="number" min="0" max="60" value={gkY} onChange={(e) => setGkY(e.target.value)} placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {sonuc && (
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Net</label>
                  <div className={`rounded-lg px-3 py-2 text-center font-bold text-sm ${sonuc.gkNet >= 0 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-600'}`}>
                    {sonuc.gkNet}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* GY */}
          <div>
            <p className="font-semibold text-gray-800 mb-2 text-sm">Genel Yetenek (GY) — 60 soru</p>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Doğru</label>
                <input type="number" min="0" max="60" value={gyD} onChange={(e) => setGyD(e.target.value)} placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Yanlış</label>
                <input type="number" min="0" max="60" value={gyY} onChange={(e) => setGyY(e.target.value)} placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              {sonuc && (
                <div className="flex-1">
                  <label className="text-xs text-gray-500 mb-1 block">Net</label>
                  <div className={`rounded-lg px-3 py-2 text-center font-bold text-sm ${sonuc.gyNet >= 0 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-600'}`}>
                    {sonuc.gyNet}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alan Bilgisi Toggle */}
          <div>
            <button
              onClick={() => setAlanAcik((v) => !v)}
              className={`w-full py-2 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${alanAcik ? 'bg-purple-700 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'}`}
            >
              <ChevronDown size={15} className={`transition-transform ${alanAcik ? 'rotate-180' : ''}`} />
              {alanAcik ? 'Alan Bilgisini Kaldır (P93/P94)' : 'Alan Bilgisi Ekle (P93/P94 için)'}
            </button>
            {alanAcik && (
              <div className="mt-3">
                <p className="font-semibold text-gray-800 mb-2 text-sm">ÖABT Alan Bilgisi — 60 soru</p>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Doğru</label>
                    <input type="number" min="0" max="60" value={alanD} onChange={(e) => setAlanD(e.target.value)} placeholder="0"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Yanlış</label>
                    <input type="number" min="0" max="60" value={alanY} onChange={(e) => setAlanY(e.target.value)} placeholder="0"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  </div>
                  {sonuc && sonuc.alanNet !== null && (
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Net</label>
                      <div className={`rounded-lg px-3 py-2 text-center font-bold text-sm ${sonuc.alanNet >= 0 ? 'bg-purple-50 text-purple-700' : 'bg-red-50 text-red-600'}`}>
                        {sonuc.alanNet}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              {/* P3 büyük sonuç */}
              <div className={`rounded-xl border p-5 text-center ${puanRenk(sonuc.kpssP3)}`}>
                <p className="text-sm text-gray-500 mb-1">KPSS P3 Puanınız</p>
                <p className="text-5xl font-extrabold">{sonuc.kpssP3}</p>
              </div>

              {/* 4 puan türü */}
              <div className="grid grid-cols-2 gap-3">
                {PUAN_TURLERI.map((pt) => {
                  const deger = sonuc[pt.key];
                  if (deger === null) return (
                    <div key={pt.key} className="bg-gray-50 rounded-xl p-3 border border-gray-200 opacity-50">
                      <p className="text-xs font-bold text-gray-500">{pt.label}</p>
                      <p className="text-sm text-gray-500 mt-1">Alan bilgisi gerekli</p>
                    </div>
                  );
                  return (
                    <div key={pt.key} className={`rounded-xl p-3 border ${puanRenk(deger as number)}`}>
                      <p className="text-xs font-bold">{pt.label}</p>
                      <p className="text-2xl font-extrabold mt-0.5">{deger}</p>
                      <p className="text-xs mt-1 opacity-70">{pt.aciklama}</p>
                    </div>
                  );
                })}
              </div>

              {/* Toplam net */}
              <div className="bg-gray-50 rounded-xl p-4 flex justify-between text-sm">
                <span className="text-gray-600">Toplam Net (GK+GY{sonuc.alanNet !== null ? '+Alan' : ''})</span>
                <span className="font-bold text-gray-800">{sonuc.toplamNet}</span>
              </div>

              {/* Bilgi kutusu */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800 leading-relaxed flex gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-semibold mb-1">Hangi Puan Türü Ne İçin?</p>
                  <p><strong>P3:</strong> Lisans mezunu devlet memuru atamaları</p>
                  <p><strong>P10:</strong> Önlisans mezunu devlet memuru atamaları</p>
                  <p><strong>P93/P94:</strong> Öğretmen atamaları (ÖABT dahil)</p>
                </div>
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

      <AdBanner slot="mid" size="728x90" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'KPSS P3 ve P10 farkı nedir?', a: 'P3 lisans mezunları için, P10 önlisans mezunları için kullanılır. Her ikisi de GK ve GY testlerinden hesaplanır. Formül yapısı benzerdir ancak ayrı kontenjanlar için geçerlidir.' },
            { q: 'KPSS P93 ve P94 ne zaman kullanılır?', a: 'Öğretmen ataması için kullanılır. P93 lisans öğretmenleri, P94 önlisans öğretmenleri içindir. GK+GY ağırlığını %30, ÖABT (alan bilgisi) ağırlığını %40 olarak içerir.' },
            { q: 'KPSS\'de kaç net yapmalıyım?', a: 'P3\'te 70 puan için yaklaşık GK+GY toplamında 80-85 net hedeflenmelidir. Öğretmen ataması için ÖABT neti belirleyicidir; genellikle 45+ net ve 75+ P93 önerilir.' },
            { q: 'KPSS\'de yanlış cevap net düşürür mü?', a: 'Evet. KPSS\'de her 4 yanlış cevap 1 doğruyu siler (¼ ceza). Bu nedenle kesin bilmediğiniz soruları boş bırakmak tercih edilebilir.' },
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

      <AdBanner slot="footer" size="728x90" />
    </div>
  );
}

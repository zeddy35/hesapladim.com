'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check, AlertTriangle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { tytPuanHesapla } from '@/lib/calculations';

const DERSLER = [
  { key: 'turkce',  label: 'Türkçe',             max: 40, renk: 'blue'   },
  { key: 'mat',     label: 'Temel Matematik',     max: 40, renk: 'purple' },
  { key: 'fen',     label: 'Fen Bilimleri',       max: 20, renk: 'green'  },
  { key: 'sosyal',  label: 'Sosyal Bilimler',     max: 20, renk: 'orange' },
] as const;

type DersKey = typeof DERSLER[number]['key'];

type Girisler = Record<DersKey, { dogru: string; yanlis: string }>;

const BOSLUK: Girisler = {
  turkce: { dogru: '', yanlis: '' },
  mat:    { dogru: '', yanlis: '' },
  fen:    { dogru: '', yanlis: '' },
  sosyal: { dogru: '', yanlis: '' },
};

function renkSinif(puan: number) {
  if (puan >= 250) return 'text-green-600';
  if (puan >= 180) return 'text-yellow-600';
  return 'text-red-600';
}

function bgSinif(puan: number) {
  if (puan >= 250) return 'bg-green-50 border-green-200';
  if (puan >= 180) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

export default function TytForm() {
  const [girisler, setGirisler] = useState<Girisler>(BOSLUK);
  const [kopyalandi, setKopyalandi] = useState(false);

  function guncelle(ders: DersKey, alan: 'dogru' | 'yanlis', deger: string) {
    setGirisler((prev) => ({ ...prev, [ders]: { ...prev[ders], [alan]: deger } }));
  }

  const herBosBir = Object.values(girisler).some((g) => g.dogru !== '' || g.yanlis !== '');

  const g = girisler;
  const sonuc = herBosBir
    ? tytPuanHesapla(
        Number(g.turkce.dogru) || 0, Number(g.turkce.yanlis) || 0,
        Number(g.mat.dogru) || 0,    Number(g.mat.yanlis) || 0,
        Number(g.fen.dogru) || 0,    Number(g.fen.yanlis) || 0,
        Number(g.sosyal.dogru) || 0, Number(g.sosyal.yanlis) || 0,
      )
    : null;

  const paylasMetni = sonuc
    ? `TYT Puanım: ${sonuc.tytPuani} | Toplam Net: ${sonuc.toplamNet} | hesapladim.com/tyt-puan-hesaplama`
    : '';

  const netler: Record<DersKey, number> = sonuc
    ? { turkce: sonuc.netleri.turkce, mat: sonuc.netleri.mat, fen: sonuc.netleri.fen, sosyal: sonuc.netleri.sosyal }
    : { turkce: 0, mat: 0, fen: 0, sosyal: 0 };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">TYT Puan Hesaplama 2024</h1>
      <p className="text-gray-500 mb-8">
        Doğru ve yanlış sayılarınızı girin, net ve tahmini TYT puanınızı anında görün.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-[440px] shrink-0 h-fit">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 pr-3 font-semibold">Ders</th>
                  <th className="text-center py-2 px-2 font-semibold w-20">Doğru</th>
                  <th className="text-center py-2 px-2 font-semibold w-20">Yanlış</th>
                  <th className="text-center py-2 pl-2 font-semibold w-16">Net</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DERSLER.map((ders) => {
                  const d = Number(girisler[ders.key].dogru) || 0;
                  const y = Number(girisler[ders.key].yanlis) || 0;
                  const net = d - y * (ders.key === 'fen' || ders.key === 'sosyal' ? 0.5 : 1);
                  return (
                    <tr key={ders.key} className="hover:bg-gray-50">
                      <td className="py-3 pr-3 font-medium text-gray-800">{ders.label}
                        <span className="text-xs text-gray-400 ml-1">(/{ders.max})</span>
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number" min="0" max={ders.max}
                          value={girisler[ders.key].dogru}
                          onChange={(e) => guncelle(ders.key, 'dogru', e.target.value)}
                          placeholder="0"
                          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 px-2">
                        <input
                          type="number" min="0" max={ders.max}
                          value={girisler[ders.key].yanlis}
                          onChange={(e) => guncelle(ders.key, 'yanlis', e.target.value)}
                          placeholder="0"
                          className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="py-2 pl-2 text-center font-bold">
                        <span className={net < 0 ? 'text-red-500' : 'text-blue-700'}>
                          {(girisler[ders.key].dogru !== '' || girisler[ders.key].yanlis !== '')
                            ? Math.round(net * 100) / 100
                            : '—'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setGirisler(BOSLUK)}
              className="flex-1 py-2 text-sm font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
            >
              Temizle
            </button>
          </div>

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
              {/* Büyük puan */}
              <div className={`rounded-xl border p-5 text-center ${bgSinif(sonuc.tytPuani)}`}>
                <p className="text-sm text-gray-500 mb-1">Tahmini TYT Puanınız</p>
                <p className={`text-6xl font-extrabold ${renkSinif(sonuc.tytPuani)}`}>{sonuc.tytPuani}</p>
                <p className="text-sm text-gray-500 mt-2">Toplam Net: <strong>{sonuc.toplamNet}</strong> / 120</p>
              </div>

              {/* Net dağılımı */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DERSLER.map((ders) => (
                  <div key={ders.key} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500 mb-1">{ders.label}</p>
                    <p className={`text-xl font-bold ${netler[ders.key] < 0 ? 'text-red-500' : 'text-gray-800'}`}>
                      {netler[ders.key]}
                    </p>
                    <p className="text-xs text-gray-400">net</p>
                  </div>
                ))}
              </div>

              {/* Ham puan bilgisi */}
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-800">
                <span className="font-semibold">Ham Puan:</span> {sonuc.hamPuan}
              </div>

              {/* Paylaş */}
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
            { q: 'TYT puanı nasıl hesaplanır?', a: 'TYT ham puanı: 100 (taban) + Türkçe net × 4 + Temel Matematik net × 3 + Fen net × 2 + Sosyal net × 2. Her yanlış, ilgili dersin 1/4\'ü oranında net düşürür.' },
            { q: 'TYT\'de 250 puan iyi midir?', a: '250 puan yaklaşık ilk %10\'a girer. Devlet üniversitelerinin bir kısmına yerleşim için yeterli olmakla birlikte popüler bölümler için 300+ hedeflenmesi önerilir.' },
            { q: 'Yanlış cevap net düşürür mü?', a: 'Evet. TYT\'de her 4 yanlış, 1 doğruyu siler. Türkçe ve Matematikte: 4 yanlış = 1 net eksilme. Fen ve Sosyalde de yanlış başına 0.25 net düşer.' },
            { q: 'Boş bırakmak avantajlı mı?', a: 'Bilinmeyen sorular için boş bırakmak, yanlış yapmaktan daha az risklidir. Ancak emin olmak kaydıyla cevaplamak her zaman daha avantajlıdır.' },
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

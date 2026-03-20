'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Trash2, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { notOrtalamasi, type DersNot } from '@/lib/calculations';

interface SatirDers extends DersNot {
  id: number;
}

let _id = 1;
function yeniId() { return _id++; }

const BOSLUK_SATIR = (): SatirDers => ({ id: yeniId(), ad: '', not: 0, kredi: 3 });

function harfRenk(harf: string) {
  if (['AA', 'BA'].includes(harf)) return 'text-green-600 bg-green-100';
  if (['BB', 'CB'].includes(harf)) return 'text-blue-600 bg-blue-100';
  if (['CC', 'DC'].includes(harf)) return 'text-yellow-700 bg-yellow-100';
  if (harf === 'DD') return 'text-orange-600 bg-orange-100';
  return 'text-red-600 bg-red-100';
}

export default function NotOrtalamasiForm() {
  const [satirlar, setSatirlar] = useState<SatirDers[]>([BOSLUK_SATIR(), BOSLUK_SATIR(), BOSLUK_SATIR()]);
  const [kopyalandi, setKopyalandi] = useState(false);

  function guncelle(id: number, alan: keyof DersNot, deger: string | number) {
    setSatirlar((p) => p.map((s) => s.id === id ? { ...s, [alan]: deger } : s));
  }

  function sil(id: number) {
    setSatirlar((p) => p.filter((s) => s.id !== id));
  }

  function ekle() {
    setSatirlar((p) => [...p, BOSLUK_SATIR()]);
  }

  const gecerli = satirlar.filter((s) => s.kredi > 0 && s.not >= 0 && s.not <= 100);
  const sonuc = gecerli.length > 0 ? notOrtalamasi(gecerli) : null;

  const paylasMetni = sonuc
    ? `Not Ortalaması: ${sonuc.agirlikliOrtalama} (${sonuc.harfNotu}) — GPA 4.0: ${sonuc.gpa4} | hesapladim.com/not-ortalamasi-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Not Ortalaması Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Derslerinizi, notlarınızı ve kredilerini girerek ağırlıklı not ortalamanızı (GNO) ve GPA değerinizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-[500px] shrink-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 pr-2 font-semibold">Ders Adı</th>
                  <th className="text-center py-2 px-2 font-semibold w-20">Not</th>
                  <th className="text-center py-2 px-2 font-semibold w-20">Kredi</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {satirlar.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-2">
                      <input
                        type="text"
                        value={s.ad}
                        onChange={(e) => guncelle(s.id, 'ad', e.target.value)}
                        placeholder="Ders adı (isteğe bağlı)"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number" min="0" max="100"
                        value={s.not || ''}
                        onChange={(e) => guncelle(s.id, 'not', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        type="number" min="1" max="12"
                        value={s.kredi || ''}
                        onChange={(e) => guncelle(s.id, 'kredi', parseFloat(e.target.value) || 0)}
                        placeholder="3"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2 pl-1">
                      <button
                        onClick={() => sil(s.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={ekle}
            className="w-full py-2 text-sm font-semibold bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition inline-flex items-center justify-center gap-1.5"
          >
            <Plus size={15} /> Ders Ekle
          </button>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Ağırlıklı Ortalama</p>
                  <p className="text-3xl font-extrabold text-blue-800">{sonuc.agirlikliOrtalama}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Harf Notu</p>
                  <span className={`text-2xl font-extrabold px-2 py-0.5 rounded-lg ${harfRenk(sonuc.harfNotu)}`}>
                    {sonuc.harfNotu}
                  </span>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">GPA (4.0)</p>
                  <p className="text-3xl font-extrabold text-green-700">{sonuc.gpa4}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between text-sm">
                <span className="text-gray-600">Başarı Durumu</span>
                <span className="font-semibold text-gray-800">{sonuc.basariDurumu}</span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between text-sm">
                <span className="text-gray-600">Toplam Kredi</span>
                <span className="font-semibold text-gray-800">{sonuc.toplamKredi}</span>
              </div>

              {/* Harf notu tablosu */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">Harf Notu Skalası</h3>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { harf: 'AA', aralik: '90–100', gpa: '4.0' },
                    { harf: 'BA', aralik: '85–89',  gpa: '3.5' },
                    { harf: 'BB', aralik: '80–84',  gpa: '3.0' },
                    { harf: 'CB', aralik: '75–79',  gpa: '2.5' },
                    { harf: 'CC', aralik: '70–74',  gpa: '2.0' },
                    { harf: 'DC', aralik: '65–69',  gpa: '1.5' },
                    { harf: 'DD', aralik: '60–64',  gpa: '1.0' },
                    { harf: 'FD', aralik: '50–59',  gpa: '0.5' },
                    { harf: 'FF', aralik: '0–49',   gpa: '0.0' },
                  ].map((r) => (
                    <div key={r.harf} className={`p-2 rounded-lg border text-center ${r.harf === sonuc.harfNotu ? harfRenk(r.harf) + ' border-current' : 'bg-white border-gray-200'}`}>
                      <p className="font-bold">{r.harf}</p>
                      <p className="text-gray-500">{r.aralik}</p>
                      <p className="text-gray-400">{r.gpa}</p>
                    </div>
                  ))}
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

      <AdBanner slot="mid" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'Ağırlıklı not ortalaması nasıl hesaplanır?', a: 'Her ders notu, o dersin kredisiyle çarpılır ve toplamı toplam krediye bölünür. Yüksek kredili dersler ortalamayı daha fazla etkiler.' },
            { q: 'GPA 4.0 ölçeği Türkiye\'de kullanılır mı?', a: 'Evet. YÖK kılavuzuna göre standart harf notu karşılıkları: AA=4.0, BA=3.5, BB=3.0, CB=2.5, CC=2.0, DC=1.5, DD=1.0, FD=0.5, FF=0.0.' },
            { q: 'Onur öğrencisi olmak için kaç not gerekir?', a: 'Çoğu üniversitede 3.0 ve üzeri GPA onur, 3.5 ve üzeri yüksek onur öğrencisi olarak kabul edilir. Üniversiteden üniversiteye farklılık gösterebilir.' },
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

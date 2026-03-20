'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Trash2, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { gpaHesapla, type GpaDers } from '@/lib/calculations';

const HARF_LISTESI = ['AA', 'BA', 'BB', 'CB', 'CC', 'DC', 'DD', 'FD', 'FF'];

const HARF_GPA: Record<string, number> = {
  AA: 4.0, BA: 3.5, BB: 3.0, CB: 2.5,
  CC: 2.0, DC: 1.5, DD: 1.0, FD: 0.5, FF: 0.0,
};

interface SatirDers extends GpaDers {
  id: number;
  ad: string;
}

let _id = 1;
function yeniId() { return _id++; }
const BOSLUK = (): SatirDers => ({ id: yeniId(), ad: '', harf: 'CC', kredi: 3 });

function gpaRenk(gpa: number) {
  if (gpa >= 3.5) return { text: 'text-green-600', bg: 'bg-green-50 border-green-200' };
  if (gpa >= 3.0) return { text: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200'  };
  if (gpa >= 2.0) return { text: 'text-yellow-600',bg: 'bg-yellow-50 border-yellow-200' };
  if (gpa >= 1.0) return { text: 'text-orange-600',bg: 'bg-orange-50 border-orange-200' };
  return { text: 'text-red-600', bg: 'bg-red-50 border-red-200' };
}

export default function GpaForm() {
  const [satirlar, setSatirlar] = useState<SatirDers[]>([BOSLUK(), BOSLUK(), BOSLUK()]);
  const [kopyalandi, setKopyalandi] = useState(false);

  function guncelle(id: number, alan: keyof SatirDers, deger: string | number) {
    setSatirlar((p) => p.map((s) => s.id === id ? { ...s, [alan]: deger } : s));
  }

  function sil(id: number) {
    setSatirlar((p) => p.filter((s) => s.id !== id));
  }

  const gecerli: GpaDers[] = satirlar.filter((s) => s.kredi > 0);
  const sonuc = gecerli.length > 0 ? gpaHesapla(gecerli) : null;
  const renk = sonuc ? gpaRenk(sonuc.gpa4) : null;

  const paylasMetni = sonuc
    ? `GPA 4.0: ${sonuc.gpa4} | 100\'lük: ${sonuc.gpa100} | ${sonuc.basariDurumu} | hesapladim.com/gpa-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">GPA Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        Harf notlarınızı ve kredi saatlerinizi girerek 4.0 ve 100'lük GPA değerinizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-[500px] shrink-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 pr-2 font-semibold">Ders Adı</th>
                  <th className="text-center py-2 px-2 font-semibold w-24">Harf</th>
                  <th className="text-center py-2 px-2 font-semibold w-20">Kredi</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {satirlar.map((s) => (
                  <tr key={s.id}>
                    <td className="py-2 pr-2">
                      <input
                        type="text" value={s.ad}
                        onChange={(e) => guncelle(s.id, 'ad', e.target.value)}
                        placeholder="Ders adı"
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2 px-2">
                      <select
                        value={s.harf}
                        onChange={(e) => guncelle(s.id, 'harf', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      >
                        {HARF_LISTESI.map((h) => (
                          <option key={h} value={h}>{h} ({HARF_GPA[h]})</option>
                        ))}
                      </select>
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
            onClick={() => setSatirlar((p) => [...p, BOSLUK()])}
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

          {sonuc && renk && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-5">
              <div className={`rounded-xl border p-5 text-center ${renk.bg}`}>
                <p className="text-sm text-gray-500 mb-1">GPA (4.0 Ölçeği)</p>
                <p className={`text-6xl font-extrabold ${renk.text}`}>{sonuc.gpa4}</p>
                <p className="text-sm text-gray-500 mt-2">100'lük karşılığı: <strong>{sonuc.gpa100}</strong></p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Mezuniyet Durumu</span>
                <span className={`font-bold text-sm px-3 py-1 rounded-full ${renk.bg} ${renk.text}`}>
                  {sonuc.basariDurumu}
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex justify-between text-sm">
                <span className="text-gray-600">Toplam Kredi</span>
                <span className="font-semibold text-gray-800">{sonuc.toplamKredi}</span>
              </div>

              {/* Harf notu referans tablosu */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 text-sm">GPA Referans Tablosu</h3>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { harf: 'AA', gpa4: '4.0', durum: 'Yüksek Onur' },
                    { harf: 'BA', gpa4: '3.5', durum: 'Onur' },
                    { harf: 'BB', gpa4: '3.0', durum: 'İyi' },
                    { harf: 'CB', gpa4: '2.5', durum: 'Orta-İyi' },
                    { harf: 'CC', gpa4: '2.0', durum: 'Normal' },
                    { harf: 'DC', gpa4: '1.5', durum: 'Orta-Alt' },
                    { harf: 'DD', gpa4: '1.0', durum: 'Geçer' },
                    { harf: 'FD', gpa4: '0.5', durum: 'Koşullu' },
                    { harf: 'FF', gpa4: '0.0', durum: 'Başarısız' },
                  ].map((r) => (
                    <div key={r.harf} className={`p-2 rounded-lg text-center border ${r.harf === satirlar.find(() => true)?.harf ? 'border-blue-300 bg-blue-50' : 'bg-white border-gray-200'}`}>
                      <p className="font-bold text-gray-800">{r.harf}</p>
                      <p className="text-blue-600 font-semibold">{r.gpa4}</p>
                      <p className="text-gray-400 truncate">{r.durum}</p>
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
            { q: 'GPA 4.0 nasıl hesaplanır?', a: 'Her ders için harf notuna karşılık gelen puan (AA=4.0, BA=3.5, BB=3.0 vb.) kredi saatiyle çarpılır. Tüm dersler için bu çarpımlar toplanır ve toplam krediye bölünür.' },
            { q: 'Şeref öğrencisi olmak için GPA nedir?', a: 'Türkiye\'nin büyük çoğunluğunda dönem sonu GPA 3.0+ Onur, 3.5+ Yüksek Onur (Şeref) öğrencisi sayılır. Üniversitenize göre farklılık olabilir.' },
            { q: 'GPA 100\'lük sisteme nasıl çevrilir?', a: 'Yaklaşık dönüşüm: AA≈95, BA≈87, BB≈82, CB≈77, CC≈72, DC≈67, DD≈62, FD≈55, FF≈25. Bu değerler Türkiye\'deki standart üniversite ölçeğine göredir.' },
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

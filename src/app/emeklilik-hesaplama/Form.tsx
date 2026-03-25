'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

// 2026 emeklilik yaş hadleri (5510 SK Geçici Madde 10 & Madde 28 uyarınca)
const EMEKLILIK_TABLOSU = [
  { donem: '1999 öncesi', kadin: { yas: 58, primGun: 7000 }, erkek: { yas: 60, primGun: 7000 } },
  { donem: '1999-2007 arası', kadin: { yas: 58, primGun: 7000 }, erkek: { yas: 60, primGun: 7000 } },
  { donem: '2008-2036 arası', kadin: { yas: 58, primGun: 7200 }, erkek: { yas: 60, primGun: 7200 } },
  { donem: '2036 sonrası', kadin: { yas: 60, primGun: 7200 }, erkek: { yas: 65, primGun: 7200 } },
];

type Cinsiyet = 'kadin' | 'erkek';

function yas(dogumYili: number): number {
  return 2026 - dogumYili;
}

export default function EmeklilikForm() {
  const [dogumYili, setDogumYili] = useState('');
  const [cinsiyet, setCinsiyet] = useState<Cinsiyet>('erkek');
  const [primGun, setPrimGun] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);
  const [hata, setHata] = useState('');

  const yil = parseInputToNumber(dogumYili);
  const gunler = parseInputToNumber(primGun);
  const mevcutYas = yil > 1940 && yil < 2010 ? yas(yil) : null;

  // Giriş yılına göre tablo satırı belirle
  function getRow() {
    if (!yil) return null;
    if (yil < 1999) return EMEKLILIK_TABLOSU[0];
    if (yil < 2008) return EMEKLILIK_TABLOSU[1];
    if (yil < 2036) return EMEKLILIK_TABLOSU[2];
    return EMEKLILIK_TABLOSU[3];
  }

  const row = getRow();
  const gerekliYas = row ? row[cinsiyet].yas : null;
  const gerekliGun = row ? row[cinsiyet].primGun : null;
  const eksikGun = gerekliGun && gunler >= 0 ? Math.max(0, gerekliGun - gunler) : null;
  const yasYeterlimi = mevcutYas !== null && gerekliYas !== null ? mevcutYas >= gerekliYas : null;
  const gunYeterlimi = gerekliGun !== null && gunler > 0 ? gunler >= gerekliGun : null;
  const emekliyeHak = yasYeterlimi && gunYeterlimi;

  function handleDogumYili(v: string) {
    setDogumYili(v);
    const val = parseInputToNumber(v);
    setHata(v && (isNaN(val) || val < 1940 || val > 2005) ? '1940–2005 aralığında bir yıl girin' : '');
  }

  const paylasMetni = mevcutYas !== null && gerekliYas !== null
    ? `Emeklilik Hesaplama → Mevcut Yaş: ${mevcutYas}, Gerekli Yaş: ${gerekliYas}, Prim Günü: ${gunler}/${gerekliGun} → ${emekliyeHak ? 'Emekliliğe hak kazanıldı!' : 'Henüz emekli olunamaz.'} | hesaplayim.com/emeklilik-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Emeklilik Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Doğum yılı, cinsiyet ve prim gün sayısına göre emekliliğe hak kazanıp kazanmadığınızı öğrenin.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Doğum Yılı</label>
          <input
            type="number"
            min="1940"
            max="2005"
            value={dogumYili}
            onChange={(e) => handleDogumYili(e.target.value)}
            placeholder="Örn: 1975"
            className={`w-full border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hata ? 'border-red-500 border-2' : 'border-gray-300'}`}
          />
          {hata && <p className="text-red-500 text-xs mb-2">{hata}</p>}

          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Cinsiyet</label>
          <div className="flex rounded-lg overflow-hidden border border-blue-200 mb-4">
            {(['erkek', 'kadin'] as Cinsiyet[]).map((c) => (
              <button
                key={c}
                onClick={() => setCinsiyet(c)}
                className={`flex-1 py-2 text-sm font-semibold transition ${cinsiyet === c ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
              >
                {c === 'erkek' ? 'Erkek' : 'Kadın'}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Prim Ödeme Gün Sayısı</label>
          <input
            type="number"
            min="0"
            value={primGun}
            onChange={(e) => setPrimGun(e.target.value)}
            placeholder="Örn: 5400"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">SGK hizmet dökümünüzden öğrenebilirsiniz</p>
        </div>

        {/* Sağ: Sidebar Reklam + Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {mevcutYas !== null && gerekliYas !== null && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className={`rounded-xl p-5 mb-6 text-center ${emekliyeHak ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                <p className={`text-2xl font-bold ${emekliyeHak ? 'text-green-700' : 'text-yellow-700'}`}>
                  {emekliyeHak ? 'Emekliliğe hak kazandınız!' : 'Henüz emekli olamazsınız'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Mevcut Yaşınız</p>
                  <p className="text-3xl font-bold text-gray-800">{mevcutYas}</p>
                  <p className={`text-xs mt-1 font-medium ${yasYeterlimi ? 'text-green-600' : 'text-red-500'}`}>
                    Gerekli: {gerekliYas} yaş {yasYeterlimi ? '✓' : `(${gerekliYas - mevcutYas} yıl eksik)`}
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Prim Gün Sayısı</p>
                  <p className="text-3xl font-bold text-blue-700">{gunler > 0 ? formatNumber(gunler) : '—'}</p>
                  {gunler > 0 && (
                    <p className={`text-xs mt-1 font-medium ${gunYeterlimi ? 'text-green-600' : 'text-red-500'}`}>
                      Gerekli: {formatNumber(gerekliGun!)} gün {gunYeterlimi ? '✓' : `(${formatNumber(eksikGun!)} gün eksik)`}
                    </p>
                  )}
                </div>
              </div>

              {paylasMetni && (
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
              )}
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: '2026 emeklilik şartları nelerdir?',
              a: '5510 Sayılı Kanun ve geçici maddelere göre değişmekle birlikte genel kural: 1999 öncesi sigortalılar için kadınlarda 58, erkeklerde 60 yaş; 1999-2007 arası girişlerde aynı yaş hadleri; 2008 sonrası girişlerde kadın 58, erkek 60 yaş ve en az 7.200 prim gün şartı.',
            },
            {
              q: 'Prim günümü nereden öğrenirim?',
              a: "SGK e-Devlet üzerinden 'Hizmet Dökümü' sorgusunu açarak toplam prim ödeme gün sayınızı görebilirsiniz.",
            },
            {
              q: 'Erkenden emeklilik (EYT) nedir?',
              a: "Emeklilikte Yaşa Takılanlar (EYT) düzenlemesi, 1999 öncesinde çalışmaya başlayanlar için yaş şartı olmaksızın kıdem ve prim günü koşulunu karşılayanların emekli olmasına imkan tanımıştır.",
            },
            {
              q: 'İstege bağlı sigorta prim günü emekliliğe sayılır mı?',
              a: 'Evet, isteğe bağlı sigorta primleri hizmet süresine ve prim gün sayısına eklenir. Ancak bazı durumlarda prim gün sayısı hesabı farklılık gösterebilir; SGK ile teyit ediniz.',
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
          <AdBanner slot="footer" />
        </div>
      </section>
    </div>
  );
}

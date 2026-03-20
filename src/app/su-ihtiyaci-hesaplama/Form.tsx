'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check, Droplets } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { suIhtiyaci, type AktiviteSeviyesi, type IklimTipi } from '@/lib/calculations';

const AKTIVITELER: { id: AktiviteSeviyesi; label: string }[] = [
  { id: 'sedanter', label: 'Hareketsiz' },
  { id: 'hafif', label: 'Hafif Aktif' },
  { id: 'orta', label: 'Orta Aktif' },
  { id: 'aktif', label: 'Aktif' },
  { id: 'cokAktif', label: 'Çok Aktif' },
];

const IKLIMLER: { id: IklimTipi; label: string }[] = [
  { id: 'soguk', label: 'Soğuk' },
  { id: 'iliman', label: 'Ilıman' },
  { id: 'sicak', label: 'Sıcak' },
];

export default function SuForm() {
  const [kilo, setKilo] = useState('');
  const [aktivite, setAktivite] = useState<AktiviteSeviyesi>('orta');
  const [iklim, setIklim] = useState<IklimTipi>('iliman');
  const [icdim, setIcdim] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const kiloN = parseFloat(kilo);
  const sonuc = kilo && kiloN > 0 ? suIhtiyaci(kiloN, aktivite, iklim) : null;

  const icdigimdeBardak = parseInt(icdim) || 0;
  const pct = sonuc ? Math.min(100, Math.round((icdigimdeBardak / sonuc.bardakSayisi) * 100)) : 0;

  const paylasMetni = sonuc
    ? `Günlük su ihtiyacım: ${sonuc.gunlukLitre} litre (${sonuc.bardakSayisi} bardak) | hesapladim.com/su-ihtiyaci-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Su İhtiyacı Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Kilonuza, aktivitenize ve iklim koşullarınıza göre günlük su içme miktarınızı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kilo (kg)</label>
          <input
            type="number"
            min="1"
            value={kilo}
            onChange={(e) => setKilo(e.target.value)}
            placeholder="Örn: 70"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">Aktivite Seviyesi</label>
          <div className="grid grid-cols-2 gap-1.5 mb-5">
            {AKTIVITELER.map((a) => (
              <button
                key={a.id}
                onClick={() => setAktivite(a.id)}
                className={`py-2 rounded-lg text-sm font-semibold transition ${aktivite === a.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {a.label}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">İklim</label>
          <div className="flex gap-2">
            {IKLIMLER.map((i) => (
              <button
                key={i.id}
                onClick={() => setIklim(i.id)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${iklim === i.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {i.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <Droplets size={24} className="text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-500 mb-1">Günlük</p>
                  <p className="text-3xl font-bold text-blue-700">{sonuc.gunlukLitre}</p>
                  <p className="text-xs text-gray-400 mt-1">litre</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Bardak (250 ml)</p>
                  <p className="text-3xl font-bold text-cyan-700">{sonuc.bardakSayisi}</p>
                  <p className="text-xs text-gray-400 mt-1">bardak</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">ml</p>
                  <p className="text-3xl font-bold text-gray-700">{sonuc.gunlukMl}</p>
                  <p className="text-xs text-gray-400 mt-1">mililitre</p>
                </div>
              </div>

              {sonuc.sporSonrasiEkMl > 0 && (
                <div className="bg-orange-50 rounded-xl p-3 text-center mb-4 text-sm text-orange-700 font-semibold">
                  Spor sonrası +{sonuc.sporSonrasiEkMl} ml ek su içmeyi unutmayın!
                </div>
              )}

              {/* Takip Progress */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bugün kaç bardak içtiniz?
                </label>
                <input
                  type="number"
                  min="0"
                  value={icdim}
                  onChange={(e) => setIcdim(e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">{pct}% tamamlandı ({icdigimdeBardak}/{sonuc.bardakSayisi} bardak)</p>
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

      <AdBanner slot="mid" />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            { q: 'Günde kaç litre su içmeliyim?', a: 'Genel kural günde 35 ml × vücut ağırlığı (kg)\'dır. 70 kg için yaklaşık 2.5 litre. Aktivite, iklim ve sağlık durumuna göre bu miktar değişir.' },
            { q: 'Sıcak havalarda daha fazla su içmek gerekir mi?', a: 'Evet. Sıcak havada ter yoluyla sıvı kaybı artar. Bu araç sıcak iklim için 500 ml ek su ekler. Yoğun spor sonrasında da ek hidrasyon gerekir.' },
            { q: 'Su içmenin faydaları nelerdir?', a: 'Yeterli su: metabolizmayı hızlandırır, toksinlerin atılımını sağlar, cilt sağlığını korur, konsantrasyonu artırır ve böbrek taşı riskini azaltır.' },
            { q: 'Kahve ve çay su yerine geçer mi?', a: 'Kafeinli içecekler hafif diüretik etkisi nedeniyle su yerine tam geçmez. Bitki çayları ve kafein içermeyen içecekler günlük sıvı alımına katkı sağlar.' },
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

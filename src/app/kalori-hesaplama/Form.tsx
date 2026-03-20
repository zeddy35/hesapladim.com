'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { kaloriHesapla, type AktiviteSeviyesi, type KaloriHedef } from '@/lib/calculations';

const AKTIVITELER: { id: AktiviteSeviyesi; label: string; aciklama: string }[] = [
  { id: 'sedanter', label: 'Hareketsiz', aciklama: 'Masa başı iş, neredeyse egzersiz yok' },
  { id: 'hafif', label: 'Hafif Aktif', aciklama: 'Haftada 1–3 gün hafif egzersiz' },
  { id: 'orta', label: 'Orta Aktif', aciklama: 'Haftada 3–5 gün orta egzersiz' },
  { id: 'aktif', label: 'Aktif', aciklama: 'Haftada 6–7 gün yoğun egzersiz' },
  { id: 'cokAktif', label: 'Çok Aktif', aciklama: 'Günde 2 antrenman veya ağır işçilik' },
];

export default function KaloriForm() {
  const [kilo, setKilo] = useState('');
  const [boy, setBoy] = useState('');
  const [yas, setYas] = useState('');
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kadin'>('erkek');
  const [aktivite, setAktivite] = useState<AktiviteSeviyesi>('orta');
  const [hedef, setHedef] = useState<KaloriHedef>('koru');
  const [kopyalandi, setKopyalandi] = useState(false);

  const kiloN = parseFloat(kilo);
  const boyN = parseFloat(boy);
  const yasN = parseInt(yas);

  const sonuc =
    kilo && boy && yas && kiloN > 0 && boyN > 0 && yasN > 0
      ? kaloriHesapla(kiloN, boyN, yasN, cinsiyet, aktivite, hedef)
      : null;

  const paylasMetni = sonuc
    ? `Günlük kalori ihtiyacım: ${sonuc.tdee} kcal (BMR: ${sonuc.bmr} kcal) | hesapladim.com/kalori-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Kalori Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Harris-Benedict formülüyle günlük kalori ihtiyacınızı (TDEE) ve bazal metabolizma hızınızı (BMR) hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <div className="flex rounded-lg overflow-hidden border border-blue-200 mb-5">
            <button
              onClick={() => setCinsiyet('erkek')}
              className={`flex-1 py-2 text-sm font-semibold transition ${cinsiyet === 'erkek' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              Erkek
            </button>
            <button
              onClick={() => setCinsiyet('kadin')}
              className={`flex-1 py-2 text-sm font-semibold transition ${cinsiyet === 'kadin' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              Kadın
            </button>
          </div>

          {[
            { label: 'Kilo (kg)', val: kilo, set: setKilo, ph: '70' },
            { label: 'Boy (cm)', val: boy, set: setBoy, ph: '175' },
            { label: 'Yaş', val: yas, set: setYas, ph: '30' },
          ].map(({ label, val, set, ph }) => (
            <div key={label} className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
              <input
                type="number"
                min="1"
                value={val}
                onChange={(e) => set(e.target.value)}
                placeholder={`Örn: ${ph}`}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <label className="block text-sm font-semibold text-gray-700 mb-2">Aktivite Seviyesi</label>
          <div className="space-y-1.5 mb-5">
            {AKTIVITELER.map((a) => (
              <button
                key={a.id}
                onClick={() => setAktivite(a.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${aktivite === a.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <span className="font-semibold">{a.label}</span>
                <span className={`text-xs ml-1 ${aktivite === a.id ? 'text-blue-200' : 'text-gray-400'}`}>— {a.aciklama}</span>
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">Hedef</label>
          <div className="flex gap-2">
            {([['ver', 'Kilo Ver'], ['koru', 'Koru'], ['al', 'Kilo Al']] as [KaloriHedef, string][]).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setHedef(id)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition ${hedef === id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {label}
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">BMR (Bazal)</p>
                  <p className="text-3xl font-bold text-blue-700">{sonuc.bmr}</p>
                  <p className="text-xs text-gray-400 mt-1">kcal/gün</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Günlük İhtiyaç</p>
                  <p className="text-3xl font-bold text-green-700">{sonuc.tdee}</p>
                  <p className="text-xs text-gray-400 mt-1">kcal/gün</p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 text-center mb-6">
                <p className="text-sm text-gray-600 mb-1">Hedefiniz için önerilen kalori</p>
                <p className="text-4xl font-bold text-yellow-700">{sonuc.hedefKalori}</p>
                <p className="text-xs text-gray-400 mt-1">kcal/gün</p>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Hedef</th>
                      <th className="p-2 text-right border border-gray-200">Kalori</th>
                      <th className="p-2 text-right border border-gray-200">Açıklama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sonuc.hedefler.map((h) => (
                      <tr key={h.label} className="hover:bg-gray-50">
                        <td className="p-2 border border-gray-200 font-semibold">{h.label}</td>
                        <td className="p-2 border border-gray-200 text-right font-mono">{h.kalori} kcal</td>
                        <td className="p-2 border border-gray-200 text-right text-gray-500 text-xs">{h.aciklama}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            { q: 'BMR nedir?', a: 'BMR (Bazal Metabolizma Hızı), vücudunuzun hiç hareket etmeden, dinlenirken harcadığı minimum enerji miktarıdır. Bu enerji nefes alma, kalp atışı ve hücre yenilenmesi için gereklidir.' },
            { q: 'TDEE nedir?', a: 'TDEE (Toplam Günlük Enerji Harcaması), aktivite seviyenizi de hesaba katarak gerçek günlük kalori ihtiyacınızdır. BMR × Aktivite Çarpanı formülüyle hesaplanır.' },
            { q: 'Kilo vermek için ne kadar kalori almalıyım?', a: 'Genel kural: TDEE\'den 500 kcal eksik almak haftada yaklaşık 0.5 kg vermenizi sağlar. Sağlıklı kilo kaybı için günlük kalori 1200 kcal (kadın) / 1500 kcal (erkek) altına düşürülmemelidir.' },
            { q: 'Harris-Benedict formülü nedir?', a: 'Harris-Benedict, kilo, boy, yaş ve cinsiyete göre BMR hesaplayan bilimsel bir formüldür. Erkek: BMR = 88.36 + (13.4 × kg) + (4.8 × cm) − (5.7 × yaş). Kadın: BMR = 447.6 + (9.2 × kg) + (3.1 × cm) − (4.3 × yaş).' },
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

'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { vkiHesapla } from '@/lib/calculations';

export default function VkiForm() {
  const [kilo, setKilo] = useState('');
  const [boy, setBoy] = useState('');
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kadin'>('erkek');
  const [yas, setYas] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const kiloN = parseFloat(kilo);
  const boyN = parseFloat(boy);
  const yasN = parseInt(yas) || 25;

  const sonuc =
    kilo && boy && kiloN > 0 && boyN > 0
      ? vkiHesapla(kiloN, boyN, cinsiyet, yasN)
      : null;

  const paylasMetni = sonuc
    ? `VKİ: ${sonuc.vki} — ${sonuc.kategori.label} | İdeal kilo: ${sonuc.idealKiloMin}–${sonuc.idealKiloMax} kg | hesapladim.com/vki-hesaplama`
    : '';

  function kopyala() {
    navigator.clipboard.writeText(paylasMetni);
    setKopyalandi(true);
    setTimeout(() => setKopyalandi(false), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">VKİ Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Boy ve kilonuza göre Vücut Kitle İndeksi (BMI) hesaplayın, ideal kilo aralığınızı öğrenin.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          {/* Cinsiyet Toggle */}
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

          <label className="block text-sm font-semibold text-gray-700 mb-1">Kilo (kg)</label>
          <input
            type="number"
            min="1"
            value={kilo}
            onChange={(e) => setKilo(e.target.value)}
            placeholder="Örn: 70"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Boy (cm)</label>
          <input
            type="number"
            min="1"
            value={boy}
            onChange={(e) => setBoy(e.target.value)}
            placeholder="Örn: 175"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Yaş (isteğe bağlı)</label>
          <input
            type="number"
            min="1"
            max="120"
            value={yas}
            onChange={(e) => setYas(e.target.value)}
            placeholder="Örn: 30"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* VKİ Büyük Değer */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">VKİ Değeriniz</p>
                <p className="text-6xl font-extrabold text-blue-800">{sonuc.vki}</p>
                <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold ${sonuc.kategori.bgRenk} ${sonuc.kategori.renk}`}>
                  {sonuc.kategori.label}
                </span>
              </div>

              {/* Gauge Bar */}
              <div className="mb-6">
                <div className="flex h-4 rounded-full overflow-hidden mb-1">
                  <div className="bg-blue-300 flex-1" title="Zayıf" />
                  <div className="bg-green-400 flex-[1.3]" title="Normal" />
                  <div className="bg-yellow-400 flex-1" title="Fazla Kilolu" />
                  <div className="bg-orange-400 flex-1" title="Obez I" />
                  <div className="bg-red-400 flex-1" title="Obez II" />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0</span><span>18.5</span><span>25</span><span>30</span><span>35+</span>
                </div>
                {/* Pointer */}
                <div className="relative h-3 mt-1">
                  <div
                    className="absolute w-3 h-3 bg-blue-800 rounded-full -translate-x-1/2 top-0"
                    style={{ left: `${Math.min(Math.max(((sonuc.vki - 0) / 40) * 100, 2), 98)}%` }}
                  />
                </div>
              </div>

              {/* İdeal Kilo Kutusu */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 text-center">
                <p className="text-sm text-gray-600 mb-1">İdeal kilo aralığınız</p>
                <p className="text-2xl font-bold text-green-700">
                  {sonuc.idealKiloMin} – {sonuc.idealKiloMax} kg
                </p>
                {sonuc.fazlaKilo > 0 && (
                  <p className="text-xs text-orange-600 mt-1">İdeal ağırlığın ~{sonuc.fazlaKilo} kg üzerindesiniz</p>
                )}
                {sonuc.fazlaKilo < 0 && (
                  <p className="text-xs text-blue-600 mt-1">İdeal ağırlığın ~{Math.abs(sonuc.fazlaKilo)} kg altındasınız</p>
                )}
              </div>

              {/* Kategori Tablosu */}
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Kategori</th>
                      <th className="p-2 text-right border border-gray-200">VKİ Aralığı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sonuc.kategoriler.map((k) => (
                      <tr
                        key={k.label}
                        className={k.label === sonuc.kategori.label ? `${k.bgRenk} font-semibold` : 'hover:bg-gray-50'}
                      >
                        <td className={`p-2 border border-gray-200 ${k.renk}`}>{k.label}</td>
                        <td className="p-2 border border-gray-200 text-right">
                          {k.max === Infinity ? `${k.min}+` : `${k.min} – ${k.max}`}
                        </td>
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
                  onClick={kopyala}
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
            { q: 'VKİ nasıl hesaplanır?', a: 'VKİ = Kilo (kg) ÷ Boy² (m). Örneğin 70 kg ve 175 cm için VKİ = 70 ÷ (1.75²) = 22.9. Bu değer 18.5–24.9 arasındaysa normal kilolu sayılırsınız.' },
            { q: 'Normal VKİ değeri nedir?', a: 'Dünya Sağlık Örgütü\'ne göre: 18.5 altı Zayıf, 18.5–24.9 Normal, 25–29.9 Fazla Kilolu, 30–34.9 Obez I, 35 ve üzeri Obez II kategorisindedir.' },
            { q: 'VKİ cinsiyet ve yaşa göre değişir mi?', a: 'Temel VKİ formülü cinsiyet ve yaş gözetmez. Ancak yaşlılarda yağ dağılımı değişir; bu araç genel rehberlik amaçlıdır. Klinik değerlendirme için doktorunuza danışın.' },
            { q: 'İdeal kilo nasıl hesaplanır?', a: 'Bu araç VKİ 18.5–24.9 aralığına karşılık gelen kilo aralığını ideal kilo olarak gösterir. Ayrıca Devine formülüyle cinsiyet bazlı tahmin yapılır.' },
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

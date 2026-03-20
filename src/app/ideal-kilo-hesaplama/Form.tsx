'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MessageCircle, Clipboard, Check } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { idealKilo } from '@/lib/calculations';

export default function IdealKiloForm() {
  const [boy, setBoy] = useState('');
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kadin'>('erkek');
  const [kopyalandi, setKopyalandi] = useState(false);

  const boyN = parseFloat(boy);
  const sonuc = boy && boyN > 0 ? idealKilo(boyN, cinsiyet) : null;

  const paylasMetni = sonuc
    ? `İdeal kilom (${boy} cm, ${cinsiyet === 'erkek' ? 'Erkek' : 'Kadın'}): Ortalama ${sonuc.ortalama} kg (${sonuc.aralik.min}–${sonuc.aralik.max} kg) | hesapladim.com/ideal-kilo-hesaplama`
    : '';

  const formüller = sonuc
    ? [
        { label: 'Devine Formülü', deger: sonuc.devineFormul },
        { label: 'Robinson Formülü', deger: sonuc.robinsonFormul },
        { label: 'Miller Formülü', deger: sonuc.millerFormul },
        { label: 'Hamilton Formülü', deger: sonuc.hamiltonFormul },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">İdeal Kilo Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        4 farklı bilimsel formülle boyunuza göre ideal kilo aralığınızı hesaplayın.
      </p>

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

          <label className="block text-sm font-semibold text-gray-700 mb-1">Boy (cm)</label>
          <input
            type="number"
            min="100"
            max="250"
            value={boy}
            onChange={(e) => setBoy(e.target.value)}
            placeholder="Örn: 175"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="mt-5 bg-blue-50 rounded-xl p-3 text-xs text-blue-700 leading-relaxed">
            VKİ değerinizi de görmek ister misiniz?{' '}
            <Link href="/vki-hesaplama" className="font-bold underline">
              VKİ Hesaplama →
            </Link>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">Ortalama ideal kilonuz</p>
                <p className="text-6xl font-extrabold text-green-600">{sonuc.ortalama}</p>
                <p className="text-lg text-gray-500 font-semibold">kg</p>
                <p className="text-sm text-gray-400 mt-1">Aralık: {sonuc.aralik.min} – {sonuc.aralik.max} kg</p>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Formül</th>
                      <th className="p-2 text-right border border-gray-200">İdeal Kilo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formüller.map((f) => (
                      <tr key={f.label} className="hover:bg-gray-50">
                        <td className="p-2 border border-gray-200">{f.label}</td>
                        <td className="p-2 border border-gray-200 text-right font-mono font-semibold">{f.deger} kg</td>
                      </tr>
                    ))}
                    <tr className="bg-green-50 font-bold">
                      <td className="p-2 border border-gray-200 text-green-700">Ortalama</td>
                      <td className="p-2 border border-gray-200 text-right text-green-700 font-mono">{sonuc.ortalama} kg</td>
                    </tr>
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
            { q: 'İdeal kilo nasıl hesaplanır?', a: 'Birden fazla bilimsel formül vardır. En yaygını Devine formülüdür: Erkek için 50 + 2.3 × (boy (inç) − 60). Farklı formüller biraz farklı sonuç verir; bu araç 4 formülün ortalamasını gösterir.' },
            { q: 'Devine, Robinson, Miller ve Hamilton formülleri arasındaki fark nedir?', a: 'Tüm formüller boy ve cinsiyete göre ideal kilo tahmin eder ancak katsayıları farklıdır. Devine en eski ve en yaygın kullanılandır. Sonuçlar genellikle birbirine yakındır.' },
            { q: 'İdeal kilo boy ile doğru orantılı mıdır?', a: 'Evet, tüm formüllerde boy arttıkça ideal kilo orantılı olarak artar. Türk nüfusu için dünya ortalamasından biraz farklı sonuçlar çıkabilir.' },
            { q: 'İdeal kilo ile VKİ arasındaki ilişki nedir?', a: 'VKİ 18.5–24.9 aralığına karşılık gelen kilolar da ideal kilo aralığı olarak kabul edilir. İdeal kilo formülleri bu aralığa yakın ama tam aynı değildir.' },
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

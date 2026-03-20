'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

function fmt2(n: number) {
  return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(n);
}

interface Category {
  label: string;
  color: string;
  bg: string;
}

function getCategory(bf: number, cinsiyet: 'erkek' | 'kadin'): Category {
  if (cinsiyet === 'erkek') {
    if (bf < 6) return { label: 'Zorunlu Yağ', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' };
    if (bf < 14) return { label: 'Sporcu', color: 'text-green-700', bg: 'bg-green-50 border-green-200' };
    if (bf < 18) return { label: 'Fitness', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    if (bf < 25) return { label: 'Ortalama', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' };
    return { label: 'Obez', color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
  } else {
    if (bf < 14) return { label: 'Zorunlu Yağ', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' };
    if (bf < 21) return { label: 'Sporcu', color: 'text-green-700', bg: 'bg-green-50 border-green-200' };
    if (bf < 25) return { label: 'Fitness', color: 'text-teal-700', bg: 'bg-teal-50 border-teal-200' };
    if (bf < 32) return { label: 'Ortalama', color: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-200' };
    return { label: 'Obez', color: 'text-red-700', bg: 'bg-red-50 border-red-200' };
  }
}

export default function VucutYagForm() {
  const [cinsiyet, setCinsiyet] = useState<'erkek' | 'kadin'>('erkek');
  const [boyunCevresi, setBoyunCevresi] = useState('');
  const [belCevresi, setBelCevresi] = useState('');
  const [kalcaCevresi, setKalcaCevresi] = useState('');
  const [boy, setBoy] = useState('');

  const neck = Number(boyunCevresi.replace(',', '.')) || 0;
  const waist = Number(belCevresi.replace(',', '.')) || 0;
  const hip = Number(kalcaCevresi.replace(',', '.')) || 0;
  const height = Number(boy.replace(',', '.')) || 0;

  let bf: number | null = null;

  if (neck > 0 && waist > 0 && height > 0) {
    if (cinsiyet === 'erkek' && waist > neck) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    } else if (cinsiyet === 'kadin' && hip > 0 && waist + hip > neck) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    }
  }

  const sonuc = bf !== null && bf > 0 && bf < 70 ? bf : null;
  const kategori = sonuc !== null ? getCategory(sonuc, cinsiyet) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Vücut Yağ Oranı Hesaplama</h1>
      <p className="text-gray-500 mb-8">
        ABD Deniz Kuvvetleri (US Navy) formülüyle vücut ölçülerinizden yağ oranınızı ve kategorinizi hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cinsiyet</label>
            <div className="flex rounded-lg overflow-hidden border border-blue-200">
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
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Boyun Çevresi (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={boyunCevresi}
              onChange={(e) => setBoyunCevresi(e.target.value)}
              placeholder="örn: 38"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bel Çevresi (cm)</label>
            <p className="text-xs text-gray-400 mb-1">Göbek deliği hizasından ölçün</p>
            <input
              type="number"
              min="0"
              step="0.1"
              value={belCevresi}
              onChange={(e) => setBelCevresi(e.target.value)}
              placeholder="örn: 85"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {cinsiyet === 'kadin' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Kalça Çevresi (cm)</label>
              <p className="text-xs text-gray-400 mb-1">En geniş noktadan ölçün</p>
              <input
                type="number"
                min="0"
                step="0.1"
                value={kalcaCevresi}
                onChange={(e) => setKalcaCevresi(e.target.value)}
                placeholder="örn: 100"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Boy (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={boy}
              onChange={(e) => setBoy(e.target.value)}
              placeholder="örn: 175"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc !== null && kategori !== null && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-blue-800 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">Vücut Yağ Oranı</p>
                <p className="text-5xl font-extrabold">%{fmt2(sonuc)}</p>
                <p className="text-sm text-blue-200 mt-1">US Navy formülü</p>
              </div>

              <div className={`${kategori.bg} border rounded-xl p-4 text-center`}>
                <p className="text-xs text-gray-500 mb-1">Kategori</p>
                <p className={`text-2xl font-bold ${kategori.color}`}>{kategori.label}</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Kategori</th>
                      <th className="p-2 text-center border border-gray-200">Erkek (%)</th>
                      <th className="p-2 text-center border border-gray-200">Kadın (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: 'Zorunlu Yağ', erkek: '2–5', kadin: '10–13' },
                      { label: 'Sporcu', erkek: '6–13', kadin: '14–20' },
                      { label: 'Fitness', erkek: '14–17', kadin: '21–24' },
                      { label: 'Ortalama', erkek: '18–24', kadin: '25–31' },
                      { label: 'Obez', erkek: '25+', kadin: '32+' },
                    ].map((row) => (
                      <tr key={row.label} className={row.label === kategori.label ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                        <td className="p-2 border border-gray-200">{row.label}</td>
                        <td className="p-2 border border-gray-200 text-center">{row.erkek}</td>
                        <td className="p-2 border border-gray-200 text-center">{row.kadin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" />

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'US Navy formülü nedir?',
              a: 'Erkek için: %Yağ = 495 / (1,0324 − 0,19077 × log10(bel − boyun) + 0,15456 × log10(boy)) − 450. Kadın için kalça ölçüsü de eklenir. Ölçümler santimetre cinsindendir.',
            },
            {
              q: 'Ölçümler nasıl alınmalıdır?',
              a: 'Boyun: Boyun ortasından (larinks altından). Bel: Erkeklerde göbek hizasından, kadınlarda en dar noktadan. Kalça (kadın): En geniş noktadan. Tüm ölçümler nefes tutarak değil, doğal solunumla alınmalıdır.',
            },
            {
              q: 'Bu yöntem ne kadar doğrudur?',
              a: 'US Navy formülü pratik ve uygulaması kolay bir yöntemdir; ancak DEXA veya hidro-densiometri gibi klinik yöntemlere kıyasla ±3-4% hata payı olabilir. Genel sağlık takibi için yeterli bir tahmin sağlar.',
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
      </section>

      <AdBanner slot="footer" />
    </div>
  );
}

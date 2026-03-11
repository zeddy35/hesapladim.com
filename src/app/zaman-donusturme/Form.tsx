'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { zamanDonustur, type ZamanBirimi } from '@/lib/calculations';
import { parseInputToNumber } from '@/lib/formatters';

interface BirimConfig {
  id: ZamanBirimi;
  label: string;
  kisaLabel: string;
}

const BIRIMLER: BirimConfig[] = [
  { id: 'saniye', label: 'Saniye', kisaLabel: 'sn' },
  { id: 'dakika', label: 'Dakika', kisaLabel: 'dk' },
  { id: 'saat', label: 'Saat', kisaLabel: 'sa' },
  { id: 'gun', label: 'Gün', kisaLabel: 'gün' },
  { id: 'hafta', label: 'Hafta', kisaLabel: 'hf' },
  { id: 'ay', label: 'Ay', kisaLabel: 'ay' },
  { id: 'yil', label: 'Yıl', kisaLabel: 'yıl' },
];

function formatSayi(n: number): string {
  if (n >= 1_000_000) return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 }).format(n);
  if (n >= 1) return new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 4 }).format(n);
  return new Intl.NumberFormat('tr-TR', { maximumSignificantDigits: 4 }).format(n);
}

export default function ZamanForm() {
  const [deger, setDeger] = useState('');
  const [kaynak, setKaynak] = useState<ZamanBirimi>('saat');
  const [kopyalandi, setKopyalandi] = useState(false);

  const n = parseInputToNumber(deger);
  const sonuc = deger && n > 0 ? zamanDonustur(n, kaynak) : null;

  // Öne çıkan 3 dönüşüm belirle
  const kaynakIndex = BIRIMLER.findIndex((b) => b.id === kaynak);
  const onemlilar = BIRIMLER.filter((_, i) => i !== kaynakIndex).slice(0, 3);

  const paylasMetni =
    sonuc && deger
      ? `${deger} ${kaynak} = ${formatSayi(sonuc.dakika)} dakika = ${formatSayi(sonuc.saat)} saat = ${formatSayi(sonuc.gun)} gün | hesapladim.com/zaman-donusturme`
      : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Zaman Dönüştürme 2026</h1>
      <p className="text-gray-500 mb-8">
        Saniye, dakika, saat, gün, hafta, ay ve yıl arasında anında zaman dönüştürme.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Değer</label>
          <input
            type="number"
            min="0"
            value={deger}
            onChange={(e) => setDeger(e.target.value)}
            placeholder="Örn: 3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">Kaynak Birim</label>
          <div className="grid grid-cols-2 gap-1.5">
            {BIRIMLER.map((b) => (
              <button
                key={b.id}
                onClick={() => setKaynak(b.id)}
                className={`py-2 rounded-lg text-sm font-semibold transition ${kaynak === b.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* Büyük sonuç (en anlamlı birim) */}
              {(() => {
                const hedef = BIRIMLER.find((b) => b.id !== kaynak && sonuc[b.id] >= 1) ?? BIRIMLER[3];
                return (
                  <div className="bg-green-50 rounded-xl p-4 text-center mb-6">
                    <p className="text-xs text-gray-500 mb-1">
                      {deger} {kaynak} =
                    </p>
                    <p className="text-4xl font-bold text-green-600">
                      {formatSayi(sonuc[hedef.id])} {hedef.kisaLabel}
                    </p>
                  </div>
                );
              })()}

              {/* Tüm birimler tablosu */}
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left border border-gray-200">Birim</th>
                      <th className="p-2 text-right border border-gray-200">Değer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BIRIMLER.map((b) => (
                      <tr
                        key={b.id}
                        className={b.id === kaynak ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}
                      >
                        <td className="p-2 border border-gray-200">
                          {b.label} {b.id === kaynak ? '(giriş)' : ''}
                        </td>
                        <td className="p-2 border border-gray-200 text-right font-mono">
                          {formatSayi(sonuc[b.id])} {b.kisaLabel}
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
            </div>
          )}
        </div>
      </div>

      <AdBanner slot="mid" size="728x90" />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: '1 gün kaç saattir?',
              a: '1 gün = 24 saat = 1.440 dakika = 86.400 saniyedir. Bu araçla herhangi bir zaman değerini tüm birimlere anında dönüştürebilirsiniz.',
            },
            {
              q: '1 yıl kaç gündür?',
              a: 'Standart hesaplamada 1 yıl = 365 gün = 8.760 saat = 525.600 dakika = 31.536.000 saniyedir. Artık yıllarda 366 gün bulunur.',
            },
            {
              q: '1 hafta kaç saattir?',
              a: '1 hafta = 7 gün = 168 saat = 10.080 dakika = 604.800 saniyedir.',
            },
            {
              q: '1 ay kaç gündür?',
              a: 'Bu araçta 1 ay = 30 gün olarak alınmıştır (= 720 saat = 43.200 dakika). Gerçek ay uzunluğu takvim ayına göre 28-31 gün arasında değişir.',
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
          <AdBanner slot="footer" size="336x280" />
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { yuzdeHesapla, type YuzdeMod } from '@/lib/calculations';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

interface ModConfig {
  id: YuzdeMod;
  label: string;
  label1: string;
  label2: string;
  placeholder1: string;
  placeholder2: string;
}

const MODLAR: ModConfig[] = [
  {
    id: 'yuzdeKac',
    label: "Sayının %'si",
    label1: 'Sayı',
    label2: 'Yüzde (%)',
    placeholder1: 'Örn: 150',
    placeholder2: 'Örn: 20',
  },
  {
    id: 'kacYuzde',
    label: 'Yüzde Kaç?',
    label1: 'Sayı (pay)',
    label2: 'Sayı (payda)',
    placeholder1: 'Örn: 30',
    placeholder2: 'Örn: 120',
  },
  {
    id: 'ekle',
    label: 'Yüzde Ekle',
    label1: 'Sayı',
    label2: 'Eklenecek %',
    placeholder1: 'Örn: 500',
    placeholder2: 'Örn: 20',
  },
  {
    id: 'cikar',
    label: 'Yüzde Çıkar',
    label1: 'Sayı',
    label2: 'Çıkarılacak %',
    placeholder1: 'Örn: 500',
    placeholder2: 'Örn: 20',
  },
  {
    id: 'degisim',
    label: 'Değişim %',
    label1: 'Başlangıç',
    label2: 'Bitiş',
    placeholder1: 'Örn: 100',
    placeholder2: 'Örn: 125',
  },
];

export default function YuzdeForm() {
  const [mod, setMod] = useState<YuzdeMod>('yuzdeKac');
  const [sayi1, setSayi1] = useState('');
  const [sayi2, setSayi2] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const s1 = parseInputToNumber(sayi1);
  const s2 = parseInputToNumber(sayi2);
  const sonuc = sayi1 && sayi2 && s1 !== 0 && s2 !== 0 ? yuzdeHesapla(mod, s1, s2) : null;

  const aktifMod = MODLAR.find((m) => m.id === mod)!;

  const paylasMetni = sonuc
    ? `${sonuc.aciklama} = ${formatNumber(sonuc.sonuc)} | hesapladim.com/yuzde-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Yüzde Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        5 farklı yüzde hesaplama modu: sayının yüzdesi, yüzde artış/azalış, iki sayı arası değişim.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          {/* Mod Tabs */}
          <div className="grid grid-cols-2 gap-1 mb-6 bg-gray-100 p-1 rounded-xl sm:grid-cols-3">
            {MODLAR.map((m) => (
              <button
                key={m.id}
                onClick={() => { setMod(m.id); setSayi1(''); setSayi2(''); }}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition ${mod === m.id ? 'bg-blue-800 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {aktifMod.label1}
          </label>
          <input
            type="number"
            value={sayi1}
            onChange={(e) => setSayi1(e.target.value)}
            placeholder={aktifMod.placeholder1}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {aktifMod.label2}
          </label>
          <input
            type="number"
            value={sayi2}
            onChange={(e) => setSayi2(e.target.value)}
            placeholder={aktifMod.placeholder2}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              <p className="text-sm text-gray-500 mb-1">{sonuc.aciklama}</p>
              <p className="text-4xl font-bold text-green-600 mb-4">
                {mod === 'kacYuzde' || mod === 'degisim'
                  ? `%${formatNumber(sonuc.sonuc)}`
                  : formatNumber(sonuc.sonuc)}
              </p>

              {sonuc.formul && (
                <div className="bg-blue-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Formül</p>
                  <p className="text-sm text-blue-800 font-mono">{sonuc.formul}</p>
                </div>
              )}

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

      <AdBanner slot="mid" />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Yüzde nasıl hesaplanır?',
              a: "Bir sayının yüzdesini bulmak için: Sonuç = Sayı × Yüzde ÷ 100. Örnek: 200'nin %25'i = 200 × 25 ÷ 100 = 50. Araç seçilen moda göre formülü otomatik uygular.",
            },
            {
              q: 'Yüzde artış nasıl hesaplanır?',
              a: "Yüzde artış: Yeni Değer = Eski Değer × (1 + Oran ÷ 100). Örnek: 500 ₺'ye %20 zam yapılırsa → 500 × 1.20 = 600 ₺. 'Yüzde Ekle' modunu kullanın.",
            },
            {
              q: 'İki sayı arasındaki yüzde değişim nasıl bulunur?',
              a: "Yüzde Değişim = ((Yeni − Eski) ÷ Eski) × 100. Örnek: 100'den 125'e değişim = ((125−100) ÷ 100) × 100 = %25 artış. Sonuç negatifse azalış demektir.",
            },
            {
              q: 'Bir sayı başka bir sayının yüzde kaçıdır?',
              a: "Oran = (Pay ÷ Payda) × 100. Örnek: 30 sayısı 120'nin yüzde kaçıdır? (30 ÷ 120) × 100 = %25. 'Yüzde Kaç?' modunu seçin.",
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

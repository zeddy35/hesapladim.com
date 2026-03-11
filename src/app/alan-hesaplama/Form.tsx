'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown, Square, RectangleHorizontal, Triangle, Circle, Ellipse } from 'lucide-react';
import AdBanner from '@/components/AdBanner';

type ShapeIconProps = { size?: number | string; strokeWidth?: number | string; className?: string };

function TrapezIkon({ size = 24, strokeWidth = 2, className }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="3,18 21,18 17,6 7,6" />
    </svg>
  );
}

function ParalelkenarIkon({ size = 24, strokeWidth = 2, className }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="3,18 19,18 21,6 5,6" />
    </svg>
  );
}
import { alanHesapla, type Sekil, type AlanSonucu } from '@/lib/calculations';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

interface SekilConfig {
  id: Sekil;
  label: string;
  Ikon: React.FC<ShapeIconProps>;
  alanlar: { key: string; label: string; placeholder: string }[];
}

const SEKILLER: SekilConfig[] = [
  {
    id: 'kare',
    label: 'Kare',
    Ikon: Square,
    alanlar: [{ key: 'a', label: 'Kenar (a)', placeholder: '5' }],
  },
  {
    id: 'dikdortgen',
    label: 'Dikdörtgen',
    Ikon: RectangleHorizontal,
    alanlar: [
      { key: 'a', label: 'Uzun Kenar (a)', placeholder: '8' },
      { key: 'b', label: 'Kısa Kenar (b)', placeholder: '5' },
    ],
  },
  {
    id: 'ucgen',
    label: 'Üçgen',
    Ikon: Triangle,
    alanlar: [
      { key: 'a', label: 'Taban (a)', placeholder: '6' },
      { key: 'h', label: 'Yükseklik (h)', placeholder: '4' },
      { key: 'b', label: 'Kenar b (çevre için)', placeholder: '5' },
      { key: 'c', label: 'Kenar c (çevre için)', placeholder: '5' },
    ],
  },
  {
    id: 'daire',
    label: 'Daire',
    Ikon: Circle,
    alanlar: [{ key: 'r', label: 'Yarıçap (r)', placeholder: '5' }],
  },
  {
    id: 'trapez',
    label: 'Trapez',
    Ikon: TrapezIkon,
    alanlar: [
      { key: 'a', label: 'Üst Taban (a)', placeholder: '4' },
      { key: 'b', label: 'Alt Taban (b)', placeholder: '8' },
      { key: 'h', label: 'Yükseklik (h)', placeholder: '5' },
      { key: 'c', label: 'Yan Kenar c', placeholder: '5.4' },
      { key: 'd', label: 'Yan Kenar d', placeholder: '5.4' },
    ],
  },
  {
    id: 'paralelkenar',
    label: 'Paralelkenar',
    Ikon: ParalelkenarIkon,
    alanlar: [
      { key: 'a', label: 'Taban (a)', placeholder: '8' },
      { key: 'h', label: 'Yükseklik (h)', placeholder: '5' },
      { key: 'b', label: 'Yan Kenar (b)', placeholder: '6' },
    ],
  },
  {
    id: 'elips',
    label: 'Elips',
    Ikon: Ellipse,
    alanlar: [
      { key: 'a', label: 'Büyük Yarı Eksen (a)', placeholder: '8' },
      { key: 'b', label: 'Küçük Yarı Eksen (b)', placeholder: '5' },
    ],
  },
];

const BIRIMLER = ['mm', 'cm', 'm', 'km'];

export default function AlanForm() {
  const [sekil, setSekil] = useState<Sekil>('kare');
  const [degerler, setDegerler] = useState<Record<string, string>>({});
  const [birim, setBirim] = useState('cm');
  const [kopyalandi, setKopyalandi] = useState(false);

  const aktifSekil = SEKILLER.find((s) => s.id === sekil)!;

  function handleDeger(key: string, val: string) {
    setDegerler((prev) => ({ ...prev, [key]: val }));
  }

  function handleSekilDegis(s: Sekil) {
    setSekil(s);
    setDegerler({});
  }

  const olcular: Record<string, number> = Object.fromEntries(
    Object.entries(degerler)
      .filter(([, v]) => v !== '')
      .map(([k, v]) => [k, parseInputToNumber(v)])
  );

  const tamDolduruldu = aktifSekil.alanlar
    .filter((a) => ['a', 'r', 'h', 'b'].includes(a.key))
    .some((a) => (olcular[a.key] ?? 0) > 0);

  const sonuc: AlanSonucu | null = tamDolduruldu
    ? alanHesapla(sekil, olcular, birim)
    : null;

  const paylasMetni = sonuc
    ? `${aktifSekil.label} Alan: ${formatNumber(sonuc.alan)} ${birim}² | Çevre: ${formatNumber(sonuc.cevre)} ${birim} | hesapladim.com/alan-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Alan Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        7 farklı geometrik şekil için alan ve çevre hesaplayın. Formül adım adım gösterilir.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          {/* Şekil Seçici Grid */}
          <label className="block text-sm font-semibold text-gray-700 mb-2">Şekil Seçin</label>
          <div className="grid grid-cols-4 gap-1.5 mb-5">
            {SEKILLER.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSekilDegis(s.id)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl text-xs font-semibold transition gap-1 ${sekil === s.id ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <s.Ikon size={20} strokeWidth={1.75} />
                <span className="text-[10px] leading-none">{s.label}</span>
              </button>
            ))}
          </div>

          {/* Dinamik Inputlar */}
          {aktifSekil.alanlar.map((alan) => (
            <div key={alan.key} className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {alan.label} ({birim})
              </label>
              <input
                type="number"
                min="0"
                value={degerler[alan.key] ?? ''}
                onChange={(e) => handleDeger(alan.key, e.target.value)}
                placeholder={alan.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Birim Seçici */}
          <label className="block text-sm font-semibold text-gray-700 mb-2 mt-4">Birim</label>
          <div className="flex gap-2">
            {BIRIMLER.map((b) => (
              <button
                key={b}
                onClick={() => setBirim(b)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${birim === b ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {b}
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
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Alan</p>
                  <p className="text-4xl font-bold text-green-600">{formatNumber(sonuc.alan)}</p>
                  <p className="text-sm text-gray-500 mt-1">{birim}²</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Çevre</p>
                  <p className="text-4xl font-bold text-blue-700">{formatNumber(sonuc.cevre)}</p>
                  <p className="text-sm text-gray-500 mt-1">{birim}</p>
                </div>
              </div>

              {sonuc.formul && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Formül</p>
                  <p className="text-sm text-gray-800 font-mono leading-relaxed">{sonuc.formul}</p>
                  <p className="text-xs text-gray-500 mt-2">{sonuc.formulAciklama}</p>
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

      <AdBanner slot="mid" size="728x90" />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Dairenin alanı nasıl hesaplanır?',
              a: 'Daire alanı = π × r² formülüyle hesaplanır. r yarıçaptır. Örneğin r = 5 cm için → Alan = π × 5² = π × 25 ≈ 78,54 cm². Çevresi = 2 × π × r ≈ 31,42 cm.',
            },
            {
              q: 'Üçgenin alanı nasıl hesaplanır?',
              a: 'Üçgen alanı = (taban × yükseklik) ÷ 2 formülüyle bulunur. Yükseklik, tabana dik olan uzunluktur. Üç kenara sahipseniz Heron formülünü uygulayabilirsiniz.',
            },
            {
              q: 'Trapezin alanı nasıl hesaplanır?',
              a: 'Trapez alanı = ((a + b) ÷ 2) × h; a ve b paralel kenarlar, h yüksekliktir. Örneğin a=4, b=8, h=5 için → Alan = ((4+8) ÷ 2) × 5 = 30 birim².',
            },
            {
              q: 'Alan birimi dönüşümü nasıl yapılır?',
              a: '1 m² = 10.000 cm² = 1.000.000 mm². 1 km² = 1.000.000 m² = 100 hektar. Bu araçta birim seçerek sonucu otomatik olarak istediğiniz birimde alabilirsiniz.',
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

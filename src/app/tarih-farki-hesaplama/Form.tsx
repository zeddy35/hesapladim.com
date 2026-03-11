'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown, ArrowRight } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { tarihFarki, type TarihFarkiSonucu } from '@/lib/calculations';
import { formatNumber } from '@/lib/formatters';

function bugunStr() {
  return new Date().toISOString().split('T')[0];
}

function gunSonrasi(baslangicStr: string, gun: number): string {
  if (!baslangicStr) return '';
  const d = new Date(baslangicStr);
  d.setDate(d.getDate() + gun);
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function TarihFarkiForm() {
  const [bas, setBas] = useState('');
  const [bit, setBit] = useState('');
  const [ekstraGun, setEkstraGun] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const sonuc: TarihFarkiSonucu | null =
    bas && bit ? tarihFarki(new Date(bas), new Date(bit)) : null;

  const ekstraGunSonucu =
    bas && ekstraGun && parseInt(ekstraGun) > 0
      ? gunSonrasi(bas, parseInt(ekstraGun))
      : null;

  const paylasMetni = sonuc
    ? `Tarih Farkı: ${sonuc.yil} yıl ${sonuc.ay} ay ${sonuc.gun} gün (Toplam: ${sonuc.toplamGun} gün) | hesapladim.com/tarih-farki-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <AdBanner slot="header" size="728x90" />

      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Tarih Farkı Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        İki tarih arasındaki gün, ay, yıl ve hafta farkını anında hesaplayın.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => { setBas(bugunStr()); setBit(bugunStr()); }}
              className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-semibold hover:bg-blue-100 transition"
            >
              Bugünü Kullan
            </button>
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Başlangıç Tarihi</label>
          <input
            type="date"
            value={bas}
            onChange={(e) => setBas(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={bit}
            onChange={(e) => setBit(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <hr className="my-4 border-gray-100" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Başlangıçtan X Gün Sonrası
          </p>
          <div className="flex gap-2">
            <input
              type="number"
              min="1"
              value={ekstraGun}
              onChange={(e) => setEkstraGun(e.target.value)}
              placeholder="Gün sayısı"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {ekstraGunSonucu && (
            <p className="mt-2 text-sm font-semibold text-blue-700 flex items-center gap-1">
              <ArrowRight size={14} /> {ekstraGunSonucu}
            </p>
          )}
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" size="300x250" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* Ana kartlar */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Yıl</p>
                  <p className="text-4xl font-bold text-blue-700">{sonuc.yil}</p>
                </div>
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Ay</p>
                  <p className="text-4xl font-bold text-indigo-700">{sonuc.ay}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Gün</p>
                  <p className="text-4xl font-bold text-green-600">{sonuc.gun}</p>
                </div>
              </div>

              {/* Detay satırı */}
              <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Toplam Hafta</p>
                  <p className="text-xl font-bold text-gray-700">{formatNumber(sonuc.hafta)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Toplam Gün</p>
                  <p className="text-xl font-bold text-gray-700">{formatNumber(sonuc.toplamGun)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Toplam Saat</p>
                  <p className="text-xl font-bold text-gray-700">{formatNumber(sonuc.toplamSaat)}</p>
                </div>
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
              q: 'İki tarih arasındaki gün farkı nasıl hesaplanır?',
              a: 'Başlangıç ve bitiş tarihlerini seçin; araç gün, ay, yıl, hafta, toplam saat ve dakika cinsinden farkı otomatik hesaplar. Sonuçlar her iki yön için de doğrudur.',
            },
            {
              q: 'X gün sonrası hangi tarihe denk gelir?',
              a: "Başlangıç tarihini seçin, 'X Gün Sonrası' alanına gün sayısını yazın. Araç hedef tarihi otomatik hesaplar. Örneğin bugünden 90 gün sonrası için bugünü seçip 90 girin.",
            },
            {
              q: 'İki tarih arasındaki iş günü nasıl hesaplanır?',
              a: 'Bu araç takvim günü hesaplar. İş günü için toplam günden hafta tatillerini (yevmiye × 2/7) ve ulusal tatilleri çıkarmanız gerekir. Resmi tatil sayısı yıldan yıla değişir.',
            },
            {
              q: 'Kaç günde bir yılı doldurur?',
              a: "Artık yıl olmayan yıllarda 365 gün, artık yıllarda 366 gün bulunur. Artık yıl koşulu: 4'e bölünmeli, ancak 100'e bölünememeli ya da 400'e bölünebilmeli. Örn: 2024 artık yıl, 2025 değil.",
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

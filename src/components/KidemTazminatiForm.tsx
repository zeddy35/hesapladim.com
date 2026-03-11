'use client';

import { useState, useEffect, useCallback } from 'react';
import { severanceCalculator, type KidemSonucu } from '@/lib/calculations';
import { formatCurrency, parseInputToNumber, formatCalismaSuresi } from '@/lib/formatters';
import ShareButton from '@/components/ShareButton';

const LS_KEY = 'kidem_son_hesaplama';

interface StoredState {
  girisTarihi: string;
  cikisTarihi: string;
  brutMaasInput: string;
  yemekInput: string;
  yolInput: string;
  ikramiyeInput: string;
}

export default function KidemTazminatiForm() {
  const [girisTarihi, setGirisTarihi] = useState('');
  const [cikisTarihi, setCikisTarihi] = useState('');
  const [brutMaasInput, setBrutMaasInput] = useState('');
  const [yemekInput, setYemekInput] = useState('');
  const [yolInput, setYolInput] = useState('');
  const [ikramiyeInput, setIkramiyeInput] = useState('');
  const [sonuc, setSonuc] = useState<KidemSonucu | null>(null);
  const [hata, setHata] = useState('');

  // LocalStorage'dan son hesaplamayı yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const s: StoredState = JSON.parse(raw);
        setGirisTarihi(s.girisTarihi);
        setCikisTarihi(s.cikisTarihi);
        setBrutMaasInput(s.brutMaasInput);
        setYemekInput(s.yemekInput);
        setYolInput(s.yolInput);
        setIkramiyeInput(s.ikramiyeInput);
      }
    } catch {
      // ignore
    }
  }, []);

  const hesapla = useCallback(() => {
    setHata('');
    if (!girisTarihi || !cikisTarihi) {
      setHata('Lütfen giriş ve çıkış tarihlerini girin.');
      return;
    }
    const giris = new Date(girisTarihi);
    const cikis = new Date(cikisTarihi);
    if (cikis <= giris) {
      setHata('Çıkış tarihi, giriş tarihinden sonra olmalıdır.');
      return;
    }
    const brutMaas = parseInputToNumber(brutMaasInput);
    if (!brutMaas || brutMaas <= 0) {
      setHata('Lütfen geçerli bir brüt maaş girin.');
      return;
    }

    const hesap = severanceCalculator(
      giris,
      cikis,
      brutMaas,
      parseInputToNumber(yemekInput),
      parseInputToNumber(yolInput),
      parseInputToNumber(ikramiyeInput)
    );
    setSonuc(hesap);

    const state: StoredState = {
      girisTarihi, cikisTarihi, brutMaasInput, yemekInput, yolInput, ikramiyeInput,
    };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [girisTarihi, cikisTarihi, brutMaasInput, yemekInput, yolInput, ikramiyeInput]);

  // Enter tuşu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') hesapla();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hesapla]);

  const paylasmMetni = sonuc
    ? `Kıdem Tazminatım: ${formatCurrency(sonuc.tazminatTutari)} (${formatCalismaSuresi(sonuc.calismaGunSayisi)}) | bordrohesapla.com`
    : '';

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-extrabold text-blue-800 mb-2">
        Kıdem Tazminatı Hesaplama 2026
      </h1>
      <p className="text-gray-500 mb-8">
        2026 kıdem tazminatı tavanı (₺64.948,77) esas alınarak hesaplanır.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Sol Panel: Input ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">

          <label className="block text-sm font-semibold text-gray-700 mb-1">İşe Giriş Tarihi</label>
          <input
            type="date"
            value={girisTarihi}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGirisTarihi(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">İşten Çıkış Tarihi</label>
          <input
            type="date"
            value={cikisTarihi}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCikisTarihi(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Son Brüt Maaş (₺)</label>
          <input
            type="text"
            inputMode="decimal"
            value={brutMaasInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrutMaasInput(e.target.value)}
            placeholder="örn: 30.000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Yemek Yardımı (₺/ay)</label>
          <input
            type="text"
            inputMode="decimal"
            value={yemekInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYemekInput(e.target.value)}
            placeholder="örn: 2.000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Yol Yardımı (₺/ay)</label>
          <input
            type="text"
            inputMode="decimal"
            value={yolInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYolInput(e.target.value)}
            placeholder="örn: 1.000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Yıllık İkramiye (₺)</label>
          <input
            type="text"
            inputMode="decimal"
            value={ikramiyeInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIkramiyeInput(e.target.value)}
            placeholder="örn: 30.000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {hata && (
            <div className="bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 mb-4 text-sm">{hata}</div>
          )}

          <button
            onClick={hesapla}
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition text-lg no-print"
          >
            Hesapla
          </button>
        </div>

        {/* ── Sağ Panel: Sonuç ── */}
        {sonuc && (
          <div className="flex-1 space-y-6 print-section">

            {/* Uyarı banner */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex gap-3">
              <span className="text-yellow-600 text-lg">⚠️</span>
              <p className="text-yellow-800 text-sm">
                Bu hesaplama tahmin niteliğindedir. Kesin tutar için insan kaynakları veya hukuk danışmanınızla
                görüşmenizi öneririz.
              </p>
            </div>

            {/* Ana tutar */}
            <div className="bg-blue-800 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-sm font-medium opacity-80 mb-1">Tahmini Kıdem Tazminatı</div>
              <div className="text-5xl font-extrabold tracking-tight">
                {formatCurrency(sonuc.tazminatTutari)}
              </div>
              <div className="mt-2 text-blue-200 text-sm">
                {sonuc.vergidentMuaf ? '✓ Yasal tavan dahilinde vergiden muaftır' : ''}
              </div>
            </div>

            {/* Detay tablosu */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-gray-800 mb-4">Hesap Detayı</h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 text-gray-600">Çalışma Süresi</td>
                    <td className="py-2 text-right font-semibold">
                      {formatCalismaSuresi(sonuc.calismaGunSayisi)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Toplam Gün</td>
                    <td className="py-2 text-right">{sonuc.calismaGunSayisi} gün</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Tam Yıl</td>
                    <td className="py-2 text-right">{sonuc.tamYil} yıl</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Kalan Gün</td>
                    <td className="py-2 text-right">{sonuc.kalanGun} gün</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Günlük Brüt (esas alınan)</td>
                    <td className="py-2 text-right">{formatCurrency(sonuc.gunlukBrut)}</td>
                  </tr>
                  <tr className="border-t-2 border-blue-200">
                    <td className="py-3 font-bold text-blue-800">Toplam Tazminat</td>
                    <td className="py-3 text-right font-bold text-blue-800 text-lg">
                      {formatCurrency(sonuc.tazminatTutari)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paylaş & PDF */}
            <div className="flex gap-3 no-print flex-wrap">
              <ShareButton metin={paylasmMetni} />
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-100 transition"
              >
                🖨️ PDF İndir
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Kıdem tazminatı nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Kıdem tazminatı; son brüt maaş (yemek, yol, ikramiye dahil) günlüğe çevrilerek çalışılan gün sayısıyla çarpılır. Günlük brüt, yasal tavanı aşamaz.',
                },
              },
              {
                '@type': 'Question',
                name: '2026 kıdem tazminatı tavanı nedir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "2026 yılı ilk yarısı için kıdem tazminatı tavanı 64.948,77 TL olarak belirlenmiştir.",
                },
              },
              {
                '@type': 'Question',
                name: 'Kimler kıdem tazminatı alabilir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "4857 sayılı İş Kanunu kapsamında en az 1 yıl çalışmış ve iş sözleşmesi işveren tarafından haksız feshedilmiş, emeklilik, askerlik veya evlilik nedeniyle ayrılan çalışanlar kıdem tazminatına hak kazanır.",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}

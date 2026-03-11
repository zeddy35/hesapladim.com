'use client';

import { useState, useEffect, useCallback } from 'react';
import { grossToNet, netToGross, type MaasHesapSonucu, type MedeniDurum } from '@/lib/calculations';
import { formatCurrency, parseInputToNumber } from '@/lib/formatters';
import SalaryChart from '@/components/SalaryChart';
import ShareButton from '@/components/ShareButton';
import AdBanner from '@/components/AdBanner';

const LS_KEY = 'brutten_nete_son_hesaplama';

interface StoredState {
  mod: 'bruttenNete' | 'nettenBrute';
  maasInput: string;
  medeniDurum: MedeniDurum;
  cocukSayisi: number;
}

export default function BruttenNeteForm() {
  const [mod, setMod] = useState<'bruttenNete' | 'nettenBrute'>('bruttenNete');
  const [maasInput, setMaasInput] = useState('');
  const [medeniDurum, setMedeniDurum] = useState<MedeniDurum>('bekar');
  const [cocukSayisi, setCocukSayisi] = useState(0);
  const [sonuc, setSonuc] = useState<MaasHesapSonucu | null>(null);

  // LocalStorage'dan son hesaplamayı yükle
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const stored: StoredState = JSON.parse(raw);
        setMod(stored.mod);
        setMaasInput(stored.maasInput);
        setMedeniDurum(stored.medeniDurum);
        setCocukSayisi(stored.cocukSayisi);
      }
    } catch {
      // ignore
    }
  }, []);

  const hesapla = useCallback(() => {
    const tutar = parseInputToNumber(maasInput);
    if (!tutar || tutar <= 0) return;

    const hesap =
      mod === 'bruttenNete'
        ? grossToNet(tutar, medeniDurum, cocukSayisi)
        : netToGross(tutar, medeniDurum, cocukSayisi);

    setSonuc(hesap);

    const state: StoredState = { mod, maasInput, medeniDurum, cocukSayisi };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [maasInput, medeniDurum, cocukSayisi, mod]);

  // Enter tuşu
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') hesapla();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [hesapla]);

  const paylasmMetni = sonuc
    ? `Brüt: ${formatCurrency(sonuc.brutMaas)} → Net: ${formatCurrency(sonuc.netMaas)} | bordrohesapla.com`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <AdBanner slot="header" size="728x90" />
      <h1 className="text-3xl font-extrabold text-blue-800 mb-2 mt-4">
        Brütten Nete Maaş Hesaplama 2026
      </h1>
      <p className="text-gray-500 mb-8">
        2026 güncel gelir vergisi dilimleri ve AGİ ile hesaplama. Tüm kesintiler kalem kalem gösterilir.
      </p>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* ── Sol Panel: Input ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">

          {/* Mod seçimi */}
          <div className="flex rounded-lg overflow-hidden border border-blue-200 mb-6">
            <button
              onClick={() => { setMod('bruttenNete'); setSonuc(null); }}
              className={`flex-1 py-2 text-sm font-semibold transition ${mod === 'bruttenNete' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              Brütten → Nete
            </button>
            <button
              onClick={() => { setMod('nettenBrute'); setSonuc(null); }}
              className={`flex-1 py-2 text-sm font-semibold transition ${mod === 'nettenBrute' ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
            >
              Netten → Brüte
            </button>
          </div>

          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {mod === 'bruttenNete' ? 'Brüt Maaş (₺)' : 'Net Maaş (₺)'}
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={maasInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaasInput(e.target.value)}
            placeholder="örn: 30.000"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Medeni Durum</label>
          <select
            value={medeniDurum}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMedeniDurum(e.target.value as MedeniDurum)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bekar">Bekâr</option>
            <option value="evliEsCalisiyor">Evli – Eş Çalışıyor</option>
            <option value="evliEsCalismiyor">Evli – Eş Çalışmıyor</option>
          </select>

          <label className="block text-sm font-semibold text-gray-700 mb-1">Çocuk Sayısı</label>
          <select
            value={cocukSayisi}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCocukSayisi(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0}>0 çocuk</option>
            <option value={1}>1 çocuk</option>
            <option value={2}>2 çocuk</option>
            <option value={3}>3 veya daha fazla</option>
          </select>

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
            <div className="flex justify-center lg:justify-start">
              <AdBanner slot="sidebar" size="300x250" />
            </div>

            {/* Net maaş kartı */}
            <div className="bg-blue-800 text-white rounded-2xl p-6 shadow-lg">
              <div className="text-sm font-medium opacity-80 mb-1">
                {mod === 'bruttenNete' ? 'Net Ele Geçen' : 'Hesaplanan Brüt'}
              </div>
              <div className="text-5xl font-extrabold tracking-tight">
                {formatCurrency(mod === 'bruttenNete' ? sonuc.netMaas : sonuc.brutMaas)}
              </div>
              {mod === 'nettenBrute' && (
                <div className="mt-2 text-blue-200 text-sm">
                  Net Maaş: {formatCurrency(sonuc.netMaas)}
                </div>
              )}
            </div>

            {/* Kesintiler tablosu */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-gray-800 mb-4">Bordro Detayı</h2>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 text-gray-600">Brüt Maaş</td>
                    <td className="py-2 text-right font-semibold">{formatCurrency(sonuc.brutMaas)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">SGK İşçi Payı (%14)</td>
                    <td className="py-2 text-right text-red-600">−{formatCurrency(sonuc.sgkIsciBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">İşsizlik Sigortası (%1)</td>
                    <td className="py-2 text-right text-red-600">−{formatCurrency(sonuc.issizlikIsciBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-500 italic">Gelir Vergisi Matrahı</td>
                    <td className="py-2 text-right italic">{formatCurrency(sonuc.vergiBrut)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Gelir Vergisi</td>
                    <td className="py-2 text-right text-red-600">−{formatCurrency(sonuc.gelirVergisi)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">Damga Vergisi (%0,759)</td>
                    <td className="py-2 text-right text-red-600">−{formatCurrency(sonuc.damgaVergisi)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-gray-600">AGİ (Asgari Geçim İndirimi)</td>
                    <td className="py-2 text-right text-green-600">+{formatCurrency(sonuc.agiTutari)}</td>
                  </tr>
                  <tr className="border-t-2 border-blue-200">
                    <td className="py-3 font-bold text-blue-800">Net Maaş</td>
                    <td className="py-3 text-right font-bold text-blue-800 text-lg">{formatCurrency(sonuc.netMaas)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pasta grafik */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="font-bold text-gray-800 mb-4">Dağılım Grafiği</h2>
              <SalaryChart sonuc={sonuc} />
            </div>

            {/* İşveren maliyeti */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
              <div className="text-sm text-indigo-700 font-medium mb-1">İşverene Toplam Maliyet</div>
              <div className="text-3xl font-extrabold text-indigo-800">
                {formatCurrency(sonuc.toplamIsverenMaliyeti)}
              </div>
              <div className="text-xs text-indigo-500 mt-2">
                SGK işveren (%15,5): {formatCurrency(sonuc.sgkIsverenBrut)} |{' '}
                İşsizlik işveren (%2): {formatCurrency(sonuc.issizlikIsverenBrut)}
              </div>
            </div>

            {/* Paylaş & PDF butonları */}
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

      <AdBanner slot="mid" size="728x90" />

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
                name: 'Brütten nete nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Brüt maaştan SGK işçi payı (%14), işsizlik sigortası (%1) düşülür. Kalan vergi matrahı üzerinden gelir vergisi hesaplanır. Damga vergisi (%0,759) de brütten kesilir. Son olarak AGİ eklenerek net maaş bulunur.',
                },
              },
              {
                '@type': 'Question',
                name: '2026 gelir vergisi dilimleri nelerdir?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "2026 yılı gelir vergisi tarifesine göre yıllık 110.000 TL'ye kadar %15, 230.000 TL'ye kadar %20, 580.000 TL'ye kadar %27, 3.000.000 TL'ye kadar %35, üzeri için %40 oran uygulanır.",
                },
              },
              {
                '@type': 'Question',
                name: 'AGİ nedir, nasıl hesaplanır?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Asgari Geçim İndirimi (AGİ), asgari ücret üzerinden belirlenen kişisel indirim tutarıdır. 2026'da asgari ücret 22.104,67 TL olup bekâr çalışan için aylık AGİ yaklaşık 165,79 TL'dir.",
                },
              },
            ],
          }),
        }}
      />
      <AdBanner slot="footer" size="728x90" />
    </div>
  );
}

'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { formatNumber, parseInputToNumber } from '@/lib/formatters';

type FaizTuru = 'yasal' | 'avans';

const FAIZ_ORANLARI: Record<FaizTuru, { label: string; oran: number }> = {
  yasal: { label: 'Yasal Faiz %9', oran: 9 },
  avans: { label: 'Avans Faizi %14.75', oran: 14.75 },
};

function gunSayisi(baslangic: string, bitis: string): number {
  const b = new Date(baslangic);
  const e = new Date(bitis);
  const diff = e.getTime() - b.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export default function YasalFaizForm() {
  const [anapara, setAnapara] = useState('');
  const [baslangic, setBaslangic] = useState('');
  const [bitis, setBitis] = useState('');
  const [faizTuru, setFaizTuru] = useState<FaizTuru>('yasal');
  const [hata, setHata] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const anaparaVal = parseInputToNumber(anapara);
  const gunler = baslangic && bitis ? gunSayisi(baslangic, bitis) : 0;
  const oran = FAIZ_ORANLARI[faizTuru].oran;

  const faizTutari = anaparaVal > 0 && gunler > 0
    ? anaparaVal * (oran / 100) * (gunler / 365)
    : null;
  const toplam = faizTutari !== null ? anaparaVal + faizTutari : null;

  function handleAnapara(v: string) {
    setAnapara(v);
    const val = parseInputToNumber(v);
    setHata(v && (isNaN(val) || val <= 0) ? 'Geçerli bir tutar girin' : '');
  }

  const paylasMetni = faizTutari !== null
    ? `Yasal Faiz Hesaplama → Anapara: ${formatNumber(anaparaVal)} ₺, ${gunler} gün, ${FAIZ_ORANLARI[faizTuru].label}: Faiz ${formatNumber(faizTutari)} ₺, Toplam ${formatNumber(toplam!)} ₺ | hesaplayim.com/yasal-faiz-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Yasal Faiz Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Alacak ve borçlarınız için güncel yasal faiz ve avans faiz tutarını hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sol: Input Panel */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Anapara (₺)</label>
          <input
            type="number"
            min="0"
            value={anapara}
            onChange={(e) => handleAnapara(e.target.value)}
            placeholder="Örn: 50000"
            className={`w-full border rounded-lg px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${hata ? 'border-red-500 border-2' : 'border-gray-300'}`}
          />
          {hata && <p className="text-red-500 text-xs mb-2">{hata}</p>}

          <label className="block text-sm font-semibold text-gray-700 mb-1 mt-4">Başlangıç Tarihi</label>
          <input
            type="date"
            value={baslangic}
            onChange={(e) => setBaslangic(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1">Bitiş Tarihi</label>
          <input
            type="date"
            value={bitis}
            onChange={(e) => setBitis(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">Faiz Türü</label>
          <div className="flex rounded-lg overflow-hidden border border-blue-200">
            {(Object.keys(FAIZ_ORANLARI) as FaizTuru[]).map((k) => (
              <button
                key={k}
                onClick={() => setFaizTuru(k)}
                className={`flex-1 py-2 text-xs font-semibold transition ${faizTuru === k ? 'bg-blue-800 text-white' : 'bg-white text-blue-800 hover:bg-blue-50'}`}
              >
                {FAIZ_ORANLARI[k].label}
              </button>
            ))}
          </div>
        </div>

        {/* Sağ: Sidebar Reklam + Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {faizTutari !== null && toplam !== null && (
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Gün Sayısı</p>
                  <p className="text-2xl font-bold text-gray-800">{gunler} gün</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Faiz Tutarı ({FAIZ_ORANLARI[faizTuru].label})</p>
                  <p className="text-2xl font-bold text-yellow-700">{formatNumber(faizTutari)} ₺</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Toplam (Anapara + Faiz)</p>
                  <p className="text-4xl font-bold text-green-600">{formatNumber(toplam)} ₺</p>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
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

              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
                <p className="font-semibold text-gray-700 mb-2">Hesaplama Detayı</p>
                <ul className="space-y-1">
                  <li>Anapara: <span className="font-semibold">{formatNumber(anaparaVal)} ₺</span></li>
                  <li>Faiz Oranı: <span className="font-semibold">%{oran}</span></li>
                  <li>Süre: <span className="font-semibold">{gunler} gün</span></li>
                  <li>Formül: {formatNumber(anaparaVal)} × {oran}% × ({gunler}/365) = <span className="font-semibold text-yellow-700">{formatNumber(faizTutari)} ₺</span></li>
                </ul>
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
            {
              q: 'Yasal faiz oranı nedir?',
              a: "3095 Sayılı Kanun'a göre yasal faiz oranı Türkiye Cumhuriyet Merkez Bankası'nın belirlediği oranlara göre değişir. 2024 itibarıyla yıllık %9 olarak uygulanmaktadır; güncel oran için TCMB sitesini kontrol edin.",
            },
            {
              q: 'Avans faizi ile yasal faiz farkı nedir?',
              a: 'Yasal faiz ticari olmayan alacaklarda uygulanır. Avans faizi ise ticari işlemler ve ticaret mahkemelerindeki davalar için kullanılır; oranı yasal faizden yüksektir.',
            },
            {
              q: 'Mahkeme kararında faiz başlangıç tarihi ne zaman?',
              a: 'Genellikle dava açma tarihi veya temerrüt tarihi faizin başlangıcı olarak kabul edilir. Bazı durumlarda faturanın vade tarihi esas alınır.',
            },
            {
              q: 'Bileşik yasal faiz uygulanır mı?',
              a: "Türk hukukunda kural olarak basit faiz uygulanır. Bileşik faiz ancak tarafların açıkça anlaşması veya ticari örf ve adet gerektirdiğinde uygulanabilir.",
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

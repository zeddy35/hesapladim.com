'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { ihbarTazminati } from '@/lib/calculations';
import { formatCurrency } from '@/lib/formatters';

const SURELER = [
  { aralik: '0–6 ay', hafta: 2 },
  { aralik: '6 ay – 1,5 yıl', hafta: 4 },
  { aralik: '1,5 – 3 yıl', hafta: 6 },
  { aralik: '3 yıl+', hafta: 8 },
];

export default function IhbarTazminatiForm() {
  const [girisTarihi, setGirisTarihi] = useState('');
  const [cikisTarihi, setCikisTarihi] = useState('');
  const [brutMaas, setBrutMaas] = useState('');
  const [hata, setHata] = useState('');

  const hesapla = () => {
    setHata('');
    if (!girisTarihi || !cikisTarihi) { setHata('Lütfen her iki tarihi de girin.'); return; }
    const maas = Number(brutMaas.replace(/\./g, '').replace(',', '.')) || 0;
    if (maas <= 0) { setHata('Lütfen geçerli bir brüt maaş girin.'); return; }
    if (new Date(cikisTarihi) <= new Date(girisTarihi)) { setHata('Çıkış tarihi giriş tarihinden sonra olmalıdır.'); return; }
  };

  const giris = girisTarihi ? new Date(girisTarihi) : null;
  const cikis = cikisTarihi ? new Date(cikisTarihi) : null;
  const maas = Number(brutMaas.replace(/\./g, '').replace(',', '.')) || 0;
  const sonuc =
    giris && cikis && cikis > giris && maas > 0
      ? ihbarTazminati(giris, cikis, maas)
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">İhbar Tazminatı Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        İş Kanunu 17. maddeye göre ihbar sürenizi ve tazminat tutarınızı hesaplayın.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Input */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">İşe Giriş Tarihi</label>
            <input type="date" value={girisTarihi} onChange={(e) => setGirisTarihi(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">İşten Çıkış Tarihi</label>
            <input type="date" value={cikisTarihi} onChange={(e) => setCikisTarihi(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Son Brüt Maaş (₺)</label>
            <input type="number" min="0" value={brutMaas} onChange={(e) => setBrutMaas(e.target.value)}
              placeholder="örn: 30.000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {hata && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{hata}</p>}
          <button onClick={hesapla}
            className="w-full bg-blue-800 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition">
            Hesapla
          </button>

          {/* Süre tablosu */}
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">İhbar Süresi Tablosu</p>
            <table className="w-full text-xs">
              <tbody className="divide-y divide-gray-100">
                {SURELER.map((s) => (
                  <tr key={s.aralik} className={sonuc?.ihbarSuresi === s.hafta ? 'bg-blue-50 font-bold text-blue-700' : ''}>
                    <td className="py-1.5 text-gray-600">{s.aralik}</td>
                    <td className="py-1.5 text-right">{s.hafta} hafta</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sonuç */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6 space-y-4">
              <div className="bg-blue-700 text-white rounded-xl p-5 text-center">
                <p className="text-sm opacity-80 mb-1">İhbar Tazminatı</p>
                <p className="text-5xl font-extrabold">{formatCurrency(sonuc.ihbarUcreti)}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 text-center">
                  <p className="text-xs text-gray-500 mb-1">Çalışma Süresi</p>
                  <p className="text-xl font-bold text-gray-800">{sonuc.calismaYili} yıl</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200 text-center">
                  <p className="text-xs text-blue-600 mb-1">İhbar Süresi</p>
                  <p className="text-xl font-bold text-blue-800">{sonuc.ihbarSuresi} hafta</p>
                  <p className="text-xs text-blue-500">({sonuc.ihbarSuresi * 7} gün)</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-2">
                <AlertTriangle size={15} className="shrink-0 mt-0.5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Bu hesaplama tahmini niteliktedir. Kesin tutar için bir avukata danışmanızı öneririz.
                </p>
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
            { q: 'İhbar tazminatı ne zaman ödenir?', a: 'İş sözleşmesi ihbar öneli tanınmadan feshedildiğinde karşı taraf ihbar tazminatı almaya hak kazanır. Hem işveren hem de işçi ihbar tazminatı alabilir ya da ödemek zorunda kalabilir.' },
            { q: 'İşveren ihbar süresini kullandırmak zorunda mı?', a: 'Evet. İşveren ihbar süresini işçiye kullandırmak ya da eşdeğer süre ücretini peşin ödemek zorundadır. Aksi hâlde ihbar tazminatı doğar.' },
            { q: 'İhbar tazminatı kıdem tazminatından farklı mı?', a: 'Evet. Kıdem tazminatı en az 1 yıl çalışma koşuluyla hak kazanılır ve her yıl için bir maaş ödenir. İhbar tazminatı ise iş sözleşmesinin bildirgeli feshedilmemesi durumunda ortaya çıkar.' },
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

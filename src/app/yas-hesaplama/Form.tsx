'use client';

import { useState } from 'react';
import { MessageCircle, Clipboard, Check, ChevronDown, Cake } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import { yasHesapla } from '@/lib/calculations';
import { formatNumber } from '@/lib/formatters';

export default function YasForm() {
  const [dogumTarihi, setDogumTarihi] = useState('');
  const [kopyalandi, setKopyalandi] = useState(false);

  const sonuc =
    dogumTarihi && new Date(dogumTarihi) < new Date()
      ? yasHesapla(new Date(dogumTarihi))
      : null;

  const paylasMetni = sonuc
    ? `${sonuc.yil} yaşındayım! Toplam ${formatNumber(sonuc.toplamGun)} günlük hayat 🎂 | hesapladim.com/yas-hesaplama`
    : '';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-blue-800 mt-6 mb-2">Yaş Hesaplama 2026</h1>
      <p className="text-gray-500 mb-8">
        Doğum tarihinizi girin, yaşınızı gün · ay · yıl cinsinden ve burç bilginizi öğrenin.
      </p>
      <AdBanner slot="header" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Input Panel ── */}
        <div className="bg-white rounded-2xl shadow p-6 lg:w-96 shrink-0 h-fit">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Doğum Tarihi</label>
          <input
            type="date"
            value={dogumTarihi}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDogumTarihi(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {dogumTarihi && new Date(dogumTarihi) >= new Date() && (
            <p className="text-red-500 text-xs mt-1">Doğum tarihi bugünden önce olmalıdır.</p>
          )}
        </div>

        {/* ── Sağ: Sidebar Reklam + Sonuç ── */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-center lg:justify-start">
            <AdBanner slot="sidebar" />
          </div>

          {sonuc && (
            <div className="bg-white rounded-2xl shadow p-6">
              {/* Ana yaş */}
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Kaç yaşındasınız?</p>
                <p className="text-6xl font-extrabold text-green-600">{sonuc.yil}</p>
                <p className="text-lg text-gray-600 font-semibold mt-1">yaşındasınız</p>
              </div>

              {/* Doğum günü banner */}
              {sonuc.sonrakiDogumGunuKacGun === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center mb-6">
                  <p className="text-yellow-800 font-bold text-lg flex items-center justify-center gap-2"><Cake size={20} /> Bugün doğum günün! Kutlu olsun!</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center mb-6">
                  <p className="text-blue-800 font-semibold text-sm flex items-center justify-center gap-2">
                    <Cake size={18} /> Bir sonraki doğum günün{' '}
                    <span className="text-blue-900 font-bold">{sonuc.sonrakiDogumGunuKacGun} gün</span> sonra!
                  </p>
                </div>
              )}

              {/* Kartlar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Ay</p>
                  <p className="text-2xl font-bold text-gray-700">{sonuc.ay}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Gün</p>
                  <p className="text-2xl font-bold text-gray-700">{sonuc.gun}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Toplam Gün</p>
                  <p className="text-lg font-bold text-gray-700">{formatNumber(sonuc.toplamGun)}</p>
                </div>
                <div className="bg-purple-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400 mb-1">Burcunuz</p>
                  <p className="text-2xl">{sonuc.burc.sembol}</p>
                  <p className="text-xs font-semibold text-purple-700">{sonuc.burc.ad}</p>
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

      <AdBanner slot="mid" />

      {/* FAQ */}
      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sık Sorulan Sorular</h2>
        <div className="space-y-3">
          {[
            {
              q: 'Yaş nasıl hesaplanır?',
              a: "Yaş, bugünün yılından doğum yılı çıkarılarak bulunur; doğum günü henüz gelmediyse bir eksiltilir. Bu araç gün-ay-yıl cinsinden tam yaşı, toplam yaşanılan gün sayısını ve sonraki doğum gününe kalan günü otomatik hesaplar.",
            },
            {
              q: 'Burç tarihleri nelerdir?',
              a: 'Koç: 21 Mar–19 Nis | Boğa: 20 Nis–20 May | İkizler: 21 May–20 Haz | Yengeç: 21 Haz–22 Tem | Aslan: 23 Tem–22 Ağu | Başak: 23 Ağu–22 Eyl | Terazi: 23 Eyl–22 Eki | Akrep: 23 Eki–21 Kas | Yay: 22 Kas–21 Ara | Oğlak: 22 Ara–19 Oca | Kova: 20 Oca–18 Şub | Balık: 19 Şub–20 Mar.',
            },
            {
              q: 'Doğum günüme kaç gün kaldı?',
              a: "Doğum tarihinizi girin; araç bir sonraki doğum gününüzün kaç gün sonra olduğunu otomatik gösterir. Doğum gününüz bugünse 'Bugün doğum günün!' mesajı görüntülenir.",
            },
            {
              q: 'Kaç günlük olduğumu nasıl öğrenirim?',
              a: 'Doğum tarihinizi girin; araç (Bugün − Doğum Tarihi) farkını tam gün cinsinden hesaplar. Örneğin 30 yıllık biri yaklaşık 10.950 günlüktür.',
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

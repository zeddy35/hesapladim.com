import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Hesaplayım',
  description: 'Hesaplayım.com gizlilik politikası ve kişisel veri kullanım koşulları.',
  robots: { index: false, follow: false },
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Gizlilik Politikası</h1>
      <p className="text-sm text-slate-400 mb-10">Son güncelleme: Mart 2026</p>

      <div className="prose prose-slate max-w-none space-y-8">

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">1. Toplanan Veriler</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Hesaplayım.com hiçbir kişisel veri toplamaz.</li>
            <li>Tüm hesaplamalar tarayıcınızda gerçekleşir.</li>
            <li>Sunucuya hiçbir hesaplama verisi gönderilmez.</li>
            <li>
              <strong>LocalStorage:</strong> Yalnızca son hesaplamaları hatırlamak için
              kullanılır; kişisel veri içermez.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">2. Çerezler (Cookies)</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li><strong>Google Analytics:</strong> Anonim ziyaretçi istatistikleri.</li>
            <li><strong>Google AdSense:</strong> İlgi alanına dayalı reklamlar.</li>
            <li>Çerezleri tarayıcı ayarlarından istediğiniz zaman devre dışı bırakabilirsiniz.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">3. Google AdSense</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Üçüncü taraf reklam sağlayıcısı olarak Google AdSense kullanılmaktadır.
            Google&apos;ın reklam çerezleri politikası için{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              policies.google.com/technologies/ads
            </a>{' '}
            adresini ziyaret edebilirsiniz. Kişiselleştirilmiş reklamları kapatmak için{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              adssettings.google.com
            </a>{' '}
            adresini kullanabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">4. Google Analytics</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Anonim kullanım verileri toplanır (sayfa görüntüleme, oturum süresi).</li>
            <li>IP adresleri anonimleştirilir.</li>
            <li>Veri saklama süresi: 14 ay.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">5. Üçüncü Taraf Linkler</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Sitemizdeki harici bağlantıların gizlilik politikasından sorumlu değiliz.
            Bu siteleri ziyaret etmeden önce kendi gizlilik politikalarını incelemenizi öneririz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">6. Değişiklikler</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Bu politika, önceden haber verilmeksizin güncellenebilir.
            Güncel versiyon her zaman bu sayfada yayınlanır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">7. İletişim</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Gizlilik politikamıza ilişkin sorularınız için:{' '}
            <a href="mailto:iletisim@hesaplayim.com" className="text-blue-600 underline">
              iletisim@hesaplayim.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}

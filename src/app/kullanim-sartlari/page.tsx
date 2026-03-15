import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları | Hesaplayım',
  description: 'Hesaplayım.com kullanım şartları ve sorumluluk reddi beyanı.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hesaplayim.com/kullanim-sartlari' },
};

export default function KullanimSartlariPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Kullanım Şartları</h1>
      <p className="text-sm text-slate-400 mb-10">Son güncelleme: Mart 2026</p>

      <p className="text-slate-600 text-sm leading-relaxed mb-8">
        Hesaplayım.com, Türkiye'deki kullanıcılara maaş, vergi, sınav puanı ve daha fazlası için
        hızlı hesaplama araçları sunan ücretsiz bir bilgilendirme platformudur. Bu siteyi kullanarak
        aşağıdaki şartları kabul etmiş sayılırsınız.
      </p>

      <div className="prose prose-slate max-w-none space-y-8">

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">1. Hizmetin Amacı</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Hesaplayım.com yalnızca bilgilendirme amaçlıdır.</li>
            <li>Sunulan hesaplamalar yasal danışmanlık, muhasebe veya mali müşavirlik hizmeti niteliği taşımaz.</li>
            <li>Kesin sonuçlar için muhasebeci, mali müşavir veya avukatan destek almanızı öneririz.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">2. Sorumluluk Reddi</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Hesaplamalar, yürürlükteki mevzuata göre hazırlanmıştır; ancak güncellik garantisi verilmez.</li>
            <li>
              Mevzuat değişikliklerinden kaynaklanan hatalı sonuçlardan Hesaplayım.com sorumlu tutulamaz.
            </li>
            <li>Kullanıcılar, önemli kararlarını almadan önce yetkili kurumlara danışmalıdır.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">3. Veri ve Gizlilik</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Tüm hesaplamalar tarayıcınızda gerçekleşir; sunucuya veri gönderilmez.</li>
            <li>Kişisel veri toplanmaz.</li>
            <li>
              Ayrıntılı bilgi için{' '}
              <a href="/gizlilik-politikasi" className="text-blue-600 underline">
                Gizlilik Politikası
              </a>{' '}
              sayfamızı inceleyebilirsiniz.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">4. Reklamlar</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hesaplayım.com, Google AdSense aracılığıyla üçüncü taraf reklamlar gösterebilir.
            Bu reklam sağlayıcıları, ilgi alanına dayalı reklamlar sunmak amacıyla çerezler kullanabilir.
            Daha fazla bilgi için{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google'ın reklam politikasını
            </a>{' '}
            inceleyebilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">5. Fikri Mülkiyet</h2>
          <ul className="space-y-2 text-slate-600 text-sm leading-relaxed list-disc list-inside">
            <li>Sitedeki tasarım, içerik ve yazılımlar site sahibine aittir.</li>
            <li>İzinsiz kopyalanması, çoğaltılması veya ticari amaçla kullanılması yasaktır.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">6. Hizmette Değişiklik</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hesaplayım.com, site içeriğini veya sunulan araçları önceden bildirimde bulunmaksızın
            değiştirme ya da kaldırma hakkını saklı tutar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-700 mb-3">7. İletişim</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Kullanım şartlarına ilişkin sorularınız için:{' '}
            <a href="mailto:iletisim@hesaplayim.com" className="text-blue-600 underline">
              iletisim@hesaplayim.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}

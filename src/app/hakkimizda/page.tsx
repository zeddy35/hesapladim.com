import type { Metadata } from 'next';
import { CheckCircle, Zap, Smartphone, Lock, Gift, BarChart3, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hakkımızda | Hesaplayım',
  description: "Hesaplayım hakkında. Türkiye'nin en hızlı hesaplama platformu.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://hesaplayim.com/hakkimizda' },
};

const features = [
  {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    title: 'Güncel Mevzuat',
    desc: '2026 vergi dilimleri ve yasal parametreler GİB ve ÇSGB kaynaklarından alınmaktadır.',
  },
  {
    icon: Zap,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    title: 'Anlık Hesaplama',
    desc: 'Tüm hesaplamalar tarayıcınızda gerçekleşir. Sunucuya veri gönderilmez.',
  },
  {
    icon: Smartphone,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Mobil Uyumlu',
    desc: 'Her cihazda mükemmel deneyim. Telefon, tablet ve masaüstü için optimize edilmiştir.',
  },
  {
    icon: Lock,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    title: 'Gizlilik',
    desc: 'Kişisel veri toplamıyoruz. Hesaplamalarınız size özel kalır.',
  },
  {
    icon: Gift,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    title: 'Ücretsiz',
    desc: 'Tüm araçlar tamamen ücretsizdir. Kayıt veya abonelik gerekmez.',
  },
  {
    icon: BarChart3,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    title: '30+ Araç',
    desc: 'Maaş, vergi, öğrenci, sağlık ve matematik kategorilerinde araçlar.',
  },
];

const sources = [
  { name: 'Gelir İdaresi Başkanlığı', url: 'https://www.gib.gov.tr' },
  { name: 'Çalışma ve Sosyal Güvenlik Bakanlığı', url: 'https://www.ailevecalisma.gov.tr' },
  { name: 'ÖSYM', url: 'https://www.osym.gov.tr' },
  { name: 'Sosyal Güvenlik Kurumu', url: 'https://www.sgk.gov.tr' },
];

export default function HakkimizdaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-4">Hesaplayım Nedir?</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Türkiye&apos;nin en hızlı, en güncel hesaplama platformu. 30&apos;dan fazla araçla
          maaş, vergi, sınav puanı ve daha fazlasını saniyeler içinde hesaplayın.
        </p>
      </div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center mb-4`}>
                <Icon size={20} className={f.color} />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Legal disclaimer */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 mb-14">
        <h2 className="font-bold text-amber-900 mb-2">⚠️ Önemli Not</h2>
        <p className="text-sm text-amber-800 leading-relaxed">
          Hesaplayım.com&apos;daki tüm hesaplamalar bilgilendirme amaçlıdır. Kesin sonuçlar için
          muhasebeci, mali müşavir veya avukata danışmanızı öneririz. Mevzuat değişikliklerini
          takip ederek hesaplamaları güncellemeye çalışıyoruz, ancak güncellik garantisi vermiyoruz.
        </p>
      </div>

      {/* Data sources */}
      <div>
        <h2 className="text-xl font-bold text-slate-700 mb-5">Kullandığımız Kaynaklar</h2>
        <ul className="space-y-3">
          {sources.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                <ExternalLink size={14} />
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

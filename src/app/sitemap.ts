import { MetadataRoute } from 'next';

const tools: { slug: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']; lastMod: string }[] = [
  // ── Maaş / İşgücü (yıllık mevzuat değişiklikleri) ──────────────────────────
  { slug: 'brutten-nete',              priority: 1.0, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'netten-brute-hesaplama',    priority: 0.9, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'kidem-tazminati',           priority: 1.0, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'ihbar-tazminati-hesaplama', priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'fazla-mesai-hesaplama',     priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'kist-gun-hesaplama',        priority: 0.7, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'isveren-maliyeti-hesaplama',priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  // ── Vergi / Finans ──────────────────────────────────────────────────────────
  { slug: 'kdv-hesaplama',             priority: 0.9, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'damga-vergisi-hesaplama',   priority: 0.7, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'otv-hesaplama',             priority: 0.7, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'tapu-harci-hesaplama',      priority: 0.7, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'mevduat-faiz-hesaplama',    priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'enflasyon-hesaplama',       priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'kira-artis-hesaplama',      priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'kredi-taksit-hesaplama',    priority: 0.9, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'birikim-hesaplama',         priority: 0.8, changeFreq: 'yearly',  lastMod: '2025-01-01' },
  { slug: 'indirim-hesaplama',         priority: 0.8, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'kar-zarar-hesaplama',       priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'kira-getirisi-hesaplama',   priority: 0.7, changeFreq: 'yearly',  lastMod: '2025-01-01' },
  { slug: 'mtv-hesaplama',             priority: 0.8, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'yasal-faiz-hesaplama',      priority: 0.8, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'sgk-prim-hesaplama',        priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  { slug: 'emeklilik-hesaplama',       priority: 0.8, changeFreq: 'monthly', lastMod: '2026-01-01' },
  // ── Sağlık / Beden ─────────────────────────────────────────────────────────
  { slug: 'vki-hesaplama',             priority: 0.8, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'kalori-hesaplama',          priority: 0.8, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'ideal-kilo-hesaplama',      priority: 0.8, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'su-ihtiyaci-hesaplama',     priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'adim-kalori-hesaplama',     priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'gebelik-haftasi-hesaplama', priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'uyku-saati-hesaplama',      priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'vucut-yag-orani-hesaplama', priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  // ── Tarih / Zaman / Matematik ───────────────────────────────────────────────
  { slug: 'yas-hesaplama',             priority: 0.8, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'tarih-farki-hesaplama',     priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'zaman-donusturme',          priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'oran-orantiyi-hesaplama',   priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'alan-hesaplama',            priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'yuzde-hesaplama',           priority: 0.9, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'yakit-maliyeti-hesaplama',  priority: 0.7, changeFreq: 'monthly', lastMod: '2026-01-01' },
  // ── Eğitim / Sınav ─────────────────────────────────────────────────────────
  { slug: 'tyt-puan-hesaplama',        priority: 0.9, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'ayt-puan-hesaplama',        priority: 0.9, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'kpss-puan-hesaplama',       priority: 0.8, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'lgs-puan-hesaplama',        priority: 0.8, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'yks-yuzdelik-dilim',        priority: 0.8, changeFreq: 'yearly',  lastMod: '2026-01-01' },
  { slug: 'not-ortalamasi-hesaplama',  priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
  { slug: 'gpa-hesaplama',             priority: 0.7, changeFreq: 'never',   lastMod: '2025-01-01' },
];

const staticPages = [
  { slug: '',                   priority: 1.0, lastMod: '2026-01-01' },
  { slug: 'hakkimizda',         priority: 0.4, lastMod: '2025-01-01' },
  { slug: 'iletisim',           priority: 0.3, lastMod: '2025-01-01' },
  { slug: 'gizlilik-politikasi',priority: 0.2, lastMod: '2025-01-01' },
  { slug: 'kullanim-sartlari',  priority: 0.2, lastMod: '2025-01-01' },
];

const blogSlugs = [
  { slug: '2026-asgari-ucret-net-maas',       lastMod: '2026-01-01' },
  { slug: 'kidem-tazminati-alma-sartlari',    lastMod: '2025-06-01' },
  { slug: '2026-gelir-vergisi-dilimleri',     lastMod: '2026-01-01' },
  { slug: 'sgk-prim-oranlari-2026',           lastMod: '2026-01-01' },
  { slug: 'yillik-izin-haklari-turkiye',           lastMod: '2025-06-01' },
  { slug: 'mtv-2026-motor-hacmine-gore-vergi',     lastMod: '2026-01-01' },
  { slug: 'emeklilik-sartlari-2026-prim-gun-yas',  lastMod: '2026-01-01' },
  { slug: 'sgk-prim-oranlari-isci-isveren-2026',   lastMod: '2026-01-01' },
  { slug: 'arac-muayene-ucreti-2026-randevu',      lastMod: '2026-01-01' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `https://hesaplayim.com/${tool.slug}`,
    lastModified: new Date(tool.lastMod),
    changeFrequency: tool.changeFreq,
    priority: tool.priority,
  }));

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: p.slug ? `https://hesaplayim.com/${p.slug}` : 'https://hesaplayim.com',
    lastModified: new Date(p.lastMod),
    changeFrequency: 'yearly' as const,
    priority: p.priority,
  }));

  const blogPages: MetadataRoute.Sitemap = [
    {
      url: 'https://hesaplayim.com/blog',
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogSlugs.map((b) => ({
      url: `https://hesaplayim.com/blog/${b.slug}`,
      lastModified: new Date(b.lastMod),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...toolPages, ...blogPages];
}

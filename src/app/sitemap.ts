import { MetadataRoute } from 'next';

const tools: { slug: string; priority: number; changeFreq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { slug: 'brutten-nete', priority: 1.0, changeFreq: 'monthly' },
  { slug: 'kidem-tazminati', priority: 1.0, changeFreq: 'monthly' },
  { slug: 'kdv-hesaplama', priority: 0.9, changeFreq: 'yearly' },
  { slug: 'yuzde-hesaplama', priority: 0.9, changeFreq: 'yearly' },
  { slug: 'tyt-puan-hesaplama', priority: 0.9, changeFreq: 'yearly' },
  { slug: 'ayt-puan-hesaplama', priority: 0.9, changeFreq: 'yearly' },
  { slug: 'kpss-puan-hesaplama', priority: 0.8, changeFreq: 'yearly' },
  { slug: 'kira-artis-hesaplama', priority: 0.8, changeFreq: 'monthly' },
  { slug: 'vki-hesaplama', priority: 0.8, changeFreq: 'never' },
  { slug: 'kalori-hesaplama', priority: 0.8, changeFreq: 'never' },
  { slug: 'ideal-kilo-hesaplama', priority: 0.8, changeFreq: 'never' },
  { slug: 'yas-hesaplama', priority: 0.8, changeFreq: 'never' },
  { slug: 'tarih-farki-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'zaman-donusturme', priority: 0.7, changeFreq: 'never' },
  { slug: 'oran-orantiyi-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'alan-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'adim-kalori-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'su-ihtiyaci-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'gebelik-haftasi-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'uyku-saati-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'fazla-mesai-hesaplama', priority: 0.8, changeFreq: 'monthly' },
  { slug: 'ihbar-tazminati-hesaplama', priority: 0.8, changeFreq: 'monthly' },
  { slug: 'damga-vergisi-hesaplama', priority: 0.7, changeFreq: 'yearly' },
  { slug: 'otv-hesaplama', priority: 0.7, changeFreq: 'yearly' },
  { slug: 'tapu-harci-hesaplama', priority: 0.7, changeFreq: 'yearly' },
  { slug: 'mevduat-faiz-hesaplama', priority: 0.8, changeFreq: 'monthly' },
  { slug: 'not-ortalamasi-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'gpa-hesaplama', priority: 0.7, changeFreq: 'never' },
  { slug: 'yks-yuzdelik-dilim', priority: 0.8, changeFreq: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((tool) => ({
    url: `https://hesaplayim.com/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: tool.changeFreq,
    priority: tool.priority,
  }));

  return [
    {
      url: 'https://hesaplayim.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...toolPages,
  ];
}

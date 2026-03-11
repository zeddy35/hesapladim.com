// Kaynak: GİB (Gelir İdaresi Başkanlığı) 2026 Gelir Vergisi Tarifesi
// Kaynak: ÇSGB (Çalışma ve Sosyal Güvenlik Bakanlığı) 2026 Asgari Ücret ve Kıdem Tazminatı Tavanı

export const ASGARI_UCRET_2026 = 22_104.67; // TL/ay

// Kıdem tazminatı tavanı (01.01.2026 – 30.06.2026 dönemi)
export const KIDEM_TAZMINATI_TAVANI = 64_948.77; // TL/ay

// SGK ve işsizlik primleri (işçi payı)
export const SGK_ISCI_ORANI = 0.14; // %14
export const ISSIZLIK_ISCI_ORANI = 0.01; // %1

// SGK ve işsizlik primleri (işveren payı)
export const SGK_ISVEREN_ORANI = 0.155; // %15,5  (SGK %14,5 + 1 puanlık teşvik sonrası %13,5... standart: %15,5)
export const ISSIZLIK_ISVEREN_ORANI = 0.02; // %2

// Damga vergisi
export const DAMGA_VERGISI_ORANI = 0.00759; // %0,759

// 2026 Gelir Vergisi Dilimleri (yıllık kümülatif matrah üzerinden)
// Kaynak: 7491 sayılı Kanun ve GİB tebliği
export const GELIR_VERGISI_DILIMLERI: Array<{
  tavan: number; // TL (yıllık)
  oran: number;
}> = [
  { tavan: 110_000, oran: 0.15 },
  { tavan: 230_000, oran: 0.20 },
  { tavan: 580_000, oran: 0.27 },
  { tavan: 3_000_000, oran: 0.35 },
  { tavan: Infinity, oran: 0.40 },
];

// AGİ (Asgari Geçim İndirimi) katsayıları (asgari ücret üzerinden)
export const AGI_KATSAYILARI = {
  bekar: 0.50,
  evliEsCalismiyor: 0.60,
  evliEsCalisiyor: 0.50,
  cocuk1: 0.075,
  cocuk2: 0.10,
  cocuk3Arti: 0.15,
} as const;

export const AGI_VERGI_ORANI = 0.15; // AGİ matrahına uygulanan oran

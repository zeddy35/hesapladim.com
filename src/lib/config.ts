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

// ─── ÖSYM / YKS Katsayıları (2024 ÖSYM) ────────────────────────────────────

export const TYT_KATSAYILARI = {
  taban: 100,
  turkce:    { dogru: 4,   yanlis: 1,   soru: 40 },
  temelMat:  { dogru: 3,   yanlis: 1,   soru: 40 },
  fen:       { dogru: 2,   yanlis: 0.5, soru: 20 },
  sosyal:    { dogru: 2,   yanlis: 0.5, soru: 20 },
} as const;

// AYT katsayıları – Sayısal
export const AYT_SAYISAL = {
  mat:        { dogru: 3,   yanlis: 1,   soru: 40 },
  fizik:      { dogru: 3,   yanlis: 1,   soru: 14 },
  kimya:      { dogru: 3,   yanlis: 1,   soru: 13 },
  biyoloji:   { dogru: 3,   yanlis: 1,   soru: 13 },
  taban: 100,
} as const;

// AYT katsayıları – Eşit Ağırlık
export const AYT_EA = {
  mat:        { dogru: 3,   yanlis: 1,   soru: 40 },
  edebiyat:   { dogru: 3,   yanlis: 1,   soru: 24 },
  tarih1:     { dogru: 2,   yanlis: 1,   soru: 10 },
  cografya1:  { dogru: 2,   yanlis: 1,   soru: 6  },
  taban: 100,
} as const;

// AYT katsayıları – Sözel
export const AYT_SOZEL = {
  edebiyat:  { dogru: 3,   yanlis: 1,   soru: 24 },
  tarih1:    { dogru: 3,   yanlis: 1,   soru: 10 },
  cografya1: { dogru: 2,   yanlis: 1,   soru: 6  },
  tarih2:    { dogru: 2,   yanlis: 1,   soru: 11 },
  cografya2: { dogru: 2,   yanlis: 1,   soru: 11 },
  felsefe:   { dogru: 2,   yanlis: 1,   soru: 12 },
  din:       { dogru: 2,   yanlis: 1,   soru: 6  },
  taban: 100,
} as const;

// AYT katsayıları – Dil (YDT)
export const AYT_DIL = {
  ydt:   { dogru: 3,   yanlis: 1,   soru: 80 },
  taban: 100,
} as const;

// YKS yüzdelik dilim referans tablosu (2024 ÖSYM verilerine göre yaklaşık değerler)
// puan → { yuzdelik: tahmini yüzdelik, siralama: tahmini sıra (2.5M katılımcı bazında) }
export const TYT_YUZDELIK_TABLOSU: Array<{ puanAlt: number; puanUst: number; yuzdelik: number }> = [
  { puanAlt: 390, puanUst: 400, yuzdelik: 0.01 },
  { puanAlt: 360, puanUst: 390, yuzdelik: 0.1  },
  { puanAlt: 340, puanUst: 360, yuzdelik: 0.5  },
  { puanAlt: 320, puanUst: 340, yuzdelik: 1    },
  { puanAlt: 300, puanUst: 320, yuzdelik: 2    },
  { puanAlt: 280, puanUst: 300, yuzdelik: 4    },
  { puanAlt: 260, puanUst: 280, yuzdelik: 7    },
  { puanAlt: 250, puanUst: 260, yuzdelik: 10   },
  { puanAlt: 240, puanUst: 250, yuzdelik: 14   },
  { puanAlt: 230, puanUst: 240, yuzdelik: 19   },
  { puanAlt: 220, puanUst: 230, yuzdelik: 25   },
  { puanAlt: 210, puanUst: 220, yuzdelik: 32   },
  { puanAlt: 200, puanUst: 210, yuzdelik: 40   },
  { puanAlt: 190, puanUst: 200, yuzdelik: 50   },
  { puanAlt: 180, puanUst: 190, yuzdelik: 60   },
  { puanAlt: 170, puanUst: 180, yuzdelik: 70   },
  { puanAlt: 160, puanUst: 170, yuzdelik: 79   },
  { puanAlt: 150, puanUst: 160, yuzdelik: 86   },
  { puanAlt: 140, puanUst: 150, yuzdelik: 91   },
  { puanAlt: 130, puanUst: 140, yuzdelik: 95   },
  { puanAlt: 100, puanUst: 130, yuzdelik: 99   },
];

export const AYT_YUZDELIK_TABLOSU: Record<'SAY' | 'EA' | 'SOZ' | 'DIL', Array<{ puanAlt: number; puanUst: number; yuzdelik: number }>> = {
  SAY: [
    { puanAlt: 490, puanUst: 500, yuzdelik: 0.01 },
    { puanAlt: 460, puanUst: 490, yuzdelik: 0.1  },
    { puanAlt: 430, puanUst: 460, yuzdelik: 0.5  },
    { puanAlt: 400, puanUst: 430, yuzdelik: 1    },
    { puanAlt: 370, puanUst: 400, yuzdelik: 2    },
    { puanAlt: 340, puanUst: 370, yuzdelik: 4    },
    { puanAlt: 310, puanUst: 340, yuzdelik: 8    },
    { puanAlt: 280, puanUst: 310, yuzdelik: 15   },
    { puanAlt: 250, puanUst: 280, yuzdelik: 25   },
    { puanAlt: 220, puanUst: 250, yuzdelik: 40   },
    { puanAlt: 200, puanUst: 220, yuzdelik: 55   },
    { puanAlt: 180, puanUst: 200, yuzdelik: 70   },
    { puanAlt: 100, puanUst: 180, yuzdelik: 90   },
  ],
  EA: [
    { puanAlt: 490, puanUst: 500, yuzdelik: 0.01 },
    { puanAlt: 450, puanUst: 490, yuzdelik: 0.1  },
    { puanAlt: 420, puanUst: 450, yuzdelik: 0.5  },
    { puanAlt: 390, puanUst: 420, yuzdelik: 1    },
    { puanAlt: 360, puanUst: 390, yuzdelik: 2    },
    { puanAlt: 330, puanUst: 360, yuzdelik: 5    },
    { puanAlt: 300, puanUst: 330, yuzdelik: 10   },
    { puanAlt: 270, puanUst: 300, yuzdelik: 20   },
    { puanAlt: 240, puanUst: 270, yuzdelik: 35   },
    { puanAlt: 210, puanUst: 240, yuzdelik: 55   },
    { puanAlt: 180, puanUst: 210, yuzdelik: 75   },
    { puanAlt: 100, puanUst: 180, yuzdelik: 92   },
  ],
  SOZ: [
    { puanAlt: 490, puanUst: 500, yuzdelik: 0.01 },
    { puanAlt: 440, puanUst: 490, yuzdelik: 0.1  },
    { puanAlt: 410, puanUst: 440, yuzdelik: 0.5  },
    { puanAlt: 380, puanUst: 410, yuzdelik: 1    },
    { puanAlt: 350, puanUst: 380, yuzdelik: 3    },
    { puanAlt: 320, puanUst: 350, yuzdelik: 7    },
    { puanAlt: 290, puanUst: 320, yuzdelik: 15   },
    { puanAlt: 260, puanUst: 290, yuzdelik: 28   },
    { puanAlt: 230, puanUst: 260, yuzdelik: 45   },
    { puanAlt: 200, puanUst: 230, yuzdelik: 65   },
    { puanAlt: 100, puanUst: 200, yuzdelik: 90   },
  ],
  DIL: [
    { puanAlt: 490, puanUst: 500, yuzdelik: 0.01 },
    { puanAlt: 440, puanUst: 490, yuzdelik: 0.1  },
    { puanAlt: 400, puanUst: 440, yuzdelik: 0.5  },
    { puanAlt: 360, puanUst: 400, yuzdelik: 1    },
    { puanAlt: 320, puanUst: 360, yuzdelik: 3    },
    { puanAlt: 280, puanUst: 320, yuzdelik: 8    },
    { puanAlt: 240, puanUst: 280, yuzdelik: 18   },
    { puanAlt: 200, puanUst: 240, yuzdelik: 35   },
    { puanAlt: 160, puanUst: 200, yuzdelik: 60   },
    { puanAlt: 100, puanUst: 160, yuzdelik: 85   },
  ],
};

// Harf notu tablosu (üniversite)
export const HARF_NOTU_TABLOSU: Array<{ min: number; maks: number; harf: string; gpa4: number }> = [
  { min: 90, maks: 100, harf: 'AA', gpa4: 4.0 },
  { min: 85, maks: 89,  harf: 'BA', gpa4: 3.5 },
  { min: 80, maks: 84,  harf: 'BB', gpa4: 3.0 },
  { min: 75, maks: 79,  harf: 'CB', gpa4: 2.5 },
  { min: 70, maks: 74,  harf: 'CC', gpa4: 2.0 },
  { min: 65, maks: 69,  harf: 'DC', gpa4: 1.5 },
  { min: 60, maks: 64,  harf: 'DD', gpa4: 1.0 },
  { min: 50, maks: 59,  harf: 'FD', gpa4: 0.5 },
  { min: 0,  maks: 49,  harf: 'FF', gpa4: 0.0 },
];

// KPSS katsayıları (ÖSYM 2024)
export const KPSS_KATSAYILARI = {
  gk: { dogru: 1, yanlis: 0.25, soru: 60 },
  gy: { dogru: 1, yanlis: 0.25, soru: 60 },
  alan: { dogru: 1, yanlis: 0.25, soru: 60 },
  // P3 (Lisans): 0.3×GK + 0.3×GY ortalaması → KPSS P3
  // P10 (Önlisans): 0.3×GK + 0.3×GY
  // P93/P94 (ÖABT): 0.3×GK + 0.3×GY + 0.4×ÖABT
  p3Carpan:  { gkgy: 0.7 },   // ham net / soru sayısı × 100 × carpan
  p10Carpan: { gkgy: 0.7 },
  p93Carpan: { gkgy: 0.3, alan: 0.4 },
  p94Carpan: { gkgy: 0.3, alan: 0.4 },
} as const;

// ─── Kira Artış Tavanı (2026) ────────────────────────────────────────────────
// TÜİK TÜFE 12 aylık ortalama değişim oranı (Ocak 2026 verisi)
export const KIRA_ARTIS_TAVAN_2026 = 28.82; // % (yüzde)

// ─── Mevduat Faiz Stopaj Oranı ────────────────────────────────────────────────
export const MEVDUAT_STOPAJ_ORANI = 0.15; // %15

// ─── Damga Vergisi – Belge Türü Oranları ─────────────────────────────────────
// Kaynak: 488 sayılı Damga Vergisi Kanunu, 2026 geçerli oranlar
export const DAMGA_VERGISI_BELGE_ORANLARI: Record<string, { oran: number; etiket: string }> = {
  kiraKontrati:   { oran: 0.00189, etiket: 'Kira Kontratı' },
  maasBordrosu:   { oran: 0.00759, etiket: 'Maaş Bordrosu' },
  sozlesme:       { oran: 0.00948, etiket: 'Sözleşme' },
  ihaleKarari:    { oran: 0.00569, etiket: 'İhale Kararı' },
  teminatMektubu: { oran: 0.00948, etiket: 'Teminat Mektubu' },
};

// ─── Tapu Harcı Oranları (2026) ──────────────────────────────────────────────
// Kaynak: 492 sayılı Harçlar Kanunu
export const TAPU_HARCI_ORANLARI = {
  satis:  { alici: 0.02,    satici: 0.02   }, // Her iki taraf ayrı ayrı %2
  bagis:  { alici: 0.03,    satici: 0      }, // Sadece alan taraf %3
  ipotek: { alici: 0.00455, satici: 0      }, // Sadece borçlu binde 4,55
} as const;

// ─── ÖTV Oranları (2026) ─────────────────────────────────────────────────────
// Kaynak: 4760 sayılı ÖTV Kanunu, II sayılı liste (binek taşıtlar)
export const OTV_ORANLARI: Record<string, { etiket: string; oran: number }> = {
  elektrikli:  { etiket: 'Elektrikli', oran: 0.10  },
  cc1600alt:   { etiket: '0–1600 cc',  oran: 0.45  },
  cc1601_2000: { etiket: '1601–2000 cc', oran: 1.45 },
  cc2001ust:   { etiket: '2001 cc+',   oran: 2.20  },
};

export const KDV_ORANI_ARAC = 0.20; // Araçlarda KDV %20

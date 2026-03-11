import {
  ASGARI_UCRET_2026,
  KIDEM_TAZMINATI_TAVANI,
  SGK_ISCI_ORANI,
  ISSIZLIK_ISCI_ORANI,
  SGK_ISVEREN_ORANI,
  ISSIZLIK_ISVEREN_ORANI,
  DAMGA_VERGISI_ORANI,
  GELIR_VERGISI_DILIMLERI,
  AGI_KATSAYILARI,
  AGI_VERGI_ORANI,
} from './config';

export type MedeniDurum = 'bekar' | 'evliEsCalisiyor' | 'evliEsCalismiyor';

export interface MaasHesapSonucu {
  brutMaas: number;
  sgkIsciBrut: number;
  issizlikIsciBrut: number;
  vergiBrut: number;
  gelirVergisi: number;
  damgaVergisi: number;
  agiTutari: number;
  netMaas: number;
  sgkIsverenBrut: number;
  issizlikIsverenBrut: number;
  toplamIsverenMaliyeti: number;
}

export interface KidemSonucu {
  calismaGunSayisi: number;
  tamYil: number;
  kalanGun: number;
  gunlukBrut: number;
  tazminatTutari: number;
  vergidentMuaf: boolean;
}

// ─── Yardımcı: aylık gelir vergisi hesabı (kümülatif dilim yöntemi) ─────────
// Not: Türkiye uygulamasında vergi yıllık kümülatif matrah üzerinden hesaplanır.
// Basitleştirilmiş tek aylık hesaplama: aylık matrahı 12 ile çarp, vergiyi hesapla, 12'ye böl.
function aylikGelirVergisi(aylikMatrah: number): number {
  const yillikMatrah = aylikMatrah * 12;
  let yillikVergi = 0;
  let oncekiTavan = 0;

  for (const dilim of GELIR_VERGISI_DILIMLERI) {
    if (yillikMatrah <= oncekiTavan) break;
    const dilimMatrahi = Math.min(yillikMatrah, dilim.tavan) - oncekiTavan;
    yillikVergi += dilimMatrahi * dilim.oran;
    oncekiTavan = dilim.tavan;
    if (dilim.tavan === Infinity) break;
  }

  return yillikVergi / 12;
}

// ─── Yardımcı: AGİ hesabı ───────────────────────────────────────────────────
function hesaplaAgi(medeniDurum: MedeniDurum, cocukSayisi: number): number {
  let katsayi = 0;

  if (medeniDurum === 'bekar' || medeniDurum === 'evliEsCalisiyor') {
    katsayi += AGI_KATSAYILARI.bekar;
  } else {
    katsayi += AGI_KATSAYILARI.evliEsCalismiyor;
  }

  if (cocukSayisi === 1) {
    katsayi += AGI_KATSAYILARI.cocuk1;
  } else if (cocukSayisi === 2) {
    katsayi += AGI_KATSAYILARI.cocuk1 + AGI_KATSAYILARI.cocuk2;
  } else if (cocukSayisi >= 3) {
    katsayi += AGI_KATSAYILARI.cocuk1 + AGI_KATSAYILARI.cocuk2 + AGI_KATSAYILARI.cocuk3Arti;
  }

  return ASGARI_UCRET_2026 * katsayi * AGI_VERGI_ORANI;
}

// ─── 1. Brütten Nete ────────────────────────────────────────────────────────
export function grossToNet(
  brutMaas: number,
  medeniDurum: MedeniDurum,
  cocukSayisi: number
): MaasHesapSonucu {
  const sgkIsciBrut = brutMaas * SGK_ISCI_ORANI;
  const issizlikIsciBrut = brutMaas * ISSIZLIK_ISCI_ORANI;
  const vergiBrut = brutMaas - sgkIsciBrut - issizlikIsciBrut;

  const gelirVergisi = aylikGelirVergisi(vergiBrut);
  const damgaVergisi = brutMaas * DAMGA_VERGISI_ORANI;
  const agiTutari = hesaplaAgi(medeniDurum, cocukSayisi);

  const netMaas = vergiBrut - gelirVergisi - damgaVergisi + agiTutari;

  const sgkIsverenBrut = brutMaas * SGK_ISVEREN_ORANI;
  const issizlikIsverenBrut = brutMaas * ISSIZLIK_ISVEREN_ORANI;
  const toplamIsverenMaliyeti = brutMaas + sgkIsverenBrut + issizlikIsverenBrut;

  return {
    brutMaas,
    sgkIsciBrut,
    issizlikIsciBrut,
    vergiBrut,
    gelirVergisi,
    damgaVergisi,
    agiTutari,
    netMaas,
    sgkIsverenBrut,
    issizlikIsverenBrut,
    toplamIsverenMaliyeti,
  };
}

// ─── 2. Netten Brüte (binary search) ────────────────────────────────────────
export function netToGross(
  hedefNet: number,
  medeniDurum: MedeniDurum,
  cocukSayisi: number
): MaasHesapSonucu {
  let alt = hedefNet;
  let ust = hedefNet * 2;
  const HASSASIYET = 0.01;
  const MAX_ITER = 100;

  // Üst sınırı büyüt (çok yüksek brütler için)
  while (grossToNet(ust, medeniDurum, cocukSayisi).netMaas < hedefNet) {
    ust *= 2;
  }

  for (let i = 0; i < MAX_ITER; i++) {
    const orta = (alt + ust) / 2;
    const hesaplananNet = grossToNet(orta, medeniDurum, cocukSayisi).netMaas;

    if (Math.abs(hesaplananNet - hedefNet) < HASSASIYET) {
      return grossToNet(orta, medeniDurum, cocukSayisi);
    }

    if (hesaplananNet < hedefNet) {
      alt = orta;
    } else {
      ust = orta;
    }
  }

  return grossToNet((alt + ust) / 2, medeniDurum, cocukSayisi);
}

// ─── 3. Kıdem Tazminatı ─────────────────────────────────────────────────────
export function severanceCalculator(
  girisTarihi: Date,
  cikisTarihi: Date,
  brutMaas: number,
  yemekYardimi: number,
  yolYardimi: number,
  ikramiye: number
): KidemSonucu {
  const MS_PER_GUN = 1000 * 60 * 60 * 24;
  const calismaGunSayisi = Math.floor(
    (cikisTarihi.getTime() - girisTarihi.getTime()) / MS_PER_GUN
  );

  const tamYil = Math.floor(calismaGunSayisi / 365);
  const kalanGun = calismaGunSayisi % 365;

  // Günlük tavan: tavan / 30
  const gunlukTavan = KIDEM_TAZMINATI_TAVANI / 30;

  // Hesaba dahil aylık brüt (ikramiye aylığa çevrilir)
  const aylikToplamBrut = brutMaas + yemekYardimi + yolYardimi + ikramiye / 12;
  // Tavan kontrolü (aylık tavan: KIDEM_TAZMINATI_TAVANI)
  const hesabaDahilBrut = Math.min(aylikToplamBrut, KIDEM_TAZMINATI_TAVANI);

  // Günlük brüt
  const gunlukBrut = Math.min(hesabaDahilBrut / 30, gunlukTavan);

  // Tazminat = günlük brüt × çalışılan gün
  const tazminatTutari = gunlukBrut * calismaGunSayisi;

  return {
    calismaGunSayisi,
    tamYil,
    kalanGun,
    gunlukBrut,
    tazminatTutari,
    vergidentMuaf: true, // Kıdem tazminatı yasal tavan dahilinde vergiden muaftır
  };
}

// ─── 4. KDV Hesaplama ───────────────────────────────────────────────────────
export type KdvOrani = 1 | 8 | 10 | 18 | 20;

export interface KdvSonucu {
  kdvsizTutar: number;
  kdvTutari: number;
  kdvliTutar: number;
  oran: number;
}

export function kdvHesapla(tutar: number, oran: KdvOrani, mod: 'haric' | 'dahil'): KdvSonucu {
  if (mod === 'haric') {
    const kdvsizTutar = tutar;
    const kdvTutari = tutar * (oran / 100);
    const kdvliTutar = tutar + kdvTutari;
    return { kdvsizTutar, kdvTutari, kdvliTutar, oran };
  } else {
    const kdvliTutar = tutar;
    const kdvsizTutar = tutar / (1 + oran / 100);
    const kdvTutari = kdvliTutar - kdvsizTutar;
    return { kdvsizTutar, kdvTutari, kdvliTutar, oran };
  }
}

// ─── 5. Yüzde Hesaplama ─────────────────────────────────────────────────────
export type YuzdeMod = 'yuzdeKac' | 'kacYuzde' | 'ekle' | 'cikar' | 'degisim';

export interface YuzdeSonucu {
  sonuc: number;
  aciklama: string;
  formul: string;
}

export function yuzdeHesapla(mod: YuzdeMod, sayi1: number, sayi2: number): YuzdeSonucu {
  switch (mod) {
    case 'yuzdeKac': {
      const sonuc = (sayi1 * sayi2) / 100;
      return {
        sonuc,
        aciklama: `${sayi1}'in %${sayi2}'si`,
        formul: `${sayi1} × ${sayi2} ÷ 100 = ${sonuc}`,
      };
    }
    case 'kacYuzde': {
      if (sayi2 === 0) return { sonuc: 0, aciklama: 'Sıfıra bölünemez', formul: '' };
      const sonuc = (sayi1 / sayi2) * 100;
      return {
        sonuc,
        aciklama: `${sayi1}, ${sayi2}'nin yüzdesi`,
        formul: `(${sayi1} ÷ ${sayi2}) × 100 = ${sonuc.toFixed(4)}`,
      };
    }
    case 'ekle': {
      const sonuc = sayi1 * (1 + sayi2 / 100);
      return {
        sonuc,
        aciklama: `${sayi1}'e %${sayi2} eklenince`,
        formul: `${sayi1} × (1 + ${sayi2} ÷ 100) = ${sonuc.toFixed(4)}`,
      };
    }
    case 'cikar': {
      const sonuc = sayi1 * (1 - sayi2 / 100);
      return {
        sonuc,
        aciklama: `${sayi1}'den %${sayi2} çıkartılınca`,
        formul: `${sayi1} × (1 − ${sayi2} ÷ 100) = ${sonuc.toFixed(4)}`,
      };
    }
    case 'degisim': {
      if (sayi1 === 0) return { sonuc: 0, aciklama: 'Başlangıç değeri sıfır olamaz', formul: '' };
      const sonuc = ((sayi2 - sayi1) / sayi1) * 100;
      const yon = sonuc >= 0 ? 'artış' : 'azalış';
      return {
        sonuc,
        aciklama: `${sayi1}'den ${sayi2}'ye %${Math.abs(sonuc).toFixed(2)} ${yon}`,
        formul: `((${sayi2} − ${sayi1}) ÷ ${sayi1}) × 100 = ${sonuc.toFixed(4)}%`,
      };
    }
    default:
      return { sonuc: 0, aciklama: '', formul: '' };
  }
}

// ─── 6. Tarih Farkı ─────────────────────────────────────────────────────────
export interface TarihFarkiSonucu {
  toplamGun: number;
  yil: number;
  ay: number;
  gun: number;
  hafta: number;
  toplamSaat: number;
  toplamDakika: number;
}

export function tarihFarki(baslangic: Date, bitis: Date): TarihFarkiSonucu {
  const msPerGun = 1000 * 60 * 60 * 24;
  const toplamGun = Math.floor(Math.abs(bitis.getTime() - baslangic.getTime()) / msPerGun);
  const hafta = Math.floor(toplamGun / 7);
  const toplamSaat = toplamGun * 24;
  const toplamDakika = toplamSaat * 60;

  const start = baslangic <= bitis ? new Date(baslangic) : new Date(bitis);
  const end = baslangic <= bitis ? new Date(bitis) : new Date(baslangic);

  let yil = end.getFullYear() - start.getFullYear();
  let ay = end.getMonth() - start.getMonth();
  let gun = end.getDate() - start.getDate();

  if (gun < 0) {
    ay--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    gun += prevMonth.getDate();
  }
  if (ay < 0) {
    yil--;
    ay += 12;
  }

  return { toplamGun, yil, ay, gun, hafta, toplamSaat, toplamDakika };
}

// ─── 7. Yaş Hesaplama ───────────────────────────────────────────────────────
export interface BurcBilgisi {
  ad: string;
  sembol: string;
}

const BURCLAR: Array<{ ayBas: number; gunBas: number; ad: string; sembol: string }> = [
  { ayBas: 3, gunBas: 21, ad: 'Koç', sembol: '♈' },
  { ayBas: 4, gunBas: 20, ad: 'Boğa', sembol: '♉' },
  { ayBas: 5, gunBas: 21, ad: 'İkizler', sembol: '♊' },
  { ayBas: 6, gunBas: 21, ad: 'Yengeç', sembol: '♋' },
  { ayBas: 7, gunBas: 23, ad: 'Aslan', sembol: '♌' },
  { ayBas: 8, gunBas: 23, ad: 'Başak', sembol: '♍' },
  { ayBas: 9, gunBas: 23, ad: 'Terazi', sembol: '♎' },
  { ayBas: 10, gunBas: 23, ad: 'Akrep', sembol: '♏' },
  { ayBas: 11, gunBas: 22, ad: 'Yay', sembol: '♐' },
  { ayBas: 12, gunBas: 22, ad: 'Oğlak', sembol: '♑' },
  { ayBas: 1, gunBas: 20, ad: 'Kova', sembol: '♒' },
  { ayBas: 2, gunBas: 19, ad: 'Balık', sembol: '♓' },
];

function getBurc(ay: number, gun: number): BurcBilgisi {
  // Map 1-indexed month (1=Ocak) to burc
  for (let i = 0; i < BURCLAR.length; i++) {
    const burc = BURCLAR[i];
    const next = BURCLAR[(i + 1) % BURCLAR.length];
    if (burc.ayBas === ay && gun >= burc.gunBas) return { ad: burc.ad, sembol: burc.sembol };
    if (next.ayBas === ay && gun < next.gunBas) return { ad: burc.ad, sembol: burc.sembol };
  }
  return { ad: 'Oğlak', sembol: '♑' };
}

export interface YasSonucu {
  yil: number;
  ay: number;
  gun: number;
  toplamGun: number;
  sonrakiDogumGunuKacGun: number;
  burc: BurcBilgisi;
}

export function yasHesapla(dogumTarihi: Date, bugun?: Date): YasSonucu {
  const bugunTarih = bugun ? new Date(bugun) : new Date();
  bugunTarih.setHours(0, 0, 0, 0);
  const dogum = new Date(dogumTarihi);
  dogum.setHours(0, 0, 0, 0);

  const msPerGun = 1000 * 60 * 60 * 24;
  const toplamGun = Math.floor((bugunTarih.getTime() - dogum.getTime()) / msPerGun);

  let yil = bugunTarih.getFullYear() - dogum.getFullYear();
  let ay = bugunTarih.getMonth() - dogum.getMonth();
  let gun = bugunTarih.getDate() - dogum.getDate();

  if (gun < 0) {
    ay--;
    const prevMonth = new Date(bugunTarih.getFullYear(), bugunTarih.getMonth(), 0);
    gun += prevMonth.getDate();
  }
  if (ay < 0) {
    yil--;
    ay += 12;
  }

  let sonrakiDogumGunu = new Date(
    bugunTarih.getFullYear(),
    dogum.getMonth(),
    dogum.getDate()
  );
  if (sonrakiDogumGunu.getTime() <= bugunTarih.getTime()) {
    sonrakiDogumGunu = new Date(
      bugunTarih.getFullYear() + 1,
      dogum.getMonth(),
      dogum.getDate()
    );
  }
  const sonrakiDogumGunuKacGun = Math.floor(
    (sonrakiDogumGunu.getTime() - bugunTarih.getTime()) / msPerGun
  );

  const burc = getBurc(dogum.getMonth() + 1, dogum.getDate());

  return { yil, ay, gun, toplamGun, sonrakiDogumGunuKacGun, burc };
}

// ─── 8. Alan Hesaplama ──────────────────────────────────────────────────────
export type Sekil =
  | 'kare'
  | 'dikdortgen'
  | 'ucgen'
  | 'daire'
  | 'trapez'
  | 'paralelkenar'
  | 'elips';

export interface AlanSonucu {
  alan: number;
  cevre: number;
  birim: string;
  formul: string;
  formulAciklama: string;
}

export function alanHesapla(
  sekil: Sekil,
  olcular: Record<string, number>,
  birim: string
): AlanSonucu {
  switch (sekil) {
    case 'kare': {
      const a = olcular.a ?? 0;
      return {
        alan: a * a,
        cevre: 4 * a,
        birim,
        formul: `Alan = a² = ${a}² = ${(a * a).toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = a²  |  Çevre = 4a',
      };
    }
    case 'dikdortgen': {
      const a = olcular.a ?? 0, b = olcular.b ?? 0;
      return {
        alan: a * b,
        cevre: 2 * (a + b),
        birim,
        formul: `Alan = a × b = ${a} × ${b} = ${(a * b).toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = a × b  |  Çevre = 2(a + b)',
      };
    }
    case 'ucgen': {
      const a = olcular.a ?? 0, h = olcular.h ?? 0;
      const alan = (a * h) / 2;
      const b = olcular.b ?? 0, c = olcular.c ?? 0;
      return {
        alan,
        cevre: a + b + c,
        birim,
        formul: `Alan = (a × h) ÷ 2 = (${a} × ${h}) ÷ 2 = ${alan.toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = (taban × yükseklik) ÷ 2  |  Çevre = a + b + c',
      };
    }
    case 'daire': {
      const r = olcular.r ?? 0;
      const alan = Math.PI * r * r;
      return {
        alan,
        cevre: 2 * Math.PI * r,
        birim,
        formul: `Alan = π × r² = π × ${r}² = ${alan.toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = π × r²  |  Çevre (çap) = 2πr',
      };
    }
    case 'trapez': {
      const a = olcular.a ?? 0,
        b = olcular.b ?? 0,
        h = olcular.h ?? 0,
        c = olcular.c ?? 0,
        d = olcular.d ?? 0;
      const alan = ((a + b) / 2) * h;
      return {
        alan,
        cevre: a + b + c + d,
        birim,
        formul: `Alan = ((a + b) ÷ 2) × h = ((${a} + ${b}) ÷ 2) × ${h} = ${alan.toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = ((a + b) ÷ 2) × h  |  Çevre = a + b + c + d',
      };
    }
    case 'paralelkenar': {
      const a = olcular.a ?? 0, h = olcular.h ?? 0, b = olcular.b ?? 0;
      const alan = a * h;
      return {
        alan,
        cevre: 2 * (a + b),
        birim,
        formul: `Alan = a × h = ${a} × ${h} = ${alan.toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = taban × yükseklik  |  Çevre = 2(a + b)',
      };
    }
    case 'elips': {
      const a = olcular.a ?? 0, b = olcular.b ?? 0;
      const alan = Math.PI * a * b;
      const hVal = Math.pow(a - b, 2) / Math.pow(a + b, 2);
      const cevre = Math.PI * (a + b) * (1 + (3 * hVal) / (10 + Math.sqrt(4 - 3 * hVal)));
      return {
        alan,
        cevre,
        birim,
        formul: `Alan = π × a × b = π × ${a} × ${b} = ${alan.toFixed(4)} ${birim}²`,
        formulAciklama: 'Alan = π × a × b  |  Çevre ≈ Ramanujan yaklaşımı',
      };
    }
    default:
      return { alan: 0, cevre: 0, birim, formul: '', formulAciklama: '' };
  }
}

// ─── 9. Oran Orantı ─────────────────────────────────────────────────────────
export interface OranOrantiSonucu {
  sonuc: number;
  bilinmeyenHarf: string;
  adimlar: string[];
}

export function oranOrantiHesapla(
  a: number | null,
  b: number | null,
  c: number | null,
  d: number | null
): OranOrantiSonucu {
  // a / b = c / d  →  one is null
  if (a === null && b !== null && c !== null && d !== null) {
    const sonuc = (b * c) / d;
    return {
      sonuc,
      bilinmeyenHarf: 'a',
      adimlar: [
        'a / b = c / d',
        `a / ${b} = ${c} / ${d}`,
        `a × ${d} = ${b} × ${c}`,
        `a = (${b} × ${c}) ÷ ${d}`,
        `a = ${sonuc.toFixed(4)}`,
      ],
    };
  }
  if (b === null && a !== null && c !== null && d !== null) {
    const sonuc = (a * d) / c;
    return {
      sonuc,
      bilinmeyenHarf: 'b',
      adimlar: [
        'a / b = c / d',
        `${a} / b = ${c} / ${d}`,
        `${a} × ${d} = b × ${c}`,
        `b = (${a} × ${d}) ÷ ${c}`,
        `b = ${sonuc.toFixed(4)}`,
      ],
    };
  }
  if (c === null && a !== null && b !== null && d !== null) {
    const sonuc = (a * d) / b;
    return {
      sonuc,
      bilinmeyenHarf: 'c',
      adimlar: [
        'a / b = c / d',
        `${a} / ${b} = c / ${d}`,
        `${a} × ${d} = ${b} × c`,
        `c = (${a} × ${d}) ÷ ${b}`,
        `c = ${sonuc.toFixed(4)}`,
      ],
    };
  }
  if (d === null && a !== null && b !== null && c !== null) {
    const sonuc = (b * c) / a;
    return {
      sonuc,
      bilinmeyenHarf: 'd',
      adimlar: [
        'a / b = c / d',
        `${a} / ${b} = ${c} / d`,
        `${a} × d = ${b} × ${c}`,
        `d = (${b} × ${c}) ÷ ${a}`,
        `d = ${sonuc.toFixed(4)}`,
      ],
    };
  }
  return { sonuc: 0, bilinmeyenHarf: '?', adimlar: ['Lütfen tam olarak bir kutuyu boş bırakın'] };
}

// ─── 10. Zaman Dönüştürme ───────────────────────────────────────────────────
export type ZamanBirimi = 'saniye' | 'dakika' | 'saat' | 'gun' | 'hafta' | 'ay' | 'yil';

export type ZamanDonusumSonucu = Record<ZamanBirimi, number>;

const SANIYEYE: Record<ZamanBirimi, number> = {
  saniye: 1,
  dakika: 60,
  saat: 3_600,
  gun: 86_400,
  hafta: 604_800,
  ay: 2_592_000,   // 30 gün
  yil: 31_536_000, // 365 gün
};

export function zamanDonustur(deger: number, kaynakBirim: ZamanBirimi): ZamanDonusumSonucu {
  const toplamSaniye = deger * SANIYEYE[kaynakBirim];
  return Object.fromEntries(
    Object.entries(SANIYEYE).map(([birim, carpan]) => [birim, toplamSaniye / carpan])
  ) as ZamanDonusumSonucu;
}

// ═══════════════════════════════════════════════════════════════
// SAĞLIK HESAPLAYICILARI
// ═══════════════════════════════════════════════════════════════

// ─── VKİ / BMI ──────────────────────────────────────────────────────────────
export interface VkiKategori {
  min: number;
  max: number;
  label: string;
  renk: string; // tailwind text color
  bgRenk: string;
}

export interface VkiSonucu {
  vki: number;
  kategori: VkiKategori;
  idealKiloMin: number;
  idealKiloMax: number;
  fazlaKilo: number;
  kategoriler: VkiKategori[];
}

const VKI_KATEGORILER: VkiKategori[] = [
  { min: 0, max: 18.49, label: 'Zayıf', renk: 'text-blue-600', bgRenk: 'bg-blue-100' },
  { min: 18.5, max: 24.99, label: 'Normal', renk: 'text-green-600', bgRenk: 'bg-green-100' },
  { min: 25, max: 29.99, label: 'Fazla Kilolu', renk: 'text-yellow-600', bgRenk: 'bg-yellow-100' },
  { min: 30, max: 34.99, label: 'Obez I', renk: 'text-orange-600', bgRenk: 'bg-orange-100' },
  { min: 35, max: Infinity, label: 'Obez II', renk: 'text-red-600', bgRenk: 'bg-red-100' },
];

export function vkiHesapla(
  kilo: number,
  boy: number, // cm
  cinsiyet: 'erkek' | 'kadin',
  yas: number
): VkiSonucu {
  const boyM = boy / 100;
  const vki = kilo / (boyM * boyM);

  const kategori = VKI_KATEGORILER.find((k) => vki >= k.min && vki <= k.max)!;

  // Devine formülü ideal kilo (erkek: 50 + 2.3×(inch-60), kadın: 45.5 + 2.3×(inch-60))
  const inchBoy = boy / 2.54;
  const idealBase = cinsiyet === 'erkek' ? 50 : 45.5;
  const devineIdeal = idealBase + 2.3 * Math.max(0, inchBoy - 60);

  // İdeal kilo aralığı: VKİ 18.5–24.9
  const idealMin = 18.5 * boyM * boyM;
  const idealMax = 24.9 * boyM * boyM;

  // Yaş düzeltmesi bilgi amaçlı (hesaba katılmıyor; sadece devineIdeal için not)
  void yas;

  return {
    vki: Math.round(vki * 10) / 10,
    kategori,
    idealKiloMin: Math.round(idealMin * 10) / 10,
    idealKiloMax: Math.round(idealMax * 10) / 10,
    fazlaKilo: Math.round((kilo - devineIdeal) * 10) / 10,
    kategoriler: VKI_KATEGORILER,
  };
}

// ─── Kalori ─────────────────────────────────────────────────────────────────
export type AktiviteSeviyesi = 'sedanter' | 'hafif' | 'orta' | 'aktif' | 'cokAktif';
export type KaloriHedef = 'ver' | 'koru' | 'al';

export interface KaloriSonucu {
  bmr: number;
  tdee: number;
  hedefKalori: number;
  hedefler: { label: string; kalori: number; aciklama: string }[];
}

const AKTIVITE_CARPAN: Record<AktiviteSeviyesi, number> = {
  sedanter: 1.2,
  hafif: 1.375,
  orta: 1.55,
  aktif: 1.725,
  cokAktif: 1.9,
};

export function kaloriHesapla(
  kilo: number,
  boy: number,
  yas: number,
  cinsiyet: 'erkek' | 'kadin',
  aktivite: AktiviteSeviyesi,
  hedef: KaloriHedef
): KaloriSonucu {
  // Harris-Benedict
  const bmr =
    cinsiyet === 'erkek'
      ? 88.362 + 13.397 * kilo + 4.799 * boy - 5.677 * yas
      : 447.593 + 9.247 * kilo + 3.098 * boy - 4.33 * yas;

  const tdee = bmr * AKTIVITE_CARPAN[aktivite];

  const hedefMap: Record<KaloriHedef, number> = {
    ver: tdee - 500,
    koru: tdee,
    al: tdee + 500,
  };

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    hedefKalori: Math.round(hedefMap[hedef]),
    hedefler: [
      { label: 'Kilo Ver', kalori: Math.round(tdee - 500), aciklama: '~0.5 kg/hafta azalış' },
      { label: 'Kiloyu Koru', kalori: Math.round(tdee), aciklama: 'Mevcut ağırlığı koru' },
      { label: 'Kilo Al', kalori: Math.round(tdee + 500), aciklama: '~0.5 kg/hafta artış' },
    ],
  };
}

// ─── Gebelik Haftası ─────────────────────────────────────────────────────────
export interface GebelikSonucu {
  haftaSayisi: number;
  gunSayisi: number;
  tahminiDogumTarihi: Date;
  trimester: 1 | 2 | 3;
  bebeginBuyuklugu: string;
  bebekEmoji: string;
  kalanHafta: number;
  kalanGun: number;
}

const BEBEK_BUYUKLUGU: Record<number, { aciklama: string; emoji: string }> = {
  4: { aciklama: 'Haşhaş tohumu', emoji: '🌱' },
  5: { aciklama: 'Susam tohumu', emoji: '🌿' },
  6: { aciklama: 'Mercimek', emoji: '🫘' },
  7: { aciklama: 'Yaban mersini', emoji: '🫐' },
  8: { aciklama: 'Fasulye', emoji: '🌿' },
  9: { aciklama: 'Üzüm', emoji: '🍇' },
  10: { aciklama: 'Çilek', emoji: '🍓' },
  11: { aciklama: 'İncir', emoji: '🌿' },
  12: { aciklama: 'Limon', emoji: '🍋' },
  13: { aciklama: 'Bezelye', emoji: '🫛' },
  14: { aciklama: 'Şeftali', emoji: '🍑' },
  15: { aciklama: 'Elma', emoji: '🍎' },
  16: { aciklama: 'Avokado', emoji: '🥑' },
  17: { aciklama: 'Armut', emoji: '🍐' },
  18: { aciklama: 'Biber', emoji: '🫑' },
  19: { aciklama: 'Domates', emoji: '🍅' },
  20: { aciklama: 'Muz', emoji: '🍌' },
  21: { aciklama: 'Havuç', emoji: '🥕' },
  22: { aciklama: 'Hindistan cevizi', emoji: '🥥' },
  23: { aciklama: 'Mango', emoji: '🥭' },
  24: { aciklama: 'Mısır', emoji: '🌽' },
  25: { aciklama: 'Turp', emoji: '🫚' },
  26: { aciklama: 'Marul', emoji: '🥬' },
  27: { aciklama: 'Karnabahar', emoji: '🥦' },
  28: { aciklama: 'Patlıcan', emoji: '🍆' },
  29: { aciklama: 'Balkabağı', emoji: '🎃' },
  30: { aciklama: 'Karpuz', emoji: '🍉' },
  31: { aciklama: 'Ananas', emoji: '🍍' },
  32: { aciklama: 'Kavun', emoji: '🍈' },
  33: { aciklama: 'Ananas', emoji: '🍍' },
  34: { aciklama: 'Kabak', emoji: '🫙' },
  35: { aciklama: 'Kavun', emoji: '🍈' },
  36: { aciklama: 'Papaya', emoji: '🧡' },
  37: { aciklama: 'İsviçre lahanası', emoji: '🥬' },
  38: { aciklama: 'Pırasa', emoji: '🥦' },
  39: { aciklama: 'Karpuz', emoji: '🍉' },
  40: { aciklama: 'Karpuz', emoji: '🍉' },
};

export function gebelikHesapla(sonAdetTarihi: Date): GebelikSonucu {
  const bugun = new Date();
  const farkMs = bugun.getTime() - sonAdetTarihi.getTime();
  const toplamGun = Math.floor(farkMs / (1000 * 60 * 60 * 24));
  const haftaSayisi = Math.floor(toplamGun / 7);
  const gunSayisi = toplamGun % 7;

  const tahminiDogumTarihi = new Date(sonAdetTarihi);
  tahminiDogumTarihi.setDate(tahminiDogumTarihi.getDate() + 280);

  const trimester: 1 | 2 | 3 = haftaSayisi < 13 ? 1 : haftaSayisi < 27 ? 2 : 3;

  const clampedHafta = Math.max(4, Math.min(40, haftaSayisi));
  const bebek = BEBEK_BUYUKLUGU[clampedHafta] ?? { aciklama: 'Bebek büyüyor', emoji: '👶' };

  const kalanGunTopla = Math.max(0, Math.ceil((tahminiDogumTarihi.getTime() - bugun.getTime()) / (1000 * 60 * 60 * 24)));
  const kalanHafta = Math.floor(kalanGunTopla / 7);
  const kalanGun = kalanGunTopla % 7;

  return {
    haftaSayisi,
    gunSayisi,
    tahminiDogumTarihi,
    trimester,
    bebeginBuyuklugu: bebek.aciklama,
    bebekEmoji: bebek.emoji,
    kalanHafta,
    kalanGun,
  };
}

// ─── İdeal Kilo ──────────────────────────────────────────────────────────────
export interface IdealKiloSonucu {
  devineFormul: number;
  robinsonFormul: number;
  millerFormul: number;
  hamiltonFormul: number;
  ortalama: number;
  aralik: { min: number; max: number };
}

export function idealKilo(boy: number, cinsiyet: 'erkek' | 'kadin'): IdealKiloSonucu {
  const inchBoy = boy / 2.54;
  const fazlaInch = Math.max(0, inchBoy - 60);

  const devine =
    cinsiyet === 'erkek' ? 50 + 2.3 * fazlaInch : 45.5 + 2.3 * fazlaInch;
  const robinson =
    cinsiyet === 'erkek' ? 52 + 1.9 * fazlaInch : 49 + 1.7 * fazlaInch;
  const miller =
    cinsiyet === 'erkek' ? 56.2 + 1.41 * fazlaInch : 53.1 + 1.36 * fazlaInch;
  const hamilton =
    cinsiyet === 'erkek'
      ? (boy - 152) / 2.54 * 2.7 + 48
      : (boy - 152) / 2.54 * 2.25 + 45.5;

  const ortalama = (devine + robinson + miller + hamilton) / 4;

  return {
    devineFormul: Math.round(devine * 10) / 10,
    robinsonFormul: Math.round(robinson * 10) / 10,
    millerFormul: Math.round(miller * 10) / 10,
    hamiltonFormul: Math.round(hamilton * 10) / 10,
    ortalama: Math.round(ortalama * 10) / 10,
    aralik: {
      min: Math.round(Math.min(devine, robinson, miller, hamilton) * 10) / 10,
      max: Math.round(Math.max(devine, robinson, miller, hamilton) * 10) / 10,
    },
  };
}

// ─── Su İhtiyacı ─────────────────────────────────────────────────────────────
export type IklimTipi = 'soguk' | 'iliman' | 'sicak';

export interface SuSonucu {
  gunlukMl: number;
  gunlukLitre: number;
  bardakSayisi: number; // 250 ml bardak
  sporSonrasiEkMl: number;
}

export function suIhtiyaci(
  kilo: number,
  aktivite: AktiviteSeviyesi,
  iklim: IklimTipi
): SuSonucu {
  // Temel: 35 ml/kg
  let ml = kilo * 35;

  // Aktivite eki
  const aktiviteEk: Record<AktiviteSeviyesi, number> = {
    sedanter: 0,
    hafif: 300,
    orta: 500,
    aktif: 700,
    cokAktif: 1000,
  };
  ml += aktiviteEk[aktivite];

  // İklim eki
  const iklimEk: Record<IklimTipi, number> = { soguk: -200, iliman: 0, sicak: 500 };
  ml += iklimEk[iklim];

  const sporEk = aktivite === 'aktif' || aktivite === 'cokAktif' ? 500 : 0;

  return {
    gunlukMl: Math.round(ml),
    gunlukLitre: Math.round((ml / 1000) * 10) / 10,
    bardakSayisi: Math.round(ml / 250),
    sporSonrasiEkMl: sporEk,
  };
}

// ─── Adım / Kalori ───────────────────────────────────────────────────────────
export interface AdimKaloriSonucu {
  yakilanKalori: number;
  mesafeKm: number;
  yuruyusSuresiDakika: number;
}

export function adimKalori(adim: number, kilo: number, boy: number): AdimKaloriSonucu {
  // MET tabanlı hesaplama: yürüyüş MET ≈ 3.5; adım uzunluğu boy*0.415/100 m
  const adimUzunlukM = (boy * 0.415) / 100;
  const mesafeKm = (adim * adimUzunlukM) / 1000;

  // Kalori = MET × kg × saat
  // Hız: ortalama 5 km/h → süre = mesafe/5 saat
  const sureSaat = mesafeKm / 5;
  const kalori = 3.5 * kilo * sureSaat;

  return {
    yakilanKalori: Math.round(kalori),
    mesafeKm: Math.round(mesafeKm * 100) / 100,
    yuruyusSuresiDakika: Math.round(sureSaat * 60),
  };
}

// ─── Uyku Saati ──────────────────────────────────────────────────────────────
export interface UykuSonucu {
  oneriliBakmaSaatleri: string[]; // saat formatı "22:30"
  idealSure: string;
}

export function uykuSaati(uyanmaSaati: string): UykuSonucu {
  // uyanmaSaati: "HH:MM"
  const [h, m] = uyanmaSaati.split(':').map(Number);
  const uyanmaDakika = h * 60 + m;

  // 14 dakika uykuya dalma + 5 uyku döngüsü (450 dk) ve 6 döngü (540 dk)
  const donguDakika = 90;
  const uyuyakalmaDakika = 14;

  const oneriler: string[] = [];
  for (let dongü = 6; dongü >= 1; dongü--) {
    const uykuSureDakika = dongü * donguDakika + uyuyakalmaDakika;
    let yatmaDakika = uyanmaDakika - uykuSureDakika;
    while (yatmaDakika < 0) yatmaDakika += 1440;
    const yatmaH = Math.floor(yatmaDakika / 60) % 24;
    const yatmaM = yatmaDakika % 60;
    oneriler.push(`${String(yatmaH).padStart(2, '0')}:${String(yatmaM).padStart(2, '0')}`);
  }

  return {
    oneriliBakmaSaatleri: oneriler,
    idealSure: '7,5–9 saat (5–6 döngü)',
  };
}

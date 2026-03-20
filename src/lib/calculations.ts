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
  TYT_KATSAYILARI,
  TYT_YUZDELIK_TABLOSU,
  AYT_YUZDELIK_TABLOSU,
  HARF_NOTU_TABLOSU,
  KPSS_KATSAYILARI,
  KIRA_ARTIS_TAVAN_2026,
  MEVDUAT_STOPAJ_ORANI,
  DAMGA_VERGISI_BELGE_ORANLARI,
  TAPU_HARCI_ORANLARI,
  OTV_ORANLARI,
  KDV_ORANI_ARAC,
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
  toplamGun: number;
  tamYil: number;
  kalanGun: number;
  gunlukBrut: number;
  tazminatBrut: number;
  damgaVergisi: number;
  netTazminat: number;
  tavanUygulandiMi: boolean;
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
  const toplamGun = Math.floor(
    (cikisTarihi.getTime() - girisTarihi.getTime()) / MS_PER_GUN
  );

  const tamYil = Math.floor(toplamGun / 365);
  const kalanGun = toplamGun % 365;

  // Hesaba dahil aylık brüt (ikramiye aylığa çevrilir)
  const aylikToplamBrut = brutMaas + yemekYardimi + yolYardimi + ikramiye / 12;

  // Tavan kontrolü: her tam yıl için ödenen tutar KIDEM_TAZMINATI_TAVANI'nı geçemez
  const tavanUygulandiMi = aylikToplamBrut > KIDEM_TAZMINATI_TAVANI;
  const hesabaDahilBrut = Math.min(aylikToplamBrut, KIDEM_TAZMINATI_TAVANI);

  // Gösterim için günlük brüt (aylık / 30)
  const gunlukBrut = brutMaas / 30;

  // Doğru formül: tazminat = hesabaDahilBrut × (toplamGün / 365)
  const tazminatBrut = hesabaDahilBrut * (toplamGun / 365);

  // Damga vergisi: %0,759 (bordro damga vergisi oranı)
  const damgaVergisi = tazminatBrut * 0.00759;
  const netTazminat = tazminatBrut - damgaVergisi;

  return {
    toplamGun,
    tamYil,
    kalanGun,
    gunlukBrut,
    tazminatBrut,
    damgaVergisi,
    netTazminat,
    tavanUygulandiMi,
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

// ═══════════════════════════════════════════════════════════════
// ÖĞRENCİ / SINAV HESAPLAYICILARI
// ═══════════════════════════════════════════════════════════════

// ─── TYT Puan ───────────────────────────────────────────────────────────────
export interface TytNets {
  turkce: number;
  mat: number;
  fen: number;
  sosyal: number;
}

export interface TytSonucu {
  netleri: TytNets;
  toplamNet: number;
  hamPuan: number;
  tytPuani: number;
}

export function tytPuanHesapla(
  turkceD: number, turkceY: number,
  matD: number, matY: number,
  fenD: number, fenY: number,
  sosyalD: number, sosyalY: number
): TytSonucu {
  const k = TYT_KATSAYILARI;
  const turkceNet = turkceD - turkceY / k.turkce.yanlis;
  const matNet    = matD    - matY    / k.temelMat.yanlis;
  const fenNet    = fenD    - fenY    / k.fen.yanlis;
  const sosyalNet = sosyalD - sosyalY / k.sosyal.yanlis;

  const toplamNet = turkceNet + matNet + fenNet + sosyalNet;

  // Ham puan = taban + (Türkçe net × 4) + (Mat net × 3) + (Fen net × 2) + (Sosyal net × 2)
  const hamPuan =
    k.taban +
    turkceNet * k.turkce.dogru +
    matNet    * k.temelMat.dogru +
    fenNet    * k.fen.dogru +
    sosyalNet * k.sosyal.dogru;

  // TYT Standardize puanı yaklaşık formül (ÖSYM sabit katsayısı ~1.0 – 2024 dönemi)
  const tytPuani = Math.max(100, Math.round(hamPuan * 10) / 10);

  return {
    netleri: {
      turkce: Math.round(turkceNet * 100) / 100,
      mat:    Math.round(matNet    * 100) / 100,
      fen:    Math.round(fenNet    * 100) / 100,
      sosyal: Math.round(sosyalNet * 100) / 100,
    },
    toplamNet: Math.round(toplamNet * 100) / 100,
    hamPuan: Math.round(hamPuan * 100) / 100,
    tytPuani,
  };
}

// ─── AYT Puan ────────────────────────────────────────────────────────────────
export type AytAlan = 'SAY' | 'EA' | 'SOZ' | 'DIL';

export interface AytNetGiris {
  // Sayısal
  matNet?: number;
  fizikNet?: number;
  kimyaNet?: number;
  biyolojiNet?: number;
  // EA
  edebiyatNet?: number;
  tarih1Net?: number;
  cografya1Net?: number;
  // Sözel (ek)
  tarih2Net?: number;
  cografya2Net?: number;
  felsefeNet?: number;
  dinNet?: number;
  // Dil
  ydtNet?: number;
}

export interface AytSonucu {
  alanNetler: Record<string, number>;
  toplamNet: number;
  aytHamPuan: number;
  aytPuani: number;
}

export function aytPuanHesapla(alan: AytAlan, netler: AytNetGiris): AytSonucu {
  const taban = 100;
  let hamPuan = taban;
  const alanNetler: Record<string, number> = {};
  let toplamNet = 0;

  if (alan === 'SAY') {
    const mat  = netler.matNet ?? 0;
    const fiz  = netler.fizikNet ?? 0;
    const kim  = netler.kimyaNet ?? 0;
    const bio  = netler.biyolojiNet ?? 0;
    hamPuan += mat * 3 + fiz * 3 + kim * 3 + bio * 3;
    toplamNet = mat + fiz + kim + bio;
    Object.assign(alanNetler, { Matematik: mat, Fizik: fiz, Kimya: kim, Biyoloji: bio });
  } else if (alan === 'EA') {
    const mat  = netler.matNet ?? 0;
    const edb  = netler.edebiyatNet ?? 0;
    const tar  = netler.tarih1Net ?? 0;
    const cog  = netler.cografya1Net ?? 0;
    hamPuan += mat * 3 + edb * 3 + tar * 2 + cog * 2;
    toplamNet = mat + edb + tar + cog;
    Object.assign(alanNetler, { Matematik: mat, Edebiyat: edb, 'Tarih-1': tar, 'Coğrafya-1': cog });
  } else if (alan === 'SOZ') {
    const edb  = netler.edebiyatNet ?? 0;
    const tar1 = netler.tarih1Net ?? 0;
    const cog1 = netler.cografya1Net ?? 0;
    const tar2 = netler.tarih2Net ?? 0;
    const cog2 = netler.cografya2Net ?? 0;
    const fel  = netler.felsefeNet ?? 0;
    const din  = netler.dinNet ?? 0;
    hamPuan += edb * 3 + tar1 * 3 + cog1 * 2 + tar2 * 2 + cog2 * 2 + fel * 2 + din * 2;
    toplamNet = edb + tar1 + cog1 + tar2 + cog2 + fel + din;
    Object.assign(alanNetler, { Edebiyat: edb, 'Tarih-1': tar1, 'Coğrafya-1': cog1, 'Tarih-2': tar2, 'Coğrafya-2': cog2, Felsefe: fel, 'Din Kültürü': din });
  } else {
    const ydt = netler.ydtNet ?? 0;
    hamPuan += ydt * 3;
    toplamNet = ydt;
    Object.assign(alanNetler, { 'Yabancı Dil (YDT)': ydt });
  }

  return {
    alanNetler,
    toplamNet: Math.round(toplamNet * 100) / 100,
    aytHamPuan: Math.round(hamPuan * 100) / 100,
    aytPuani: Math.max(100, Math.round(hamPuan * 10) / 10),
  };
}

// ─── YKS Yüzdelik Dilim ──────────────────────────────────────────────────────
export type YksSinav = 'TYT' | 'SAY' | 'EA' | 'SOZ' | 'DIL';

export interface YuzdelikSonucu {
  tahminiYuzdelik: number;
  tahminiSiralama: number;
  universiteOlasiligi: string;
}

const KATILIMCI_SAYISI = 2_500_000;

export function yuzdelikDilim(puan: number, sinav: YksSinav): YuzdelikSonucu {
  const tablo = sinav === 'TYT' ? TYT_YUZDELIK_TABLOSU : AYT_YUZDELIK_TABLOSU[sinav as 'SAY' | 'EA' | 'SOZ' | 'DIL'];

  let yuzdelik = 99;
  for (const satir of tablo) {
    if (puan >= satir.puanAlt && puan <= satir.puanUst) {
      yuzdelik = satir.yuzdelik;
      break;
    }
  }

  const siralama = Math.round((yuzdelik / 100) * KATILIMCI_SAYISI);

  let olasilik: string;
  if (yuzdelik <= 1)   olasilik = 'Çok iyi bir sıralama. Prestijli üniversitelerin popüler bölümlerine yerleşme şansı yüksek.';
  else if (yuzdelik <= 5)  olasilik = 'İyi bir sıralama. Devlet üniversitelerinin tercih edilen bölümlerine yerleşme olasılığı var.';
  else if (yuzdelik <= 20) olasilik = 'Orta-üstü bir sıralama. Devlet üniversitesi şansı mevcut, bölüm seçimine dikkat et.';
  else if (yuzdelik <= 50) olasilik = 'Orta bir sıralama. Bazı devlet ve vakıf üniversitelerine yerleşme olasılığın var.';
  else if (yuzdelik <= 80) olasilik = 'Sınırda bir sıralama. Vakıf üniversiteleri ve burslu kontenjanlar değerlendirilebilir.';
  else                     olasilik = 'Düşük bir sıralama. Tekrar sınava girmek veya farklı tercihler yapmak önerilir.';

  return { tahminiYuzdelik: yuzdelik, tahminiSiralama: siralama, universiteOlasiligi: olasilik };
}

// ─── Not Ortalaması ──────────────────────────────────────────────────────────
export interface DersNot {
  ad: string;
  not: number;
  kredi: number;
}

export interface NotOrtalamaSonucu {
  agirlikliOrtalama: number;
  harfNotu: string;
  gpa4: number;
  basariDurumu: string;
  toplamKredi: number;
}

export function notOrtalamasi(dersler: DersNot[]): NotOrtalamaSonucu {
  const gecerli = dersler.filter((d) => d.kredi > 0 && d.not >= 0 && d.not <= 100);
  if (gecerli.length === 0) {
    return { agirlikliOrtalama: 0, harfNotu: 'FF', gpa4: 0, basariDurumu: 'Veri yok', toplamKredi: 0 };
  }

  const toplamKredi = gecerli.reduce((s, d) => s + d.kredi, 0);
  const agirlikliToplam = gecerli.reduce((s, d) => s + d.not * d.kredi, 0);
  const ort = agirlikliToplam / toplamKredi;

  const harfSatir = HARF_NOTU_TABLOSU.find((r) => ort >= r.min && ort <= r.maks) ?? HARF_NOTU_TABLOSU[HARF_NOTU_TABLOSU.length - 1];

  let durum: string;
  if (ort >= 90)      durum = 'Yüksek Onur Öğrencisi';
  else if (ort >= 80) durum = 'Onur Öğrencisi';
  else if (ort >= 60) durum = 'Başarılı';
  else if (ort >= 50) durum = 'Koşullu Başarılı';
  else                durum = 'Başarısız';

  return {
    agirlikliOrtalama: Math.round(ort * 100) / 100,
    harfNotu: harfSatir.harf,
    gpa4: harfSatir.gpa4,
    basariDurumu: durum,
    toplamKredi,
  };
}

// ─── GPA Hesaplama ───────────────────────────────────────────────────────────
export interface GpaDers {
  harf: string;
  kredi: number;
}

export interface GpaSonucu {
  gpa4: number;
  gpa100: number;
  basariDurumu: string;
  toplamKredi: number;
}

const HARF_GPA4: Record<string, number> = {
  AA: 4.0, BA: 3.5, BB: 3.0, CB: 2.5,
  CC: 2.0, DC: 1.5, DD: 1.0, FD: 0.5, FF: 0.0,
};

const HARF_100: Record<string, number> = {
  AA: 95, BA: 87, BB: 82, CB: 77,
  CC: 72, DC: 67, DD: 62, FD: 55, FF: 25,
};

export function gpaHesapla(dersler: GpaDers[]): GpaSonucu {
  const gecerli = dersler.filter((d) => d.kredi > 0 && d.harf in HARF_GPA4);
  if (gecerli.length === 0) {
    return { gpa4: 0, gpa100: 0, basariDurumu: 'Veri yok', toplamKredi: 0 };
  }

  const toplamKredi = gecerli.reduce((s, d) => s + d.kredi, 0);
  const gpa4 = gecerli.reduce((s, d) => s + HARF_GPA4[d.harf] * d.kredi, 0) / toplamKredi;
  const gpa100 = gecerli.reduce((s, d) => s + HARF_100[d.harf] * d.kredi, 0) / toplamKredi;

  let durum: string;
  if (gpa4 >= 3.5)     durum = 'Yüksek Onur (Summa Cum Laude)';
  else if (gpa4 >= 3.0) durum = 'Onur Öğrencisi (Cum Laude)';
  else if (gpa4 >= 2.0) durum = 'Normal Mezuniyet';
  else if (gpa4 >= 1.0) durum = 'Koşullu Başarılı';
  else                  durum = 'Başarısız';

  return {
    gpa4: Math.round(gpa4 * 100) / 100,
    gpa100: Math.round(gpa100 * 100) / 100,
    basariDurumu: durum,
    toplamKredi,
  };
}

// ─── KPSS Puan ───────────────────────────────────────────────────────────────
export interface KpssSonucu {
  gkNet: number;
  gyNet: number;
  alanNet: number | null;
  toplamNet: number;
  kpssP3: number;
  kpssP10: number;
  kpssP93: number | null;
  kpssP94: number | null;
}

export function kpssPuanHesapla(
  gkD: number, gkY: number,
  gyD: number, gyY: number,
  alanD?: number, alanY?: number
): KpssSonucu {
  const k = KPSS_KATSAYILARI;
  const gkNet  = gkD  - gkY  * k.gk.yanlis;
  const gyNet  = gyD  - gyY  * k.gy.yanlis;
  const alanNet = alanD !== undefined && alanY !== undefined
    ? alanD - alanY * k.alan.yanlis
    : null;

  // KPSS P3 ve P10: GK+GY ortalaması üzerinden standardize puan
  // Yaklaşık formül: (GK net / 60 + GY net / 60) / 2 × 100 × 0.7 + 50
  const gkgyOrtalama = (gkNet / k.gk.soru + gyNet / k.gy.soru) / 2;
  const p3  = Math.max(0, Math.round((gkgyOrtalama * 70 + 50) * 100) / 100);
  const p10 = p3;

  const p93 = alanNet !== null
    ? Math.max(0, Math.round(((gkgyOrtalama * 0.3 + (alanNet / k.alan.soru) * 0.4) * 100 + 50) * 100) / 100)
    : null;
  const p94 = p93;

  return {
    gkNet:  Math.round(gkNet  * 100) / 100,
    gyNet:  Math.round(gyNet  * 100) / 100,
    alanNet: alanNet !== null ? Math.round(alanNet * 100) / 100 : null,
    toplamNet: Math.round((gkNet + gyNet + (alanNet ?? 0)) * 100) / 100,
    kpssP3: p3,
    kpssP10: p10,
    kpssP93: p93,
    kpssP94: p94,
  };
}

// ─── Kira Artış Hesaplama ────────────────────────────────────────────────────
export interface KiraArtisSonucu {
  yeniKira: number;
  artisYuzde: number;
  artisliMiktar: number;
  yasalTavan: number;
  yasalYeniKira: number;
}

export function kiraArtis(mevcutKira: number, artisOrani: number): KiraArtisSonucu {
  const artisliMiktar = mevcutKira * (artisOrani / 100);
  const yeniKira = mevcutKira + artisliMiktar;
  const yasalArtis = mevcutKira * (KIRA_ARTIS_TAVAN_2026 / 100);
  return {
    yeniKira:      Math.round(yeniKira * 100) / 100,
    artisYuzde:    artisOrani,
    artisliMiktar: Math.round(artisliMiktar * 100) / 100,
    yasalTavan:    KIRA_ARTIS_TAVAN_2026,
    yasalYeniKira: Math.round((mevcutKira + yasalArtis) * 100) / 100,
  };
}

// ─── Mevduat Faiz Hesaplama ─────────────────────────────────────────────────
export interface MevduatFaizSonucu {
  brutFaiz: number;
  stopajVergisi: number;
  netFaiz: number;
  toplamBrutTutar: number;
  toplamNetTutar: number;
  gunlukGetiri: number;
  aylikGetiri: number;
}

export function mevduatFaiz(
  anapara: number,
  faizOrani: number,
  vade: number,
  vergisizMi: boolean,
): MevduatFaizSonucu {
  const brutFaiz = anapara * (faizOrani / 100) * (vade / 365);
  const stopajVergisi = vergisizMi ? 0 : brutFaiz * MEVDUAT_STOPAJ_ORANI;
  const netFaiz = brutFaiz - stopajVergisi;
  return {
    brutFaiz:       Math.round(brutFaiz * 100) / 100,
    stopajVergisi:  Math.round(stopajVergisi * 100) / 100,
    netFaiz:        Math.round(netFaiz * 100) / 100,
    toplamBrutTutar: Math.round((anapara + brutFaiz) * 100) / 100,
    toplamNetTutar:  Math.round((anapara + netFaiz) * 100) / 100,
    gunlukGetiri:   Math.round((netFaiz / vade) * 100) / 100,
    aylikGetiri:    Math.round((netFaiz / vade * 30) * 100) / 100,
  };
}

// ─── Damga Vergisi Hesaplama ────────────────────────────────────────────────
export interface DamgaVergiSonucu {
  vergiOrani: number;
  vergiTutari: number;
  toplamTutar: number;
}

export function damgaVergisiHesapla(belge: string, tutar: number): DamgaVergiSonucu {
  const oran = DAMGA_VERGISI_BELGE_ORANLARI[belge]?.oran ?? DAMGA_VERGISI_ORANI;
  const vergiTutari = tutar * oran;
  return {
    vergiOrani:  oran,
    vergiTutari: Math.round(vergiTutari * 100) / 100,
    toplamTutar: Math.round((tutar + vergiTutari) * 100) / 100,
  };
}

// ─── Tapu Harcı Hesaplama ───────────────────────────────────────────────────
export type TapuIslem = 'satis' | 'bagis' | 'ipotek';

export interface TapuHarciSonucu {
  aliciHarci: number;
  saticiHarci: number;
  toplamHarc: number;
  donusumBedeli: number;
  toplamMaliyet: number;
}

export function tapuHarci(
  beyanDegeri: number,
  islem: TapuIslem,
  trafoBedeli = 0,
): TapuHarciSonucu {
  const oranlar = TAPU_HARCI_ORANLARI[islem];
  const aliciHarci  = beyanDegeri * oranlar.alici;
  const saticiHarci = beyanDegeri * oranlar.satici;
  const toplamHarc  = aliciHarci + saticiHarci;
  return {
    aliciHarci:    Math.round(aliciHarci * 100) / 100,
    saticiHarci:   Math.round(saticiHarci * 100) / 100,
    toplamHarc:    Math.round(toplamHarc * 100) / 100,
    donusumBedeli: Math.round(trafoBedeli * 100) / 100,
    toplamMaliyet: Math.round((toplamHarc + trafoBedeli) * 100) / 100,
  };
}

// ─── İhbar Tazminatı Hesaplama ──────────────────────────────────────────────
export interface IhbarSonucu {
  calismaYili: number;
  ihbarSuresi: number;   // hafta
  ihbarUcreti: number;
}

export function ihbarTazminati(
  girisTarihi: Date,
  cikisTarihi: Date,
  brutMaas: number,
): IhbarSonucu {
  const diffAy = (cikisTarihi.getTime() - girisTarihi.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const calismaYili = diffAy / 12;

  let ihbarSuresi: number;
  if (diffAy < 6)        ihbarSuresi = 2;
  else if (diffAy < 18)  ihbarSuresi = 4;
  else if (diffAy < 36)  ihbarSuresi = 6;
  else                   ihbarSuresi = 8;

  const gunlukBrut = brutMaas / 30;
  const ihbarUcreti = gunlukBrut * (ihbarSuresi * 7);
  return {
    calismaYili: Math.round(calismaYili * 10) / 10,
    ihbarSuresi,
    ihbarUcreti: Math.round(ihbarUcreti * 100) / 100,
  };
}

// ─── Fazla Mesai Hesaplama ──────────────────────────────────────────────────
export type FazlaMesaiMod = 'haftalik' | 'gece' | 'tatil';

export interface FazlaMesaiSonucu {
  saatlikUcret: number;
  zamFaktoru: number;
  fazlaMesaiUcreti: number;
}

export function fazlaMesai(
  brutMaas: number,
  normalMesaiSaat: number,
  fazlaSaat: number,
  mod: FazlaMesaiMod,
): FazlaMesaiSonucu {
  const saatlikUcret = brutMaas / (normalMesaiSaat * 4.33);
  const zamFaktoru = mod === 'tatil' ? 2 : 1.5;
  const fazlaMesaiUcreti = saatlikUcret * zamFaktoru * fazlaSaat;
  return {
    saatlikUcret:     Math.round(saatlikUcret * 100) / 100,
    zamFaktoru,
    fazlaMesaiUcreti: Math.round(fazlaMesaiUcreti * 100) / 100,
  };
}

// ─── ÖTV Hesaplama ───────────────────────────────────────────────────────────
export interface OtvSonucu {
  otvOrani: number;
  otvTutari: number;
  kdvMatrahi: number;
  kdvTutari: number;
  toplamVergi: number;
  vergisizFiyat: number;
}

export function otvHesapla(aracTipi: string, motorHacmi: number, fiyat: number): OtvSonucu {
  let otvKey: string;
  if (aracTipi === 'elektrikli') {
    otvKey = 'elektrikli';
  } else if (motorHacmi <= 1600) {
    otvKey = 'cc1600alt';
  } else if (motorHacmi <= 2000) {
    otvKey = 'cc1601_2000';
  } else {
    otvKey = 'cc2001ust';
  }
  const otvOrani = OTV_ORANLARI[otvKey]?.oran ?? 0.45;

  // Satış fiyatı = vergisiz × (1 + OTV) × (1 + KDV)
  const vergisizFiyat = fiyat / ((1 + otvOrani) * (1 + KDV_ORANI_ARAC));
  const otvTutari = vergisizFiyat * otvOrani;
  const kdvMatrahi = vergisizFiyat + otvTutari;
  const kdvTutari = kdvMatrahi * KDV_ORANI_ARAC;

  return {
    otvOrani,
    otvTutari:    Math.round(otvTutari),
    kdvMatrahi:   Math.round(kdvMatrahi),
    kdvTutari:    Math.round(kdvTutari),
    toplamVergi:  Math.round(otvTutari + kdvTutari),
    vergisizFiyat: Math.round(vergisizFiyat),
  };
}

// ─── Kredi Taksit Hesaplama ──────────────────────────────────────────────────
export interface KrediTaksitSonucu {
  aylikTaksit: number;
  toplamOdeme: number;
  toplamFaiz: number;
  anaparaFaizOrani: number; // faiz / anapara %
  odemeTablosu: Array<{ ay: number; taksit: number; anapara: number; faiz: number; kalanBakiye: number }>;
}

export function krediTaksit(
  anapara: number,
  yillikFaizOrani: number, // %
  vadeAy: number,
): KrediTaksitSonucu {
  const aylikFaiz = yillikFaizOrani / 100 / 12;

  let aylikTaksit: number;
  if (aylikFaiz === 0) {
    aylikTaksit = anapara / vadeAy;
  } else {
    aylikTaksit =
      (anapara * aylikFaiz * Math.pow(1 + aylikFaiz, vadeAy)) /
      (Math.pow(1 + aylikFaiz, vadeAy) - 1);
  }

  const toplamOdeme = aylikTaksit * vadeAy;
  const toplamFaiz = toplamOdeme - anapara;
  const anaparaFaizOrani = (toplamFaiz / anapara) * 100;

  // Ödeme tablosu (ilk 12 ay + son ay)
  const odemeTablosu: KrediTaksitSonucu['odemeTablosu'] = [];
  let kalanBakiye = anapara;
  for (let ay = 1; ay <= vadeAy; ay++) {
    const faiz = kalanBakiye * aylikFaiz;
    const anaparaOdemesi = aylikTaksit - faiz;
    kalanBakiye -= anaparaOdemesi;
    if (ay <= 12 || ay === vadeAy) {
      odemeTablosu.push({
        ay,
        taksit: Math.round(aylikTaksit * 100) / 100,
        anapara: Math.round(anaparaOdemesi * 100) / 100,
        faiz: Math.round(faiz * 100) / 100,
        kalanBakiye: Math.max(0, Math.round(kalanBakiye * 100) / 100),
      });
    }
  }

  return {
    aylikTaksit: Math.round(aylikTaksit * 100) / 100,
    toplamOdeme: Math.round(toplamOdeme * 100) / 100,
    toplamFaiz: Math.round(toplamFaiz * 100) / 100,
    anaparaFaizOrani: Math.round(anaparaFaizOrani * 100) / 100,
    odemeTablosu,
  };
}

// ─── Yakıt Maliyeti Hesaplama ────────────────────────────────────────────────
export interface YakitMaliyetiSonucu {
  toplamMaliyet: number;
  kmBasinaMaliyet: number;
  litreBaSinaKm: number;
  harcananYakit: number; // litre
}

export function yakitMaliyeti(
  mesafeKm: number,
  tuketimL100km: number, // L/100km
  litreFiyati: number,  // ₺
): YakitMaliyetiSonucu {
  const harcananYakit = (mesafeKm / 100) * tuketimL100km;
  const toplamMaliyet = harcananYakit * litreFiyati;
  const kmBasinaMaliyet = toplamMaliyet / mesafeKm;
  const litreBaSinaKm = 100 / tuketimL100km;

  return {
    toplamMaliyet: Math.round(toplamMaliyet * 100) / 100,
    kmBasinaMaliyet: Math.round(kmBasinaMaliyet * 100) / 100,
    litreBaSinaKm: Math.round(litreBaSinaKm * 100) / 100,
    harcananYakit: Math.round(harcananYakit * 100) / 100,
  };
}

// ─── Kar Zarar Hesaplama ─────────────────────────────────────────────────────
export interface KarZararSonucu {
  karZararTutari: number;
  karZararYuzde: number;
  karmi: boolean; // true = kar, false = zarar
  kdvliFiyat?: number; // opsiyonel KDV dahil satış fiyatı (%20)
}

export function karZararHesapla(
  alisFiyati: number,
  satisFiyati: number,
  kdvOrani?: number, // % (opsiyonel)
): KarZararSonucu {
  const fark = satisFiyati - alisFiyati;
  const karZararYuzde = alisFiyati > 0 ? (fark / alisFiyati) * 100 : 0;
  const kdvliFiyat = kdvOrani !== undefined ? satisFiyati * (1 + kdvOrani / 100) : undefined;

  return {
    karZararTutari: Math.round(fark * 100) / 100,
    karZararYuzde: Math.round(karZararYuzde * 100) / 100,
    karmi: fark >= 0,
    kdvliFiyat: kdvliFiyat !== undefined ? Math.round(kdvliFiyat * 100) / 100 : undefined,
  };
}

export function hedefKarMarjindanSatisFiyati(
  alisFiyati: number,
  hedefMarjYuzde: number,
): number {
  return Math.round((alisFiyati / (1 - hedefMarjYuzde / 100)) * 100) / 100;
}

// ─── İndirim Hesaplama ───────────────────────────────────────────────────────
export interface IndirimSonucu {
  indirimliTutar?: number;
  tasarruf?: number;
  indirimOrani?: number;
  originalFiyat?: number;
}

export function indirimHesapla(mod: 'oran' | 'tutar' | 'oranBul' | 'asil', deger1: number, deger2: number): IndirimSonucu {
  switch (mod) {
    case 'oran': {
      // deger1 = asıl fiyat, deger2 = indirim %
      const tasarruf = deger1 * (deger2 / 100);
      return {
        indirimliTutar: Math.round((deger1 - tasarruf) * 100) / 100,
        tasarruf: Math.round(tasarruf * 100) / 100,
        indirimOrani: deger2,
      };
    }
    case 'tutar': {
      // deger1 = asıl fiyat, deger2 = indirim tutarı
      const oran = deger1 > 0 ? (deger2 / deger1) * 100 : 0;
      return {
        indirimliTutar: Math.round((deger1 - deger2) * 100) / 100,
        tasarruf: Math.round(deger2 * 100) / 100,
        indirimOrani: Math.round(oran * 100) / 100,
      };
    }
    case 'oranBul': {
      // deger1 = asıl fiyat, deger2 = indirimli fiyat
      const tasarruf = deger1 - deger2;
      const oran = deger1 > 0 ? (tasarruf / deger1) * 100 : 0;
      return {
        indirimliTutar: Math.round(deger2 * 100) / 100,
        tasarruf: Math.round(tasarruf * 100) / 100,
        indirimOrani: Math.round(oran * 100) / 100,
      };
    }
    case 'asil': {
      // deger1 = indirimli fiyat, deger2 = indirim %
      const asil = deger2 < 100 ? deger1 / (1 - deger2 / 100) : deger1;
      const tasarruf = asil - deger1;
      return {
        originalFiyat: Math.round(asil * 100) / 100,
        indirimliTutar: Math.round(deger1 * 100) / 100,
        tasarruf: Math.round(tasarruf * 100) / 100,
        indirimOrani: deger2,
      };
    }
    default:
      return {};
  }
}

// ─── Kira Getirisi Hesaplama ─────────────────────────────────────────────────
export interface KiraGetirisiSonucu {
  brutGetiriYuzde: number;
  netGetiriYuzde: number;
  geriOdemeSuresiYil: number;
  yillikKira: number;
  yillikNetKira: number;
}

export function kiraGetirisi(
  aylikKira: number,
  mulkDegeri: number,
  yillikGiderler: number, // aidat, emlak vergisi, sigorta vb.
): KiraGetirisiSonucu {
  const yillikKira = aylikKira * 12;
  const brutGetiriYuzde = mulkDegeri > 0 ? (yillikKira / mulkDegeri) * 100 : 0;
  const yillikNetKira = yillikKira - yillikGiderler;
  const netGetiriYuzde = mulkDegeri > 0 ? (yillikNetKira / mulkDegeri) * 100 : 0;
  const geriOdemeSuresiYil = yillikNetKira > 0 ? mulkDegeri / yillikNetKira : Infinity;

  return {
    brutGetiriYuzde: Math.round(brutGetiriYuzde * 100) / 100,
    netGetiriYuzde: Math.round(netGetiriYuzde * 100) / 100,
    geriOdemeSuresiYil: Math.round(geriOdemeSuresiYil * 10) / 10,
    yillikKira: Math.round(yillikKira * 100) / 100,
    yillikNetKira: Math.round(yillikNetKira * 100) / 100,
  };
}

// ─── Birikim Hesaplama (Bileşik Faiz + Aylık Katkı) ─────────────────────────
export interface BirikimSonucu {
  toplamBirikim: number;
  toplamFaizGetirisi: number;
  toplamKatki: number;
  grafikData: Array<{ ay: number; birikim: number; katkiTopla: number }>;
}

export function birikimHesapla(
  baslangicTutari: number,
  aylikKatki: number,
  yillikFaizOrani: number, // %
  sureYil: number,
  bilesikFrekansi: number, // yılda kaç kez (12=aylık, 4=çeyreklik, 1=yıllık)
): BirikimSonucu {
  const r = yillikFaizOrani / 100;
  const n = bilesikFrekansi;
  const t = sureYil;
  const totalAy = sureYil * 12;

  const grafikData: BirikimSonucu['grafikData'] = [];
  let mevcutTutar = baslangicTutari;
  let katkiTopla = baslangicTutari;
  const aylikFaizOrani = r / 12;

  for (let ay = 1; ay <= totalAy; ay++) {
    mevcutTutar = mevcutTutar * (1 + aylikFaizOrani) + aylikKatki;
    katkiTopla += aylikKatki;
    if (ay % 12 === 0 || ay === totalAy) {
      grafikData.push({ ay, birikim: Math.round(mevcutTutar), katkiTopla: Math.round(katkiTopla) });
    }
  }

  // Ana formül (bileşik frekansı ile)
  const fvAnapara = baslangicTutari * Math.pow(1 + r / n, n * t);
  const fvKatki = aylikKatki > 0
    ? aylikKatki * ((Math.pow(1 + r / 12, 12 * t) - 1) / (r / 12))
    : 0;
  const toplamBirikim = fvAnapara + fvKatki;
  const toplamKatki = baslangicTutari + aylikKatki * 12 * t;
  const toplamFaizGetirisi = toplamBirikim - toplamKatki;

  return {
    toplamBirikim: Math.round(toplamBirikim * 100) / 100,
    toplamFaizGetirisi: Math.round(toplamFaizGetirisi * 100) / 100,
    toplamKatki: Math.round(toplamKatki * 100) / 100,
    grafikData,
  };
}

// ─── LGS Puan Hesaplama ──────────────────────────────────────────────────────
export interface LgsDersNets {
  turkce: number;
  matematik: number;
  fen: number;
  inkilap: number;
  din: number;
  ingilizce: number;
}

export interface LgsSonucu {
  netleri: LgsDersNets;
  toplamNet: number;
  lgsPuani: number;
}

const LGS_KATSAYILARI = {
  turkce:    { soru: 20, dogru: 4.0,  yanlis: 1 },
  matematik: { soru: 20, dogru: 4.0,  yanlis: 1 },
  fen:       { soru: 20, dogru: 3.6,  yanlis: 1 },
  inkilap:   { soru: 10, dogru: 2.2,  yanlis: 1 },
  din:       { soru: 10, dogru: 1.6,  yanlis: 1 },
  ingilizce: { soru: 10, dogru: 1.0,  yanlis: 1 },
};

export function lgsPuanHesapla(
  dogru: LgsDersNets,
  yanlis: LgsDersNets,
): LgsSonucu {
  const k = LGS_KATSAYILARI;
  const netleri: LgsDersNets = {
    turkce:    Math.max(0, dogru.turkce    - yanlis.turkce    / k.turkce.yanlis),
    matematik: Math.max(0, dogru.matematik - yanlis.matematik / k.matematik.yanlis),
    fen:       Math.max(0, dogru.fen       - yanlis.fen       / k.fen.yanlis),
    inkilap:   Math.max(0, dogru.inkilap   - yanlis.inkilap   / k.inkilap.yanlis),
    din:       Math.max(0, dogru.din       - yanlis.din       / k.din.yanlis),
    ingilizce: Math.max(0, dogru.ingilizce - yanlis.ingilizce / k.ingilizce.yanlis),
  };

  const toplamNet = Object.values(netleri).reduce((a, b) => a + b, 0);

  const hamPuan =
    100 +
    netleri.turkce    * k.turkce.dogru +
    netleri.matematik * k.matematik.dogru +
    netleri.fen       * k.fen.dogru +
    netleri.inkilap   * k.inkilap.dogru +
    netleri.din       * k.din.dogru +
    netleri.ingilizce * k.ingilizce.dogru;

  return {
    netleri: {
      turkce:    Math.round(netleri.turkce    * 100) / 100,
      matematik: Math.round(netleri.matematik * 100) / 100,
      fen:       Math.round(netleri.fen       * 100) / 100,
      inkilap:   Math.round(netleri.inkilap   * 100) / 100,
      din:       Math.round(netleri.din       * 100) / 100,
      ingilizce: Math.round(netleri.ingilizce * 100) / 100,
    },
    toplamNet: Math.round(toplamNet * 100) / 100,
    lgsPuani:  Math.max(100, Math.round(hamPuan * 100) / 100),
  };
}

// ─── Vücut Yağ Oranı (US Navy Formülü) ──────────────────────────────────────
export interface VucutYagSonucu {
  yagOrani: number;
  kategori: string;
  kategoriRenk: string;
  yagKutlesi: number;   // kg
  yagsizKutle: number;  // kg (LBM)
}

export function vucutYagOrani(
  cinsiyet: 'erkek' | 'kadin',
  boyuCm: number,
  belCm: number,
  boyunCm: number,
  kaliCm?: number, // sadece kadın
  kilogram?: number, // opsiyonel (yağ kütlesi hesabı için)
): VucutYagSonucu {
  let oran: number;

  if (cinsiyet === 'erkek') {
    oran =
      495 /
        (1.0324 - 0.19077 * Math.log10(belCm - boyunCm) + 0.15456 * Math.log10(boyuCm)) -
      450;
  } else {
    const kalca = kaliCm ?? 90;
    oran =
      495 /
        (1.29579 - 0.35004 * Math.log10(belCm + kalca - boyunCm) + 0.221 * Math.log10(boyuCm)) -
      450;
  }

  oran = Math.max(0, Math.min(70, oran));

  let kategori: string;
  let kategoriRenk: string;

  if (cinsiyet === 'erkek') {
    if (oran < 6)        { kategori = 'Temel Yağ';  kategoriRenk = 'text-blue-600'; }
    else if (oran < 14)  { kategori = 'Atletik';    kategoriRenk = 'text-green-600'; }
    else if (oran < 18)  { kategori = 'Fit';        kategoriRenk = 'text-emerald-600'; }
    else if (oran < 25)  { kategori = 'Ortalama';   kategoriRenk = 'text-yellow-600'; }
    else                 { kategori = 'Obez';        kategoriRenk = 'text-red-600'; }
  } else {
    if (oran < 14)       { kategori = 'Temel Yağ';  kategoriRenk = 'text-blue-600'; }
    else if (oran < 21)  { kategori = 'Atletik';    kategoriRenk = 'text-green-600'; }
    else if (oran < 25)  { kategori = 'Fit';        kategoriRenk = 'text-emerald-600'; }
    else if (oran < 32)  { kategori = 'Ortalama';   kategoriRenk = 'text-yellow-600'; }
    else                 { kategori = 'Obez';        kategoriRenk = 'text-red-600'; }
  }

  const kilo = kilogram ?? 70;
  const yagKutlesi = kilo * (oran / 100);
  const yagsizKutle = kilo - yagKutlesi;

  return {
    yagOrani:    Math.round(oran * 10) / 10,
    kategori,
    kategoriRenk,
    yagKutlesi:  Math.round(yagKutlesi * 10) / 10,
    yagsizKutle: Math.round(yagsizKutle * 10) / 10,
  };
}

// ─── Enflasyon Hesaplama ─────────────────────────────────────────────────────
export interface EnflasyonSonucu {
  gelecekDeger: number;
  degerKaybi: number;
  satinAlmaGucuDegisimYuzde: number;
  bugunkunDeger?: number; // geriye doğru hesaplama
}

export function enflasyonHesapla(
  tutar: number,
  enflasyonOrani: number, // %
  yil: number,
  mod: 'ileri' | 'geri', // ileri: bugünkü paranın ilerideki değeri, geri: ilerideki değerin bugünkü karşılığı
): EnflasyonSonucu {
  const faktor = Math.pow(1 + enflasyonOrani / 100, yil);

  if (mod === 'ileri') {
    const gelecekDeger = tutar * faktor;
    const degerKaybi = gelecekDeger - tutar;
    const satinAlmaGucuDegisimYuzde = -((1 - 1 / faktor) * 100);
    return {
      gelecekDeger: Math.round(gelecekDeger * 100) / 100,
      degerKaybi:   Math.round(degerKaybi * 100) / 100,
      satinAlmaGucuDegisimYuzde: Math.round(satinAlmaGucuDegisimYuzde * 100) / 100,
    };
  } else {
    // geri: X TL'nin n yıl önceki satın alma gücü
    const bugunkunDeger = tutar / faktor;
    const degerKaybi = tutar - bugunkunDeger;
    const satinAlmaGucuDegisimYuzde = -((1 - 1 / faktor) * 100);
    return {
      gelecekDeger: tutar,
      bugunkunDeger: Math.round(bugunkunDeger * 100) / 100,
      degerKaybi:   Math.round(degerKaybi * 100) / 100,
      satinAlmaGucuDegisimYuzde: Math.round(satinAlmaGucuDegisimYuzde * 100) / 100,
    };
  }
}

// ─── Kıst Gün Maaş Hesaplama ─────────────────────────────────────────────────
export interface KistGunSonucu {
  gunlukBrutMaas: number;
  kistBrutMaas: number;
  kistNetMaas: number;
  kistSgkIsci: number;
  kistIssizlik: number;
  kistGelirVergisi: number;
  kistDamgaVergisi: number;
}

export function kistGunMaas(
  aylikBrutMaas: number,
  calistigiGunSayisi: number,
  medeniDurum: MedeniDurum,
  cocukSayisi: number,
): KistGunSonucu {
  const gunlukBrutMaas = aylikBrutMaas / 30;
  const kistBrutMaas = gunlukBrutMaas * calistigiGunSayisi;

  // Orantısal net hesaplama
  const tamAy = grossToNet(aylikBrutMaas, medeniDurum, cocukSayisi);
  const oran = kistBrutMaas / aylikBrutMaas;

  const kistNetMaas = tamAy.netMaas * oran;
  const kistSgkIsci = tamAy.sgkIsciBrut * oran;
  const kistIssizlik = tamAy.issizlikIsciBrut * oran;
  const kistGelirVergisi = tamAy.gelirVergisi * oran;
  const kistDamgaVergisi = tamAy.damgaVergisi * oran;

  return {
    gunlukBrutMaas: Math.round(gunlukBrutMaas * 100) / 100,
    kistBrutMaas:   Math.round(kistBrutMaas * 100) / 100,
    kistNetMaas:    Math.round(kistNetMaas * 100) / 100,
    kistSgkIsci:    Math.round(kistSgkIsci * 100) / 100,
    kistIssizlik:   Math.round(kistIssizlik * 100) / 100,
    kistGelirVergisi: Math.round(kistGelirVergisi * 100) / 100,
    kistDamgaVergisi: Math.round(kistDamgaVergisi * 100) / 100,
  };
}

import { grossToNet, netToGross, severanceCalculator } from './src/lib/calculations';

describe('grossToNet', () => {
  // 2026 asgari ücret: 22.104,67 TL brüt → net hesabı
  it('asgari ücret için net maaşı doğru hesaplar (bekâr, 0 çocuk)', () => {
    const sonuc = grossToNet(22104.67, 'bekar', 0);

    // SGK işçi: 22104.67 * 0.14 = 3094.65
    expect(sonuc.sgkIsciBrut).toBeCloseTo(22104.67 * 0.14, 1);

    // İşsizlik: 22104.67 * 0.01 = 221.05
    expect(sonuc.issizlikIsciBrut).toBeCloseTo(22104.67 * 0.01, 1);

    // Vergi matrahı: 22104.67 * 0.85 = 18788.97
    expect(sonuc.vergiBrut).toBeCloseTo(22104.67 * 0.85, 1);

    // Damga vergisi: 22104.67 * 0.00759 = 167.81
    expect(sonuc.damgaVergisi).toBeCloseTo(22104.67 * 0.00759, 1);

    // Net pozitif olmalı
    expect(sonuc.netMaas).toBeGreaterThan(0);

    // Net < brüt olmalı
    expect(sonuc.netMaas).toBeLessThan(sonuc.brutMaas);
  });

  it('evli, eş çalışmıyor, 2 çocuk için AGİ bekârdan yüksek olmalı', () => {
    const bekar = grossToNet(22104.67, 'bekar', 0);
    const evli2Cocuk = grossToNet(22104.67, 'evliEsCalismiyor', 2);
    expect(evli2Cocuk.agiTutari).toBeGreaterThan(bekar.agiTutari);
    expect(evli2Cocuk.netMaas).toBeGreaterThan(bekar.netMaas);
  });

  it('yüksek maaşta vergi matrahı > %27 diliminde hesaplanır', () => {
    const sonuc = grossToNet(100000, 'bekar', 0);
    // Aylık 100k brüt → yıllık ~85k matrah → %27 diliminde
    expect(sonuc.gelirVergisi).toBeGreaterThan(0);
    expect(sonuc.netMaas).toBeLessThan(sonuc.brutMaas);
  });

  it('işveren toplam maliyeti brütten yüksek olmalı', () => {
    const sonuc = grossToNet(30000, 'bekar', 0);
    expect(sonuc.toplamIsverenMaliyeti).toBeGreaterThan(sonuc.brutMaas);
  });
});

describe('netToGross', () => {
  it('tutarlılık: netToGross → grossToNet geri dönüşü', () => {
    const hedefNet = 25000;
    const brutSonuc = netToGross(hedefNet, 'bekar', 0);
    const kontrol = grossToNet(brutSonuc.brutMaas, 'bekar', 0);

    // Bulunan brüt üzerinden hesaplanan net, hedef nete yakın olmalı (0.01 TL hassasiyet)
    expect(Math.abs(kontrol.netMaas - hedefNet)).toBeLessThan(0.1);
  });

  it('netToGross her zaman brutMaas > netMaas döndürür', () => {
    const sonuc = netToGross(20000, 'evliEsCalismiyor', 1);
    expect(sonuc.brutMaas).toBeGreaterThan(sonuc.netMaas);
  });

  it('farklı medeni durumlar için tutarlılık', () => {
    const durumlar: Array<{ medeni: Parameters<typeof netToGross>[1]; cocuk: number }> = [
      { medeni: 'bekar', cocuk: 0 },
      { medeni: 'evliEsCalisiyor', cocuk: 1 },
      { medeni: 'evliEsCalismiyor', cocuk: 3 },
    ];

    for (const { medeni, cocuk } of durumlar) {
      const brutSonuc = netToGross(30000, medeni, cocuk);
      const kontrol = grossToNet(brutSonuc.brutMaas, medeni, cocuk);
      expect(Math.abs(kontrol.netMaas - 30000)).toBeLessThan(0.1);
    }
  });
});

describe('severanceCalculator', () => {
  it('tam 3 yıl için kıdem tazminatını doğru hesaplar', () => {
    const giris = new Date('2020-01-01');
    const cikis = new Date('2023-01-01'); // 3 * 365 = 1095 gün (2020 artık yıl: 366)
    const sonuc = severanceCalculator(giris, cikis, 30000, 0, 0, 0);

    // Çalışma günü ≈ 1095 veya 1096 (artık yıl)
    expect(sonuc.calismaGunSayisi).toBeGreaterThanOrEqual(1095);
    expect(sonuc.calismaGunSayisi).toBeLessThanOrEqual(1097);

    // Tazminat pozitif olmalı
    expect(sonuc.tazminatTutari).toBeGreaterThan(0);

    // Vergiden muaf
    expect(sonuc.vergidentMuaf).toBe(true);
  });

  it('tavan aşıldığında tavan maaşla hesaplar', () => {
    const giris = new Date('2020-01-01');
    const cikis = new Date('2023-01-01');

    // Maaş tavandan yüksek (200.000 TL)
    const tavan = severanceCalculator(giris, cikis, 200000, 0, 0, 0);
    // Normal maaş < tavan
    const normal = severanceCalculator(giris, cikis, 30000, 0, 0, 0);

    // Her iki hesaplamada da maaş tavanla sınırlanmalı
    expect(tavan.tazminatTutari).toBeGreaterThan(normal.tazminatTutari);
    // Tavan maaş 64948.77/30 günlük brüte eşit olmalı
    const beklenenGunluk = 64948.77 / 30;
    expect(tavan.gunlukBrut).toBeCloseTo(beklenenGunluk, 1);
  });

  it('yemek, yol ve ikramiye hesaba dahil edilir', () => {
    const giris = new Date('2021-01-01');
    const cikis = new Date('2024-01-01');

    const sadeceMaas = severanceCalculator(giris, cikis, 20000, 0, 0, 0);
    const eklerle = severanceCalculator(giris, cikis, 20000, 2000, 1000, 12000);

    expect(eklerle.tazminatTutari).toBeGreaterThan(sadeceMaas.tazminatTutari);
  });

  it('çalışma süresi hesabı doğru: tam yıl ve kalan gün', () => {
    const giris = new Date('2020-06-15');
    const cikis = new Date('2023-09-15');
    const sonuc = severanceCalculator(giris, cikis, 25000, 0, 0, 0);

    expect(sonuc.tamYil).toBe(Math.floor(sonuc.calismaGunSayisi / 365));
    expect(sonuc.kalanGun).toBe(sonuc.calismaGunSayisi % 365);
  });
});

// Para formatı: Türkçe locale, TL sembolü
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Para formatı: sembol olmadan (tablo içi kullanım)
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Tarih formatı: GG.AA.YYYY
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('tr-TR').format(date);
}

// Çalışma süresini metin olarak döner: "X yıl Y ay Z gün"
export function formatCalismaSuresi(gunSayisi: number): string {
  const yil = Math.floor(gunSayisi / 365);
  const kalanGun = gunSayisi % 365;
  const ay = Math.floor(kalanGun / 30);
  const gun = kalanGun % 30;

  const parcalar: string[] = [];
  if (yil > 0) parcalar.push(`${yil} yıl`);
  if (ay > 0) parcalar.push(`${ay} ay`);
  if (gun > 0) parcalar.push(`${gun} gün`);
  if (parcalar.length === 0) return '0 gün';
  return parcalar.join(' ');
}

// Input string'ini sayıya çevirir (Türk klavye: virgül ondalık ayırıcıdır)
export function parseInputToNumber(value: string): number {
  // Binlik nokta ayırıcıları kaldır, virgülü noktaya çevir
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

// Sayıyı Türkçe input string'ine çevirir (binlik nokta, ondalık virgül)
export function formatInputValue(value: number): string {
  if (value === 0) return '';
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

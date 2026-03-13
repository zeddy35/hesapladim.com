import {
  Wallet, FileText, Receipt, Percent, CalendarDays, Cake, Ruler, Scale,
  Timer, ArrowLeftRight, Building2, Activity, Flame, Baby, Target,
  Droplets, Footprints, Moon, BookOpen, GraduationCap, BarChart3,
  Calculator, Award, FileCheck, Home, TrendingUp, Stamp, Key, Bell,
  Clock, Car,
  Briefcase, Landmark, PiggyBank, HeartPulse, School, Calendar, Sigma, Sparkles,
  type LucideIcon,
} from 'lucide-react';

export interface Tool {
  href: string;
  name: string;
  description: string;
  keywords: string[];
  categoryId: string;
  icon: LucideIcon;
  isNew?: boolean;
  comingSoon?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  colorClass: string;
  borderClass: string;
  bgClass: string;
  iconBgClass: string;
  bgBarClass: string;
  tools: Tool[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'calisma',
    name: 'Çalışan & Bordro',
    icon: Briefcase,
    colorClass: 'text-blue-600',
    borderClass: 'border-blue-500',
    bgClass: 'bg-blue-50',
    iconBgClass: 'bg-blue-100',
    bgBarClass: 'bg-blue-600',
    tools: [
      {
        href: '/brutten-nete',
        name: 'Brütten Nete Maaş',
        description: '2026 güncel gelir vergisi dilimleriyle brüt maaşınızdan net ele geçen tutarı hesaplayın.',
        keywords: ['maaş', 'brüt', 'net', 'bordro', 'sgk', 'gelir vergisi', 'çalışan', 'sigorta'],
        categoryId: 'calisma',
        icon: Wallet,
      },
      {
        href: '/kidem-tazminati',
        name: 'Kıdem Tazminatı',
        description: 'İşe giriş ve çıkış tarihinizi girerek yasal tavan dahilinde kıdem tazminatınızı öğrenin.',
        keywords: ['kıdem', 'tazminat', 'işten çıkış', 'hizmet süresi', 'tavan', 'iş kanunu'],
        categoryId: 'calisma',
        icon: FileText,
      },
      {
        href: '/ihbar-tazminati-hesaplama',
        name: 'İhbar Tazminatı',
        description: 'Çalışma sürenize göre ihbar sürenizi (2–8 hafta) ve tazminat tutarını hesaplayın.',
        keywords: ['ihbar', 'tazminat', 'bildirim süresi', 'işten çıkarma', 'iş akdi', 'fesih'],
        categoryId: 'calisma',
        icon: Bell,
      },
      {
        href: '/fazla-mesai-hesaplama',
        name: 'Fazla Mesai Ücreti',
        description: 'Haftalık, gece ve tatil fazla mesai ücretinizi brüt maaşınızdan hesaplayın.',
        keywords: ['fazla mesai', 'haftalık mesai', 'gece mesai', 'tatil mesai', 'zam', 'overtime'],
        categoryId: 'calisma',
        icon: Clock,
      },
    ],
  },
  {
    id: 'vergi',
    name: 'Vergi & Hukuk',
    icon: Landmark,
    colorClass: 'text-violet-600',
    borderClass: 'border-violet-500',
    bgClass: 'bg-violet-50',
    iconBgClass: 'bg-violet-100',
    bgBarClass: 'bg-violet-600',
    tools: [
      {
        href: '/kdv-hesaplama',
        name: 'KDV Hesaplama',
        description: 'KDV hariç/dahil fiyatları %1, %8, %10, %18 ve %20 oranlarıyla anında hesaplayın.',
        keywords: ['kdv', 'katma değer vergisi', 'fiyat', 'vergi', '%18', '%20', 'vergili fiyat'],
        categoryId: 'vergi',
        icon: Receipt,
      },
      {
        href: '/damga-vergisi-hesaplama',
        name: 'Damga Vergisi',
        description: 'Kira kontratı, maaş bordrosu ve sözleşme için damga vergisi hesaplayın.',
        keywords: ['damga vergisi', 'kira kontratı', 'sözleşme', 'belge', 'bordro damga', 'ihale'],
        categoryId: 'vergi',
        icon: Stamp,
      },
      {
        href: '/tapu-harci-hesaplama',
        name: 'Tapu Harcı',
        description: 'Gayrimenkul satış, bağış ve ipotek işlemleri için tapu harcını hesaplayın.',
        keywords: ['tapu harcı', 'gayrimenkul', 'satış', 'bağış', 'ipotek', 'konut', 'emlak'],
        categoryId: 'vergi',
        icon: Key,
      },
      {
        href: '/otv-hesaplama',
        name: 'ÖTV Hesaplama',
        description: '2026 araç ÖTV oranlarıyla liste fiyatından ÖTV, KDV ve vergisiz fiyatı görün.',
        keywords: ['özel tüketim vergisi', 'otv', 'araç', 'araba', 'motorlu taşıt', 'sıfır araç'],
        categoryId: 'vergi',
        icon: Car,
        isNew: true,
      },
      {
        href: '/kira-artis-hesaplama',
        name: 'Kira Artış Hesaplama',
        description: '2026 TÜFE bazlı yasal kira artış tavanını ve yeni kira tutarını hesaplayın.',
        keywords: ['kira artış', 'tüfe', 'enflasyon', 'kiracı', 'kontrat', 'yasal tavan', 'kira zammı'],
        categoryId: 'vergi',
        icon: Home,
        isNew: true,
      },
    ],
  },
  {
    id: 'finans',
    name: 'Kişisel Finans',
    icon: PiggyBank,
    colorClass: 'text-cyan-600',
    borderClass: 'border-cyan-500',
    bgClass: 'bg-cyan-50',
    iconBgClass: 'bg-cyan-100',
    bgBarClass: 'bg-cyan-600',
    tools: [
      {
        href: '/mevduat-faiz-hesaplama',
        name: 'Mevduat Faizi',
        description: 'Anapara ve faiz oranınıza göre net kazancınızı ve stopaj vergisini hesaplayın.',
        keywords: ['mevduat', 'faiz', 'banka', 'stopaj', 'getiri', 'anapara', 'vadeli', 'yatırım'],
        categoryId: 'finans',
        icon: TrendingUp,
        isNew: true,
      },
      {
        href: '/yuzde-hesaplama',
        name: 'Yüzde Hesaplama',
        description: '5 farklı modda yüzde hesaplama: artış, azalış, oran bulma ve yüzde değişim.',
        keywords: ['yüzde', 'oran', 'artış', 'azalış', 'değişim', 'indirim', '%'],
        categoryId: 'finans',
        icon: Percent,
      },
    ],
  },
  {
    id: 'saglik',
    name: 'Sağlık & Yaşam',
    icon: HeartPulse,
    colorClass: 'text-red-600',
    borderClass: 'border-red-500',
    bgClass: 'bg-red-50',
    iconBgClass: 'bg-red-100',
    bgBarClass: 'bg-red-600',
    tools: [
      {
        href: '/vki-hesaplama',
        name: 'VKİ Hesaplama',
        description: 'Vücut Kitle İndeksinizi, ideal kilo aralığınızı ve kategorinizi öğrenin.',
        keywords: ['vki', 'bmi', 'kilo', 'boy', 'ideal kilo', 'obezite', 'vücut kitle endeksi'],
        categoryId: 'saglik',
        icon: Activity,
      },
      {
        href: '/kalori-hesaplama',
        name: 'Kalori Hesaplama',
        description: 'Harris-Benedict formülüyle günlük kalori ihtiyacınızı aktivite seviyenize göre hesaplayın.',
        keywords: ['kalori', 'diyet', 'aktivite', 'metabolizma', 'tdee', 'günlük kalori'],
        categoryId: 'saglik',
        icon: Flame,
      },
      {
        href: '/gebelik-haftasi-hesaplama',
        name: 'Gebelik Haftası',
        description: 'Son adet tarihinize göre gebelik haftanızı ve tahmini doğum gününüzü bulun.',
        keywords: ['gebelik', 'hamilelik', 'doğum tarihi', 'trimester', 'anne', 'bebek'],
        categoryId: 'saglik',
        icon: Baby,
      },
      {
        href: '/ideal-kilo-hesaplama',
        name: 'İdeal Kilo',
        description: 'Devine, Robinson, Miller ve Hamilton formülleriyle boyunuza göre ideal kilonuzu hesaplayın.',
        keywords: ['ideal kilo', 'boy', 'devine', 'robinson', 'miller', 'hamilton'],
        categoryId: 'saglik',
        icon: Target,
      },
      {
        href: '/su-ihtiyaci-hesaplama',
        name: 'Su İhtiyacı',
        description: 'Kilonuza ve aktivite seviyenize göre günlük su ihtiyacınızı ve bardak sayınızı bulun.',
        keywords: ['su', 'hidrasyon', 'günlük su', 'bardak sayısı', 'içme suyu'],
        categoryId: 'saglik',
        icon: Droplets,
      },
      {
        href: '/adim-kalori-hesaplama',
        name: 'Adım / Kalori',
        description: 'Attığınız adım sayısına göre yakılan kalori ve kat edilen mesafeyi hesaplayın.',
        keywords: ['adım', 'yürüyüş', 'kalori', 'mesafe', 'pedometer', 'step'],
        categoryId: 'saglik',
        icon: Footprints,
      },
      {
        href: '/uyku-saati-hesaplama',
        name: 'Uyku Saati',
        description: 'Uyanmak istediğiniz saate göre uyku döngüsüne uygun ideal yatış saatlerini keşfedin.',
        keywords: ['uyku', 'uyku döngüsü', 'yatış saati', 'uyanma saati', 'uyku kalitesi'],
        categoryId: 'saglik',
        icon: Moon,
        isNew: true,
      },
    ],
  },
  {
    id: 'egitim',
    name: 'Eğitim & Sınav',
    icon: School,
    colorClass: 'text-emerald-600',
    borderClass: 'border-emerald-500',
    bgClass: 'bg-emerald-50',
    iconBgClass: 'bg-emerald-100',
    bgBarClass: 'bg-emerald-600',
    tools: [
      {
        href: '/tyt-puan-hesaplama',
        name: 'TYT Puan Hesaplama',
        description: 'TYT doğru/yanlış sayılarınızdan net ve tahmini TYT puanınızı hesaplayın.',
        keywords: ['tyt', 'yks', 'puan', 'net', 'sınav', 'ösym', 'temel yeterlilik'],
        categoryId: 'egitim',
        icon: BookOpen,
      },
      {
        href: '/ayt-puan-hesaplama',
        name: 'AYT Puan Hesaplama',
        description: 'Sayısal, EA, Sözel ve Dil alanları için AYT puan hesaplama aracı.',
        keywords: ['ayt', 'yks', 'sayısal', 'sözel', 'eşit ağırlık', 'dil', 'alan yeterlilik'],
        categoryId: 'egitim',
        icon: GraduationCap,
      },
      {
        href: '/yks-yuzdelik-dilim',
        name: 'YKS Yüzdelik Dilim',
        description: 'Puanınıza göre tahmini yüzdelik diliminizi ve sıralamanızı öğrenin.',
        keywords: ['yks', 'yüzdelik dilim', 'sıralama', 'üniversite', 'ösym', 'kontenjan'],
        categoryId: 'egitim',
        icon: BarChart3,
      },
      {
        href: '/not-ortalamasi-hesaplama',
        name: 'Not Ortalaması',
        description: 'Ağırlıklı not ortalamanızı, harf notunuzu ve GPA değerinizi hesaplayın.',
        keywords: ['not ortalaması', 'gano', 'harf notu', 'ağırlıklı ortalama', 'vize', 'final'],
        categoryId: 'egitim',
        icon: Calculator,
      },
      {
        href: '/gpa-hesaplama',
        name: 'GPA Hesaplama',
        description: "4.0 ve 100'lük GPA değerinizi harf notlarınızdan kolayca hesaplayın.",
        keywords: ['gpa', 'not ortalaması', '4.0', 'üniversite', 'cgpa', 'transcript'],
        categoryId: 'egitim',
        icon: Award,
        isNew: true,
      },
      {
        href: '/kpss-puan-hesaplama',
        name: 'KPSS Puan Hesaplama',
        description: 'GK ve GY doğru/yanlışlarından KPSS P3, P10, P93 ve P94 puanlarını hesaplayın.',
        keywords: ['kpss', 'devlet memuru', 'p3', 'p10', 'p93', 'gk', 'gy', 'genel kültür'],
        categoryId: 'egitim',
        icon: FileCheck,
      },
    ],
  },
  {
    id: 'zaman',
    name: 'Zaman & Tarih',
    icon: Calendar,
    colorClass: 'text-pink-600',
    borderClass: 'border-pink-500',
    bgClass: 'bg-pink-50',
    iconBgClass: 'bg-pink-100',
    bgBarClass: 'bg-pink-600',
    tools: [
      {
        href: '/tarih-farki-hesaplama',
        name: 'Tarih Farkı',
        description: 'İki tarih arasındaki gün, ay, yıl, hafta farkını ve X gün sonrasını hesaplayın.',
        keywords: ['tarih farkı', 'gün hesaplama', 'tarih arasındaki süre', 'kaç gün'],
        categoryId: 'zaman',
        icon: CalendarDays,
      },
      {
        href: '/yas-hesaplama',
        name: 'Yaş Hesaplama',
        description: 'Doğum tarihinizden yaşınızı, burç bilginizi ve doğum gününüze kalan günü öğrenin.',
        keywords: ['yaş', 'doğum tarihi', 'burç', 'doğum günü', 'kaç yaşında'],
        categoryId: 'zaman',
        icon: Cake,
      },
      {
        href: '/zaman-donusturme',
        name: 'Zaman Dönüştürme',
        description: 'Saniye, dakika, saat, gün, hafta, ay ve yıl arasında anında dönüştürme.',
        keywords: ['zaman dönüştürme', 'saniye', 'dakika', 'saat', 'gün', 'hafta', 'dönüştür'],
        categoryId: 'zaman',
        icon: Timer,
      },
    ],
  },
  {
    id: 'matematik',
    name: 'Matematik',
    icon: Sigma,
    colorClass: 'text-amber-600',
    borderClass: 'border-amber-500',
    bgClass: 'bg-amber-50',
    iconBgClass: 'bg-amber-100',
    bgBarClass: 'bg-amber-600',
    tools: [
      {
        href: '/alan-hesaplama',
        name: 'Alan Hesaplama',
        description: 'Kare, daire, üçgen ve daha fazlası için alan ve çevre hesaplama.',
        keywords: ['alan', 'çevre', 'geometri', 'kare', 'daire', 'üçgen', 'dikdörtgen'],
        categoryId: 'matematik',
        icon: Ruler,
      },
      {
        href: '/oran-orantiyi-hesaplama',
        name: 'Oran Orantı',
        description: 'a/b = c/d denkleminde bilinmeyeni adım adım çözün.',
        keywords: ['oran', 'orantı', 'bilinmeyen', 'x', 'kesir', 'doğru orantı'],
        categoryId: 'matematik',
        icon: Scale,
      },
    ],
  },
  {
    id: 'yakinda',
    name: 'Yakında',
    icon: Sparkles,
    colorClass: 'text-slate-500',
    borderClass: 'border-slate-300',
    bgClass: 'bg-slate-50',
    iconBgClass: 'bg-slate-100',
    bgBarClass: 'bg-slate-400',
    tools: [
      {
        href: '#',
        name: 'Netten Brüte',
        description: 'Almak istediğiniz net maaşa göre brüt rakamını tersine hesaplayın.',
        keywords: ['netten brüte', 'net', 'brüt', 'maaş', 'tersine'],
        categoryId: 'yakinda',
        icon: ArrowLeftRight,
        comingSoon: true,
      },
      {
        href: '#',
        name: 'İşveren Maliyeti',
        description: 'SGK işveren payıyla toplam işveren maliyetini görün.',
        keywords: ['işveren', 'maliyet', 'sgk', 'işveren payı', 'toplam maliyet'],
        categoryId: 'yakinda',
        icon: Building2,
        comingSoon: true,
      },
    ],
  },
];

export const ALL_TOOLS: Tool[] = CATEGORIES.filter(c => c.id !== 'yakinda').flatMap(c => c.tools);

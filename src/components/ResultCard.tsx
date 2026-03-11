interface ResultCardProps {
  baslik: string;
  deger: string;
  renk?: 'mavi' | 'yesil' | 'kirmizi' | 'mor';
  kucuk?: boolean;
}

const RENK_SINIFLAR = {
  mavi: 'bg-blue-800 text-white',
  yesil: 'bg-green-700 text-white',
  kirmizi: 'bg-red-600 text-white',
  mor: 'bg-indigo-700 text-white',
};

export default function ResultCard({
  baslik,
  deger,
  renk = 'mavi',
  kucuk = false,
}: ResultCardProps) {
  return (
    <div className={`rounded-2xl p-5 shadow ${RENK_SINIFLAR[renk]}`}>
      <div className={`font-medium opacity-80 mb-1 ${kucuk ? 'text-xs' : 'text-sm'}`}>{baslik}</div>
      <div className={`font-extrabold tracking-tight ${kucuk ? 'text-xl' : 'text-3xl'}`}>{deger}</div>
    </div>
  );
}

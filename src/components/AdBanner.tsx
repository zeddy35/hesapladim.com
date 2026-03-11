'use client';

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'mid' | 'footer';
  size: '728x90' | '300x250' | '336x280';
}

const SIZE_CLS: Record<string, string> = {
  '728x90': 'w-full max-w-[728px] h-[90px]',
  '300x250': 'w-[300px] h-[250px]',
  '336x280': 'w-[336px] h-[280px]',
};

export default function AdBanner({ slot, size }: AdBannerProps) {
  return (
    <div className="flex justify-center my-3">
      <div
        className={`${SIZE_CLS[size] ?? 'w-full h-[90px]'} bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs select-none`}
        data-ad-slot={slot}
        data-ad-size={size}
      >
        {/* AdSense — {slot} {size} */}
        Reklam
      </div>
    </div>
  );
}

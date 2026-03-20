'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

// Her placement için AdSense konsolunda ayrı reklam birimi oluşturup
// aşağıdaki ID'leri güncelleyin.
const SLOT_IDS: Record<string, string> = {
  header:  '6416242523',
  sidebar: '6416242523', // TODO: AdSense konsolunda ayrı birim oluşturun
  mid:     '6416242523', // TODO: AdSense konsolunda ayrı birim oluşturun
  footer:  '6416242523', // TODO: AdSense konsolunda ayrı birim oluşturun
};

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'mid' | 'footer';
}

export default function AdBanner({ slot }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense yüklenemedi (reklam engelleyici vb.)
    }
  }, []);

  return (
    <div className="flex justify-center my-3 overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6165276073071269"
        data-ad-slot={SLOT_IDS[slot]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

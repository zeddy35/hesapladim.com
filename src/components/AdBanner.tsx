'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const SLOT_ID = '6416242523';

interface AdBannerProps {
  slot: 'header' | 'sidebar' | 'mid' | 'footer';
  size?: '728x90' | '300x250' | '336x280';
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
        data-ad-slot={SLOT_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie-consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function handle(accepted: boolean) {
    localStorage.setItem(STORAGE_KEY, accepted ? 'true' : 'false');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-2xl border-t border-slate-700">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm leading-relaxed text-slate-300 flex-1">
          Bu site deneyimi iyileştirmek ve ilgili reklamlar göstermek için çerez kullanır.{' '}
          <Link href="/gizlilik-politikasi" className="text-blue-400 underline hover:text-blue-300">
            Gizlilik Politikası
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handle(false)}
            className="px-4 py-2 text-sm rounded-lg border border-slate-600 hover:border-slate-400 text-slate-300 transition-colors"
          >
            Reddet
          </button>
          <button
            onClick={() => handle(true)}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold transition-colors"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}

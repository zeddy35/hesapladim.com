'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES } from '@/data/tools';

const MENU_CATEGORIES = CATEGORIES.filter(c => c.id !== 'yakinda');

export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function onEnter() {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  }

  function onLeave() {
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative"
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
      >
        Tüm Araçlar
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-[700px] bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-6 animate-in">
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            {MENU_CATEGORIES.map(cat => (
              <div key={cat.id}>
                <h3 className={`text-[11px] font-bold uppercase tracking-widest mb-2.5 ${cat.colorClass}`}>
                    {cat.name}
                </h3>
                <ul className="space-y-1">
                  {cat.tools.map(tool => (
                    <li key={tool.href}>
                      <Link
                        href={tool.href}
                        className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 py-0.5 transition-colors group"
                        onClick={() => setOpen(false)}
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-400 shrink-0 transition-colors" />
                        {tool.name}
                        {tool.isNew && (
                          <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full ml-auto">
                            YENİ
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

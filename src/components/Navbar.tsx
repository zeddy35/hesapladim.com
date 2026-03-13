'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Search, X, Menu } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import MegaMenu from '@/components/MegaMenu';
import { CATEGORIES } from '@/data/tools';

const MENU_CATEGORIES = CATEGORIES.filter(c => c.id !== 'yakinda');

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  function closeMobile() {
    setMobileOpen(false);
    setMobileSearch(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          onClick={closeMobile}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Calculator size={18} className="text-white" />
          </div>
          <span className="font-extrabold text-slate-800 text-[15px] tracking-tight hidden sm:block">
            hesaplayim<span className="text-blue-600">.com</span>
          </span>
        </Link>

        {/* Desktop search — center */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <SearchBar variant="navbar" />
        </div>

        {/* Desktop — mega menu */}
        <div className="hidden md:flex items-center ml-auto">
          <MegaMenu />
        </div>

        {/* Mobile — search icon + hamburger */}
        <div className="flex items-center gap-1 ml-auto md:hidden">
          <button
            onClick={() => { setMobileSearch(s => !s); setMobileOpen(false); }}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Arama"
          >
            {mobileSearch ? <X size={20} /> : <Search size={20} />}
          </button>
          <button
            onClick={() => { setMobileOpen(s => !s); setMobileSearch(false); }}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Menü"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile search panel */}
      {mobileSearch && (
        <div className="md:hidden px-4 py-3 border-t border-slate-100 bg-white">
          <SearchBar
            variant="navbar"
            placeholder="Hesaplayıcı ara..."
            onClose={closeMobile}
          />
        </div>
      )}

      {/* Mobile nav panel */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-slate-100 bg-white max-h-[80vh] overflow-y-auto">
          {MENU_CATEGORIES.map(cat => {
            const CatIcon = cat.icon;
            return (
            <div key={cat.id} className="px-4 py-4 border-b border-slate-50 last:border-0">
              <p className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mb-3 ${cat.colorClass}`}>
                <CatIcon className="h-3 w-3" />
                {cat.name}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {cat.tools.map(tool => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="text-sm text-slate-600 hover:text-blue-600 transition-colors py-0.5"
                    onClick={closeMobile}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            );
          })}
        </nav>
      )}
    </header>
  );
}

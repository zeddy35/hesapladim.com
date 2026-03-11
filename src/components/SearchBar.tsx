'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, X } from 'lucide-react';
import { CATEGORIES, ALL_TOOLS, type Tool, type Category } from '@/data/tools';

interface SearchResult {
  tool: Tool;
  category: Category;
}

interface Props {
  variant?: 'hero' | 'navbar';
  placeholder?: string;
  onClose?: () => void;
}

const CATEGORY_MAP = new Map(CATEGORIES.map(c => [c.id, c]));

const POPULAR_SHORTCUTS = [
  { name: 'Brütten Nete', href: '/brutten-nete' },
  { name: 'KDV Hesaplama', href: '/kdv-hesaplama' },
  { name: 'TYT Puan', href: '/tyt-puan-hesaplama' },
  { name: 'Kıdem Tazminatı', href: '/kidem-tazminati' },
  { name: 'VKİ', href: '/vki-hesaplama' },
];

function scoreMatch(tool: Tool, q: string): number {
  const lq = q.toLowerCase().trim();
  if (!lq) return 0;
  const nameLower = tool.name.toLowerCase();
  if (nameLower === lq) return 4;
  if (nameLower.startsWith(lq)) return 3;
  if (nameLower.includes(lq)) return 2;
  if (tool.keywords.some(k => k.toLowerCase().includes(lq))) return 1;
  return 0;
}

export default function SearchBar({
  variant = 'navbar',
  placeholder = 'Hesaplayıcı ara... örn: KDV, maaş',
  onClose,
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const hits = ALL_TOOLS
      .map(t => ({ tool: t, score: scoreMatch(t, q) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map(({ tool }) => ({ tool, category: CATEGORY_MAP.get(tool.categoryId)! }));
    setResults(hits);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(query), 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const flatList = query.trim() ? results.map(r => r.tool.href) : POPULAR_SHORTCUTS.map(p => p.href);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatList.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    }
    if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const href = flatList[activeIndex];
      if (href && href !== '#') {
        router.push(href);
        setOpen(false);
        setQuery('');
      }
    }
  }

  function navigate(href: string) {
    if (href && href !== '#') {
      router.push(href);
      setOpen(false);
      setQuery('');
      onClose?.();
    }
  }

  const grouped = results.reduce<Map<string, SearchResult[]>>((acc, r) => {
    const key = r.category.id;
    if (!acc.has(key)) acc.set(key, []);
    acc.get(key)!.push(r);
    return acc;
  }, new Map());

  const isHero = variant === 'hero';

  return (
    <div
      ref={containerRef}
      className={`relative ${isHero ? 'w-full max-w-2xl' : 'w-full'}`}
    >
      <div
        className={`flex items-center gap-2 bg-white rounded-xl border transition-all
          ${open ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'}
          ${isHero ? 'shadow-lg px-4 py-3.5' : 'shadow-sm px-3 py-2'}`}
      >
        <Search
          size={isHero ? 20 : 16}
          className="text-slate-400 shrink-0"
        />
        <input
          ref={inputRef}
          className="flex-1 bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-sm"
          placeholder={placeholder}
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setResults([]); inputRef.current?.focus(); }}
            className="text-slate-400 hover:text-slate-600 transition p-0.5"
            aria-label="Temizle"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[420px] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="p-3">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Popüler Aramalar
              </p>
              {POPULAR_SHORTCUTS.map((p, i) => (
                <button
                  key={p.href}
                  className={`flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-lg text-sm transition
                    ${activeIndex === i ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => navigate(p.href)}
                >
                  <Search size={13} className="text-slate-400 shrink-0" />
                  <span>{p.name}</span>
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500 text-sm">
              <Search size={24} className="mx-auto mb-2 text-slate-300" />
              <span className="font-medium text-slate-700">&ldquo;{query}&rdquo;</span> için sonuç bulunamadı.
            </div>
          ) : (
            <div className="p-2">
              {Array.from(grouped.entries()).map(([catId, items]) => {
                const cat = CATEGORY_MAP.get(catId)!;
                return (
                  <div key={catId} className="mb-2 last:mb-0">
                    <p className="text-[11px] font-semibold text-slate-400 px-3 py-1">
                      {cat.emoji} {cat.name}
                    </p>
                    {items.map(r => {
                      const flatIdx = results.indexOf(r);
                      const Icon = r.tool.icon;
                      return (
                        <button
                          key={r.tool.href}
                          className={`flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg transition
                            ${activeIndex === flatIdx ? 'bg-blue-50' : 'hover:bg-slate-50'}`}
                          onMouseEnter={() => setActiveIndex(flatIdx)}
                          onClick={() => navigate(r.tool.href)}
                        >
                          <span className={`p-1.5 rounded-lg shrink-0 ${cat.iconBgClass}`}>
                            <Icon size={14} className={cat.colorClass} />
                          </span>
                          <span className="flex-1 min-w-0 text-sm font-medium text-slate-800 truncate">
                            {r.tool.name}
                          </span>
                          <ArrowRight size={13} className="text-slate-300 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

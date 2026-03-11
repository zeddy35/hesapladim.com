'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/brutten-nete', label: 'Brütten Nete' },
  { href: '/kidem-tazminati', label: 'Kıdem Tazminatı' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 md:pl-[100px]">
          <span className="font-extrabold text-blue-800 text-lg hidden sm:block">
            Hesapladım.com
          </span>
        </Link>

        {/* Linkler */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                pathname === link.href
                  ? 'bg-blue-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-800'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

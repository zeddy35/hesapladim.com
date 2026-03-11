import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
        <Calculator size={32} className="text-white" />
      </div>
      <h1 className="text-6xl font-extrabold text-slate-800 mb-3">404</h1>
      <p className="text-lg text-slate-500 mb-8">
        Aradığınız sayfa bulunamadı.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}

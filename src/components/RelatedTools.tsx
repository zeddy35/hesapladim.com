import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ALL_TOOLS } from '@/data/tools';
import { relatedTools } from '@/data/related-tools';

export function RelatedTools({ slug }: { slug: string }) {
  const relatedSlugs = relatedTools[slug];
  if (!relatedSlugs?.length) return null;

  const tools = relatedSlugs
    .map((s) => ALL_TOOLS.find((t) => t.href === `/${s}`))
    .filter((t): t is NonNullable<typeof t> => t !== undefined);

  if (!tools.length) return null;

  return (
    <section className="mt-10 border-t border-slate-200 pt-8">
      <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        İlgili Hesaplayıcılar
      </h2>
      <div className="flex flex-wrap gap-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200
                       text-sm font-medium text-slate-700 bg-white
                       hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50
                       transition-colors"
          >
            {tool.name}
            <ArrowRight size={14} />
          </Link>
        ))}
      </div>
    </section>
  );
}

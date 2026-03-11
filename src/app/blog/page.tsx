import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { posts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog | Hesaplayım',
  description:
    'Maaş, vergi, kıdem tazminatı ve çalışma hakları hakkında güncel Türkçe rehberler.',
  alternates: { canonical: 'https://hesaplayim.com/blog' },
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Blog</h1>
      <p className="text-slate-500 mb-10">
        Maaş, vergi ve çalışma hakları hakkında güncel rehberler.
      </p>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-200 hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={12} />
                {post.date}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock size={12} />
                {post.readingTime}
              </span>
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Devamını Oku <ArrowRight size={14} />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Calculator } from 'lucide-react';
import { getPost, posts } from '@/data/posts';
import { FaqSchema } from '@/components/FaqSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { Breadcrumb } from '@/components/Breadcrumb';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://hesaplayim.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://hesaplayim.com/blog/${post.slug}`,
      images: [
        `/og?title=${encodeURIComponent(post.title)}&desc=${encodeURIComponent(post.excerpt)}`,
      ],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Ana Sayfa', url: 'https://hesaplayim.com' },
          { name: 'Blog', url: 'https://hesaplayim.com/blog' },
          { name: post.title, url: `https://hesaplayim.com/blog/${post.slug}` },
        ]}
      />
      <FaqSchema faqs={post.faqs} />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Breadcrumb
          items={[
            { label: 'Ana Sayfa', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]}
        />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar size={12} />
            Son güncelleme: {post.date}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />
            {post.readingTime}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-8">{post.title}</h1>

        {/* Article content */}
        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Related calculator CTA */}
        {post.relatedTool && (
          <div className="mt-10 p-5 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-2">
              <Calculator size={12} className="inline-block mr-1" /> İlgili Hesaplayıcı
            </p>
            <Link
              href={post.relatedTool.href}
              className="inline-flex items-center gap-2 text-base font-bold text-blue-700 hover:text-blue-900 transition-colors"
            >
              {post.relatedTool.name} →
            </Link>
          </div>
        )}

        {/* FAQ visible section */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-700 mb-6">Sık Sorulan Sorular</h2>
          <div className="space-y-6">
            {post.faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-semibold text-slate-800 mb-1.5">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} /> Tüm Yazılar
          </Link>
        </div>
      </div>
    </>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock3, ExternalLink, User2 } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fallbackBlogs } from '@/lib/data/fallback';

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const article = fallbackBlogs.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Blog Detail ]" title={article.title} description={article.excerpt} />

      <Card>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{article.category}</Badge>
          {article.readTime ? <Badge variant="muted">{article.readTime}</Badge> : null}
          {article.featured ? <Badge variant="muted">Featured</Badge> : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300/75">
          {article.author ? (
            <span className="inline-flex items-center gap-1.5">
              <User2 className="h-3.5 w-3.5" />
              {article.author}
            </span>
          ) : null}
          {article.readTime ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readTime}
            </span>
          ) : null}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mt-5 whitespace-pre-line text-sm text-slate-300/90">{article.content}</p>
        {article.references?.length ? (
          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="font-display text-lg font-semibold text-white">References</h3>
            <div className="mt-4 space-y-3">
              {article.references.map((reference) => (
                <a
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition duration-300 hover:border-brand-pink/30 hover:bg-white/[0.05]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-white">{reference.title}</p>
                      <p className="mt-1 text-xs text-slate-300/75">{reference.source}</p>
                    </div>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </Card>

      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </div>
  );
}

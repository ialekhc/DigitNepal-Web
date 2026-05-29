'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBlogs } from '@/hooks/use-public-content';

export default function BlogDetailPage() {
  const blogsQuery = useBlogs();
  const params = useParams<{ slug: string }>();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const article = useMemo(
    () => blogsQuery.data?.find((item) => item.slug === slug),
    [blogsQuery.data, slug],
  );

  if (blogsQuery.isLoading) {
    return (
      <div className="section-wrap py-16 sm:py-20">
        <p className="text-sm text-slate-300/80">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="section-wrap py-16 sm:py-20">
        <SectionHeading eyebrow="[ Blog ]" title="Article Not Found" />
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading eyebrow="[ Blog Detail ]" title={article.title} description={article.excerpt} />

      <Card>
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>
        <p className="mt-5 whitespace-pre-line text-sm text-slate-300/90">{article.content}</p>
      </Card>

      <div className="mt-6">
        <Button variant="outline" asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    </div>
  );
}

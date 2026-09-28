import Link from 'next/link';
import { Clock3, Sparkles, User2 } from 'lucide-react';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { blogCategories } from '@/lib/content/site-content';
import { fallbackBlogs } from '@/lib/data/fallback';

export default function BlogPage() {
  const featuredBlogs = fallbackBlogs.filter((blog) => blog.featured);
  const regularBlogs = fallbackBlogs.filter((blog) => !blog.featured);

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="[ Blog ]"
        title="Technology, Design, Business, and Development Insights"
        description="Knowledge articles, practical tutorials, and company updates from Digit Nepal."
      />

      <Card>
        <h3 className="font-display text-lg font-semibold">Categories</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {blogCategories.map((category) => (
            <Badge key={category} variant="muted">
              {category}
            </Badge>
          ))}
        </div>
      </Card>

      {featuredBlogs.length > 0 && (
        <div className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-pink" />
            <h3 className="font-display text-xl font-semibold text-white">Featured Articles</h3>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredBlogs.map((blog) => (
              <Card key={blog.id} className="border-brand-pink/20 bg-white/[0.04]">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{blog.category}</Badge>
                  {blog.featured ? <Badge variant="muted">Featured</Badge> : null}
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold">{blog.title}</h3>
                <p className="mt-3 text-sm text-slate-300/85">{blog.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300/75">
                  {blog.author ? (
                    <span className="inline-flex items-center gap-1.5">
                      <User2 className="h-3.5 w-3.5" />
                      {blog.author}
                    </span>
                  ) : null}
                  {blog.readTime ? (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {blog.readTime}
                    </span>
                  ) : null}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${blog.slug}`}>Read Article</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {regularBlogs.map((blog) => (
          <Card key={blog.id}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{blog.category}</Badge>
              {blog.readTime ? <Badge variant="muted">{blog.readTime}</Badge> : null}
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold">{blog.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{blog.excerpt}</p>
            {blog.author ? <p className="mt-3 text-xs text-slate-300/70">By {blog.author}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${blog.slug}`}>Read Article</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

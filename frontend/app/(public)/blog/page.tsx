'use client';

import Link from 'next/link';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useBlogs } from '@/hooks/use-public-content';
import { blogCategories } from '@/lib/content/site-content';

export default function BlogPage() {
  const blogs = useBlogs();

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

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {blogs.data?.map((blog) => (
          <Card key={blog.id}>
            <h3 className="font-display text-xl font-semibold">{blog.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{blog.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
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

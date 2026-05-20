'use client';

import { SectionHeading } from '@/components/sections/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useBlogs } from '@/hooks/use-public-content';

export default function BlogPage() {
  const blogs = useBlogs();

  return (
    <div className="section-wrap py-16 sm:py-20">
      <SectionHeading
        eyebrow="Blog / Updates"
        title="Insights, Product Notes, and Company Updates"
        description="Follow Digit Nepal for practical technology guidance and community stories."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {blogs.data?.map((blog) => (
          <Card key={blog.id}>
            <h3 className="font-display text-xl font-semibold">{blog.title}</h3>
            <p className="mt-2 text-sm text-slate-300/85">{blog.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

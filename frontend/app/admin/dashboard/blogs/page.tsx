'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/admin/image-upload';
import { deleteData, fetchList, patchData, postData } from '@/lib/api/public';
import { queryKeys } from '@/lib/query-keys';
import { blogSchema, type BlogSchema } from '@/lib/schemas/admin';
import { Blog } from '@/lib/types';

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const listQuery = useQuery<Blog[]>({
    queryKey: queryKeys.admin.blogs,
    queryFn: () => fetchList('/blogs/admin/all'),
  });

  const form = useForm<BlogSchema>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      excerpt: '',
      content: '',
      tags: '',
      status: 'DRAFT',
    },
  });

  const saveMutation = useMutation({
    mutationFn: (values: BlogSchema) => {
      const payload = {
        ...values,
        imageUrl: values.imageUrl || undefined,
        tags: values.tags
          ? values.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      };

      if (editingId) return patchData(`/blogs/${editingId}`, payload);
      return postData('/blogs', payload);
    },
    onSuccess: () => {
      setEditingId(null);
      form.reset({
        title: '',
        imageUrl: '',
        excerpt: '',
        content: '',
        tags: '',
        status: 'DRAFT',
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.blogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogs });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteData(`/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.blogs });
      queryClient.invalidateQueries({ queryKey: queryKeys.public.blogs });
    },
  });

  const onEdit = (item: Blog) => {
    setEditingId(item.id);
    form.reset({
      title: item.title,
      imageUrl: item.imageUrl ?? '',
      excerpt: item.excerpt,
      content: item.content,
      tags: item.tags.join(', '),
      status: item.status,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Manage Blogs</h1>

      <Card>
        <form className="space-y-3" onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input {...form.register('title')} />
            </div>
            <div>
              <Label>Status</Label>
              <Select {...form.register('status')}>
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Image URL</Label>
            <Input {...form.register('imageUrl')} />
            <div className="mt-2">
              <ImageUpload onUploaded={(url) => form.setValue('imageUrl', url)} />
            </div>
          </div>

          <div>
            <Label>Excerpt</Label>
            <Textarea {...form.register('excerpt')} />
          </div>

          <div>
            <Label>Content</Label>
            <Textarea className="min-h-[180px]" {...form.register('content')} />
          </div>

          <div>
            <Label>Tags (comma separated)</Label>
            <Input {...form.register('tags')} />
          </div>

          <div className="flex gap-2">
            <Button type="submit">{editingId ? 'Update Blog' : 'Add Blog'}</Button>
            {editingId ? (
              <Button type="button" variant="outline" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Title</TH>
              <TH>Status</TH>
              <TH>Tags</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {listQuery.data?.map((item) => (
              <TR key={item.id}>
                <TD>{item.title}</TD>
                <TD>{item.status}</TD>
                <TD>{item.tags.join(', ')}</TD>
                <TD>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                      <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(item.id)}>
                      <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}

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
import { useAdminUser } from '@/hooks/use-admin-auth';
import { deleteData, fetchList, patchData, postData } from '@/lib/api/public';
import { applicationSchema, type ApplicationSchema } from '@/lib/schemas/admin';
import { Application } from '@/lib/types';

export default function AdminApplicationsPage() {
  const queryClient = useQueryClient();
  const userQuery = useAdminUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  const listQuery = useQuery<Application[]>({
    queryKey: ['admin-applications'],
    queryFn: () => fetchList('/applications'),
  });

  const form = useForm<ApplicationSchema>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      title: '',
      category: 'WEBSITE',
      imageUrl: '',
      description: '',
      technologies: '',
      projectLink: '',
      featured: false,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (values: ApplicationSchema) => {
      const payload = {
        ...values,
        imageUrl: values.imageUrl || undefined,
        projectLink: values.projectLink || undefined,
        technologies: values.technologies
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editingId) return patchData(`/applications/${editingId}`, payload);
      return postData('/applications', payload);
    },
    onSuccess: () => {
      setEditingId(null);
      form.reset({
        title: '',
        category: 'WEBSITE',
        imageUrl: '',
        description: '',
        technologies: '',
        projectLink: '',
        featured: false,
      });
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteData(`/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });

  const onEdit = (item: Application) => {
    setEditingId(item.id);
    form.reset({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl ?? '',
      description: item.description,
      technologies: item.technologies.join(', '),
      projectLink: item.projectLink ?? '',
      featured: item.featured,
    });
  };

  if (userQuery.data?.role === 'EDITOR') {
    return <p className="text-sm text-slate-300">Editors can only manage blogs and events.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Manage Applications</h1>

      <Card>
        <form className="space-y-3" onSubmit={form.handleSubmit((values) => saveMutation.mutate(values))}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input {...form.register('title')} />
              <p className="mt-1 text-xs text-rose-300">{form.formState.errors.title?.message}</p>
            </div>
            <div>
              <Label>Category</Label>
              <Select {...form.register('category')}>
                <option value="WEBSITE">Website</option>
                <option value="MOBILE_APP">Mobile App</option>
                <option value="SAAS">SaaS</option>
                <option value="DASHBOARD">Dashboard</option>
                <option value="CLIENT_SYSTEM">Client System</option>
                <option value="OTHER">Other</option>
              </Select>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...form.register('description')} />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Image URL</Label>
              <Input {...form.register('imageUrl')} />
              <div className="mt-2">
                <ImageUpload onUploaded={(url) => form.setValue('imageUrl', url)} />
              </div>
            </div>
            <div>
              <Label>Project Link</Label>
              <Input {...form.register('projectLink')} />
            </div>
          </div>

          <div>
            <Label>Technologies (comma separated)</Label>
            <Input {...form.register('technologies')} />
          </div>

          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register('featured')} />
            Featured Project
          </label>

          <div className="flex gap-2">
            <Button type="submit" disabled={saveMutation.isPending}>
              {editingId ? 'Update Application' : 'Add Application'}
            </Button>
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
              <TH>Category</TH>
              <TH>Featured</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {listQuery.data?.map((item) => (
              <TR key={item.id}>
                <TD>{item.title}</TD>
                <TD>{item.category}</TD>
                <TD>{item.featured ? 'Yes' : 'No'}</TD>
                <TD>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                      <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(item.id)}>
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

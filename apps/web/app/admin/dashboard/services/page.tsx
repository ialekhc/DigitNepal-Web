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
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUser } from '@/hooks/use-admin-auth';
import { deleteData, fetchList, patchData, postData } from '@/lib/api/public';
import { serviceSchema, type ServiceSchema } from '@/lib/schemas/admin';
import { Service } from '@/lib/types';

export default function AdminServicesPage() {
  const queryClient = useQueryClient();
  const userQuery = useAdminUser();
  const [editingId, setEditingId] = useState<string | null>(null);

  const servicesQuery = useQuery<Service[]>({
    queryKey: ['admin-services'],
    queryFn: () => fetchList('/services'),
  });

  const form = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: '',
      featured: false,
      order: 0,
    },
  });

  const saveMutation = useMutation({
    mutationFn: (values: ServiceSchema) => {
      if (editingId) {
        return patchData(`/services/${editingId}`, values);
      }
      return postData('/services', values);
    },
    onSuccess: () => {
      setEditingId(null);
      form.reset({ title: '', description: '', icon: '', featured: false, order: 0 });
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteData(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });

  const onSubmit = form.handleSubmit((values) => saveMutation.mutate(values));

  const onEdit = (item: Service) => {
    setEditingId(item.id);
    form.reset({
      title: item.title,
      description: item.description,
      icon: item.icon ?? '',
      featured: item.featured,
      order: item.order,
    });
  };

  if (userQuery.data?.role === 'EDITOR') {
    return <p className="text-sm text-slate-300">Editors can only manage blogs and events.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Manage Services</h1>

      <Card>
        <form className="space-y-3" onSubmit={onSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Service Title</Label>
              <Input {...form.register('title')} />
              <p className="mt-1 text-xs text-rose-300">{form.formState.errors.title?.message}</p>
            </div>
            <div>
              <Label>Icon Name (optional)</Label>
              <Input {...form.register('icon')} />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...form.register('description')} />
            <p className="mt-1 text-xs text-rose-300">{form.formState.errors.description?.message}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Display Order</Label>
              <Input type="number" {...form.register('order')} />
            </div>
            <label className="mt-7 inline-flex items-center gap-2 text-sm">
              <input type="checkbox" {...form.register('featured')} />
              Featured Service
            </label>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={saveMutation.isPending}>
              {editingId ? 'Update Service' : 'Add Service'}
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  form.reset({ title: '', description: '', icon: '', featured: false, order: 0 });
                }}
              >
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
              <TH>Featured</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {servicesQuery.data?.map((item) => (
              <TR key={item.id}>
                <TD>{item.title}</TD>
                <TD>{item.featured ? 'Yes' : 'No'}</TD>
                <TD>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                      <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(item.id)}
                    >
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

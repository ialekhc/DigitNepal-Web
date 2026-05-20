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
import { formatDateUTC } from '@/lib/date';
import { eventSchema, type EventSchema } from '@/lib/schemas/admin';
import { Event } from '@/lib/types';

export default function AdminEventsPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const listQuery = useQuery<Event[]>({
    queryKey: ['admin-events'],
    queryFn: () => fetchList('/events'),
  });

  const form = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      imageUrl: '',
      eventDate: '',
      eventTime: '',
      venue: '',
      onlineLink: '',
      description: '',
      registrationLink: '',
      status: 'UPCOMING',
    },
  });

  const saveMutation = useMutation({
    mutationFn: (values: EventSchema) => {
      const payload = {
        ...values,
        imageUrl: values.imageUrl || undefined,
        onlineLink: values.onlineLink || undefined,
        registrationLink: values.registrationLink || undefined,
        venue: values.venue || undefined,
      };
      if (editingId) return patchData(`/events/${editingId}`, payload);
      return postData('/events', payload);
    },
    onSuccess: () => {
      setEditingId(null);
      form.reset({
        title: '',
        imageUrl: '',
        eventDate: '',
        eventTime: '',
        venue: '',
        onlineLink: '',
        description: '',
        registrationLink: '',
        status: 'UPCOMING',
      });
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteData(`/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-events'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const onEdit = (item: Event) => {
    setEditingId(item.id);
    form.reset({
      title: item.title,
      imageUrl: item.imageUrl ?? '',
      eventDate: item.eventDate.slice(0, 10),
      eventTime: item.eventTime,
      venue: item.venue ?? '',
      onlineLink: item.onlineLink ?? '',
      description: item.description,
      registrationLink: item.registrationLink ?? '',
      status: item.status,
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Manage Events</h1>

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
                <option value="UPCOMING">UPCOMING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Date</Label>
              <Input type="date" {...form.register('eventDate')} />
            </div>
            <div>
              <Label>Time</Label>
              <Input {...form.register('eventTime')} placeholder="10:00 AM - 4:00 PM" />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Venue</Label>
              <Input {...form.register('venue')} />
            </div>
            <div>
              <Label>Online Link</Label>
              <Input {...form.register('onlineLink')} />
            </div>
          </div>

          <div>
            <Label>Event Image URL (optional)</Label>
            <Input {...form.register('imageUrl')} />
            <div className="mt-2">
              <ImageUpload onUploaded={(url) => form.setValue('imageUrl', url)} />
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...form.register('description')} />
          </div>

          <div>
            <Label>Registration Link</Label>
            <Input {...form.register('registrationLink')} />
          </div>

          <div className="flex gap-2">
            <Button type="submit">{editingId ? 'Update Event' : 'Add Event'}</Button>
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
              <TH>Date</TH>
              <TH>Status</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {listQuery.data?.map((item) => (
              <TR key={item.id}>
                <TD>{item.title}</TD>
                <TD>{formatDateUTC(item.eventDate)}</TD>
                <TD>{item.status}</TD>
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

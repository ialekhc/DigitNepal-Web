'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { useAdminUser } from '@/hooks/use-admin-auth';
import { deleteData, fetchList, patchData } from '@/lib/api/public';
import { Inquiry } from '@/lib/types';

export default function AdminInquiriesPage() {
  const userQuery = useAdminUser();
  const queryClient = useQueryClient();

  const listQuery = useQuery<Inquiry[]>({
    queryKey: ['admin-inquiries'],
    queryFn: () => fetchList('/inquiries'),
    enabled: userQuery.data?.role !== 'EDITOR',
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => patchData(`/inquiries/${id}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteData(`/inquiries/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] }),
  });

  if (userQuery.data?.role === 'EDITOR') {
    return <p className="text-sm text-slate-300">Editors cannot access inquiries.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Contact Inquiries</h1>
      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Message</TH>
              <TH>Status</TH>
              <TH>Actions</TH>
            </TR>
          </THead>
          <TBody>
            {listQuery.data?.map((item) => (
              <TR key={item.id}>
                <TD>{item.name}</TD>
                <TD>{item.email}</TD>
                <TD>{item.message}</TD>
                <TD>
                  <Select
                    value={item.status}
                    onChange={(event) => statusMutation.mutate({ id: item.id, status: event.target.value })}
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in_progress</option>
                    <option value="resolved">resolved</option>
                  </Select>
                </TD>
                <TD>
                  <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(item.id)}>
                    <Trash2 className="mr-1 h-3.5 w-3.5" /> Delete
                  </Button>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}

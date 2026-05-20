'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUser } from '@/hooks/use-admin-auth';
import { fetchList, patchData } from '@/lib/api/public';
import { settingSchema, type SettingSchema } from '@/lib/schemas/admin';

type SettingRecord = {
  id: string;
  key: string;
  value: Record<string, unknown>;
  description?: string | null;
};

export default function AdminSettingsPage() {
  const userQuery = useAdminUser();
  const queryClient = useQueryClient();

  const settingsQuery = useQuery<SettingRecord[]>({
    queryKey: ['admin-settings'],
    queryFn: () => fetchList('/settings'),
  });

  const form = useForm<SettingSchema>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      key: 'company_info',
      value: '{\n  "name": "Digit Nepal"\n}',
      description: 'Company profile',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: SettingSchema) => {
      const parsed = JSON.parse(values.value);
      return patchData(`/settings/${values.key}`, {
        value: parsed,
        description: values.description,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });

  if (userQuery.data?.role !== 'SUPER_ADMIN') {
    return <p className="text-sm text-slate-300">Only Super Admin can manage settings or SEO metadata.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Settings & SEO Metadata</h1>

      <Card>
        <form className="space-y-3" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <div>
            <Label>Setting Key</Label>
            <Input {...form.register('key')} placeholder="company_info or seo_defaults" />
          </div>

          <div>
            <Label>JSON Value</Label>
            <Textarea className="min-h-[160px] font-mono" {...form.register('value')} />
          </div>

          <div>
            <Label>Description</Label>
            <Input {...form.register('description')} />
          </div>

          {mutation.isError ? (
            <p className="text-sm text-rose-300">Invalid JSON. Please fix and submit again.</p>
          ) : null}

          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Saving...' : 'Save Setting'}
          </Button>
        </form>
      </Card>

      <Card>
        <Table>
          <THead>
            <TR>
              <TH>Key</TH>
              <TH>Description</TH>
              <TH>Value</TH>
            </TR>
          </THead>
          <TBody>
            {settingsQuery.data?.map((setting) => (
              <TR key={setting.id}>
                <TD>{setting.key}</TD>
                <TD>{setting.description ?? '-'}</TD>
                <TD>
                  <pre className="max-w-[420px] overflow-x-auto text-xs text-slate-300">
                    {JSON.stringify(setting.value, null, 2)}
                  </pre>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      </Card>
    </div>
  );
}

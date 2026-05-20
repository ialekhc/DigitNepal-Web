'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Save, Trash2, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { ImageUpload } from '@/components/admin/image-upload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUser } from '@/hooks/use-admin-auth';
import { fetchList, patchData } from '@/lib/api/public';
import {
  ABOUT_TEAM_MEMBERS_KEY,
  HOME_COMPANY_PHOTOS_KEY,
  companyPhotosToSettingValue,
  normalizeCompanyPhotos,
  normalizeTeamMembers,
  teamMembersToSettingValue,
} from '@/lib/content/managed-content';
import { fallbackCompanyPhotos, fallbackTeamMembers } from '@/lib/data/fallback';
import {
  companyPhotoSchema,
  CompanyPhotoSchema,
  teamMemberSchema,
  TeamMemberSchema,
} from '@/lib/schemas/admin';
import { CompanyPhoto, SettingRecord, TeamMember } from '@/lib/types';

function makeId(prefix: string) {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export default function AdminBrandTeamPage() {
  const userQuery = useAdminUser();
  const queryClient = useQueryClient();
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [companyPhotos, setCompanyPhotos] = useState<CompanyPhoto[]>(fallbackCompanyPhotos);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(fallbackTeamMembers);
  const [hydratedFromSettings, setHydratedFromSettings] = useState(false);

  const settingsQuery = useQuery<SettingRecord[]>({
    queryKey: ['admin-settings'],
    queryFn: () => fetchList('/settings'),
  });

  useEffect(() => {
    if (!settingsQuery.data || hydratedFromSettings) return;

    const photosSetting = settingsQuery.data.find((row) => row.key === HOME_COMPANY_PHOTOS_KEY);
    const teamSetting = settingsQuery.data.find((row) => row.key === ABOUT_TEAM_MEMBERS_KEY);

    setCompanyPhotos(normalizeCompanyPhotos(photosSetting?.value));
    setTeamMembers(normalizeTeamMembers(teamSetting?.value));
    setHydratedFromSettings(true);
  }, [hydratedFromSettings, settingsQuery.data]);

  const photoForm = useForm<CompanyPhotoSchema>({
    resolver: zodResolver(companyPhotoSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      alt: '',
      order: 1,
    },
  });

  const memberForm = useForm<TeamMemberSchema>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      designation: '',
      description: '',
      photoUrl: '',
      order: 1,
    },
  });

  const photosSaveMutation = useMutation({
    mutationFn: (items: CompanyPhoto[]) =>
      patchData(`/settings/${HOME_COMPANY_PHOTOS_KEY}`, {
        value: companyPhotosToSettingValue(items),
        description: 'Homepage company photos and gallery',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['setting', HOME_COMPANY_PHOTOS_KEY] });
    },
  });

  const teamSaveMutation = useMutation({
    mutationFn: (items: TeamMember[]) =>
      patchData(`/settings/${ABOUT_TEAM_MEMBERS_KEY}`, {
        value: teamMembersToSettingValue(items),
        description: 'About page team members',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
      queryClient.invalidateQueries({ queryKey: ['setting', ABOUT_TEAM_MEMBERS_KEY] });
    },
  });

  const photoRows = useMemo(() => sortByOrder(companyPhotos), [companyPhotos]);
  const teamRows = useMemo(() => sortByOrder(teamMembers), [teamMembers]);

  const onPhotoSubmit = photoForm.handleSubmit((values) => {
    const payload: CompanyPhoto = {
      id: editingPhotoId ?? makeId('company-photo'),
      title: values.title.trim(),
      description: values.description.trim(),
      imageUrl: values.imageUrl.trim(),
      alt: values.alt.trim(),
      order: values.order,
    };

    const updatedItems = editingPhotoId
      ? companyPhotos.map((item) => (item.id === editingPhotoId ? payload : item))
      : [...companyPhotos, payload];

    setCompanyPhotos(sortByOrder(updatedItems));
    setEditingPhotoId(null);
    photoForm.reset({ title: '', description: '', imageUrl: '', alt: '', order: updatedItems.length + 1 });
  });

  const onMemberSubmit = memberForm.handleSubmit((values) => {
    const payload: TeamMember = {
      id: editingTeamId ?? makeId('team-member'),
      name: values.name.trim(),
      designation: values.designation.trim(),
      description: values.description.trim(),
      photoUrl: values.photoUrl.trim(),
      order: values.order,
    };

    const updatedItems = editingTeamId
      ? teamMembers.map((item) => (item.id === editingTeamId ? payload : item))
      : [...teamMembers, payload];

    setTeamMembers(sortByOrder(updatedItems));
    setEditingTeamId(null);
    memberForm.reset({
      name: '',
      designation: '',
      description: '',
      photoUrl: '',
      order: updatedItems.length + 1,
    });
  });

  const onPhotoEdit = (item: CompanyPhoto) => {
    setEditingPhotoId(item.id);
    photoForm.reset({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      alt: item.alt,
      order: item.order,
    });
  };

  const onMemberEdit = (member: TeamMember) => {
    setEditingTeamId(member.id);
    memberForm.reset({
      name: member.name,
      designation: member.designation,
      description: member.description,
      photoUrl: member.photoUrl,
      order: member.order,
    });
  };

  const onPhotoDelete = (id: string) => {
    const updated = companyPhotos.filter((item) => item.id !== id);
    setCompanyPhotos(updated);
    if (editingPhotoId === id) {
      setEditingPhotoId(null);
      photoForm.reset({ title: '', description: '', imageUrl: '', alt: '', order: 1 });
    }
  };

  const onMemberDelete = (id: string) => {
    const updated = teamMembers.filter((item) => item.id !== id);
    setTeamMembers(updated);
    if (editingTeamId === id) {
      setEditingTeamId(null);
      memberForm.reset({ name: '', designation: '', description: '', photoUrl: '', order: 1 });
    }
  };

  if (userQuery.data?.role !== 'SUPER_ADMIN') {
    return (
      <p className="text-sm text-slate-300">
        Only Super Admin can manage home company photos and About Us team profiles.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Brand & Team CMS</h1>
        <p className="mt-1 text-sm text-slate-300/85">
          Manage homepage company photos and About Us team profiles from the Super Admin portal.
        </p>
      </div>

      <Card>
        <h2 className="font-display text-xl font-semibold">Homepage Company Photos</h2>
        <p className="mt-1 text-sm text-slate-300/80">
          Add multiple company visuals with title and short description for the home page gallery.
        </p>

        <form className="mt-4 space-y-3" onSubmit={onPhotoSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input {...photoForm.register('title')} />
              <p className="mt-1 text-xs text-rose-300">{photoForm.formState.errors.title?.message}</p>
            </div>
            <div>
              <Label>Alt Text</Label>
              <Input {...photoForm.register('alt')} />
              <p className="mt-1 text-xs text-rose-300">{photoForm.formState.errors.alt?.message}</p>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...photoForm.register('description')} />
            <p className="mt-1 text-xs text-rose-300">{photoForm.formState.errors.description?.message}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Image URL</Label>
              <Input {...photoForm.register('imageUrl')} placeholder="https://..." />
              <p className="mt-1 text-xs text-rose-300">{photoForm.formState.errors.imageUrl?.message}</p>
              <div className="mt-2">
                <ImageUpload onUploaded={(url) => photoForm.setValue('imageUrl', url, { shouldValidate: true })} />
              </div>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min={1} {...photoForm.register('order')} />
              <p className="mt-1 text-xs text-rose-300">{photoForm.formState.errors.order?.message}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit">{editingPhotoId ? 'Update Photo Entry' : 'Add Photo Entry'}</Button>
            {editingPhotoId ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingPhotoId(null);
                  photoForm.reset({ title: '', description: '', imageUrl: '', alt: '', order: 1 });
                }}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              onClick={() => photosSaveMutation.mutate(photoRows)}
              disabled={photosSaveMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {photosSaveMutation.isPending ? 'Saving...' : 'Save Photos to Website'}
            </Button>
          </div>
        </form>

        <div className="mt-5 overflow-x-auto">
          <Table>
            <THead>
              <TR>
                <TH>Preview</TH>
                <TH>Title</TH>
                <TH>Order</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {photoRows.map((item) => (
                <TR key={item.id}>
                  <TD>
                    <img src={item.imageUrl} alt={item.alt} className="h-12 w-16 rounded-md object-cover" />
                  </TD>
                  <TD>{item.title}</TD>
                  <TD>{item.order}</TD>
                  <TD>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onPhotoEdit(item)}>
                        <Pencil className="mr-1 h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onPhotoDelete(item.id)}>
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-xl font-semibold">About Us Team Members</h2>
        <p className="mt-1 text-sm text-slate-300/80">
          Add team profile cards with photo, designation, and short description.
        </p>

        <form className="mt-4 space-y-3" onSubmit={onMemberSubmit}>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Full Name</Label>
              <Input {...memberForm.register('name')} />
              <p className="mt-1 text-xs text-rose-300">{memberForm.formState.errors.name?.message}</p>
            </div>
            <div>
              <Label>Designation</Label>
              <Input {...memberForm.register('designation')} />
              <p className="mt-1 text-xs text-rose-300">{memberForm.formState.errors.designation?.message}</p>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...memberForm.register('description')} />
            <p className="mt-1 text-xs text-rose-300">{memberForm.formState.errors.description?.message}</p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Label>Photo URL</Label>
              <Input {...memberForm.register('photoUrl')} placeholder="https://..." />
              <p className="mt-1 text-xs text-rose-300">{memberForm.formState.errors.photoUrl?.message}</p>
              <div className="mt-2">
                <ImageUpload onUploaded={(url) => memberForm.setValue('photoUrl', url, { shouldValidate: true })} />
              </div>
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" min={1} {...memberForm.register('order')} />
              <p className="mt-1 text-xs text-rose-300">{memberForm.formState.errors.order?.message}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="submit">{editingTeamId ? 'Update Team Member' : 'Add Team Member'}</Button>
            {editingTeamId ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingTeamId(null);
                  memberForm.reset({ name: '', designation: '', description: '', photoUrl: '', order: 1 });
                }}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              type="button"
              variant="outline"
              onClick={() => teamSaveMutation.mutate(teamRows)}
              disabled={teamSaveMutation.isPending}
            >
              <Users className="mr-2 h-4 w-4" />
              {teamSaveMutation.isPending ? 'Saving...' : 'Save Team to Website'}
            </Button>
          </div>
        </form>

        <div className="mt-5 overflow-x-auto">
          <Table>
            <THead>
              <TR>
                <TH>Preview</TH>
                <TH>Name</TH>
                <TH>Designation</TH>
                <TH>Order</TH>
                <TH>Actions</TH>
              </TR>
            </THead>
            <TBody>
              {teamRows.map((item) => (
                <TR key={item.id}>
                  <TD>
                    <img src={item.photoUrl} alt={item.name} className="h-12 w-12 rounded-full object-cover" />
                  </TD>
                  <TD>{item.name}</TD>
                  <TD>{item.designation}</TD>
                  <TD>{item.order}</TD>
                  <TD>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onMemberEdit(item)}>
                        <Pencil className="mr-1 h-3.5 w-3.5" />
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => onMemberDelete(item.id)}>
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                      </Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>

      {photosSaveMutation.isError || teamSaveMutation.isError ? (
        <p className="text-sm text-rose-300">
          Unable to save one or more sections. Please verify your login and try again.
        </p>
      ) : null}
    </div>
  );
}

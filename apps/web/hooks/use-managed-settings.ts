'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchOne } from '@/lib/api/public';
import {
  ABOUT_TEAM_MEMBERS_KEY,
  HOME_COMPANY_PHOTOS_KEY,
  normalizeCompanyPhotos,
  normalizeTeamMembers,
} from '@/lib/content/managed-content';
import { fallbackCompanyPhotos, fallbackTeamMembers } from '@/lib/data/fallback';
import { CompanyPhoto, SettingRecord, TeamMember } from '@/lib/types';

export function useHomeCompanyPhotos() {
  return useQuery<CompanyPhoto[]>({
    queryKey: ['setting', HOME_COMPANY_PHOTOS_KEY],
    queryFn: async () => {
      const setting = await fetchOne<SettingRecord | null>(`/settings/${HOME_COMPANY_PHOTOS_KEY}`);
      return normalizeCompanyPhotos(setting?.value);
    },
    placeholderData: fallbackCompanyPhotos,
  });
}

export function useAboutTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ['setting', ABOUT_TEAM_MEMBERS_KEY],
    queryFn: async () => {
      const setting = await fetchOne<SettingRecord | null>(`/settings/${ABOUT_TEAM_MEMBERS_KEY}`);
      return normalizeTeamMembers(setting?.value);
    },
    placeholderData: fallbackTeamMembers,
  });
}

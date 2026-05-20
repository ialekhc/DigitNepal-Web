import { fallbackCompanyPhotos, fallbackTeamMembers } from '@/lib/data/fallback';
import { CompanyPhoto, TeamMember } from '@/lib/types';

export const HOME_COMPANY_PHOTOS_KEY = 'home_company_photos';
export const ABOUT_TEAM_MEMBERS_KEY = 'about_team_members';

const HOME_PHOTO_PLACEHOLDER = '/brand/favicon-alt-512.png';
const TEAM_PHOTO_PLACEHOLDER = '/brand/favicon-512.png';

function toPositiveOrder(value: unknown, fallback: number) {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) return Math.floor(value);
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return fallback;
}

function toText(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.trim() : fallback;
}

function parseItemsEnvelope(value: unknown, key: 'items' | 'members') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const payload = value as Record<string, unknown>;
  if (!(key in payload)) return null;
  return Array.isArray(payload[key]) ? payload[key] : null;
}

export function normalizeCompanyPhotos(value: unknown): CompanyPhoto[] {
  const rawItems = parseItemsEnvelope(value, 'items');

  if (rawItems === null) {
    return fallbackCompanyPhotos;
  }

  if (rawItems.length === 0) {
    return [];
  }

  return rawItems
    .map((item, index) => {
      const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
      const title = toText(row.title, `Company Photo ${index + 1}`);
      const imageUrl = toText(row.imageUrl, HOME_PHOTO_PLACEHOLDER) || HOME_PHOTO_PLACEHOLDER;

      return {
        id: toText(row.id, `company-photo-${index + 1}`),
        title,
        description: toText(row.description, ''),
        imageUrl,
        alt: toText(row.alt, title),
        order: toPositiveOrder(row.order, index + 1),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function normalizeTeamMembers(value: unknown): TeamMember[] {
  const rawItems = parseItemsEnvelope(value, 'members');

  if (rawItems === null) {
    return fallbackTeamMembers;
  }

  if (rawItems.length === 0) {
    return [];
  }

  return rawItems
    .map((item, index) => {
      const row = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
      const name = toText(row.name, `Team Member ${index + 1}`);
      const photoUrl = toText(row.photoUrl, TEAM_PHOTO_PLACEHOLDER) || TEAM_PHOTO_PLACEHOLDER;

      return {
        id: toText(row.id, `team-member-${index + 1}`),
        name,
        designation: toText(row.designation, 'Team Member'),
        description: toText(row.description, ''),
        photoUrl,
        order: toPositiveOrder(row.order, index + 1),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function companyPhotosToSettingValue(items: CompanyPhoto[]) {
  return {
    items: items.map((item, index) => ({
      id: item.id || `company-photo-${index + 1}`,
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      alt: item.alt,
      order: item.order,
    })),
  };
}

export function teamMembersToSettingValue(members: TeamMember[]) {
  return {
    members: members.map((member, index) => ({
      id: member.id || `team-member-${index + 1}`,
      name: member.name,
      designation: member.designation,
      description: member.description,
      photoUrl: member.photoUrl,
      order: member.order,
    })),
  };
}

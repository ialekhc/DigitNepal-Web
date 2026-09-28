import type { LucideIcon } from 'lucide-react';
import { Facebook, Instagram, Linkedin, Music2 } from 'lucide-react';

export type SocialLinkItem = {
  name: string;
  handle: string;
  url: string;
  description: string;
  icon: LucideIcon;
  hoverClassName: string;
};

export const SOCIAL_LINKS: SocialLinkItem[] = [
  {
    name: 'LinkedIn',
    handle: 'Digit Nepal',
    url: 'https://www.linkedin.com/company/digit-nepal',
    description: 'Company Updates & Professional Networking',
    icon: Linkedin,
    hoverClassName: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/60',
  },
  {
    name: 'Facebook',
    handle: 'Digit Nepal',
    url: 'https://www.facebook.com/profile.php?id=61578023773051',
    description: 'Community & Announcements',
    icon: Facebook,
    hoverClassName: 'hover:text-[#1877F2] hover:border-[#1877F2]/60',
  },
  {
    name: 'Instagram',
    handle: '@digitnepal_',
    url: 'https://www.instagram.com/digitnepal_/',
    description: 'Projects, Events & Creative Content',
    icon: Instagram,
    hoverClassName: 'hover:text-[#E1306C] hover:border-[#E1306C]/60',
  },
  {
    name: 'TikTok',
    handle: '@digit_nepal',
    url: 'https://www.tiktok.com/@digit_nepal',
    description: 'Short Tech Videos & Educational Content',
    icon: Music2,
    hoverClassName: 'hover:text-[#00F2EA] hover:border-[#00F2EA]/60',
  },
];

/** Main navigation. Order here is the order in the header and mobile menu. */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children: NavLink[];
}

export const mainNav: (NavLink | NavGroup)[] = [
  { label: 'NYE history', href: '/nye-history' },
  { label: 'Ball history', href: '/ball-history' },
  { label: 'Ball facts', href: '/ball-facts' },
  { label: 'Ball Cam 1', href: '/ball-cam-1' },
  { label: 'Ball Cam 2', href: '/ball-cam-2' },
  { label: 'Webcast', href: '/webcast' },
  {
    label: 'Press',
    href: '/press',
    children: [
      { label: 'Press hub', href: '/press' },
      { label: 'Hi-res photos', href: '/press/photos' },
      { label: 'B-roll video', href: '/press/b-roll' },
      { label: 'Press releases', href: '/press/releases' },
      { label: 'Video segments', href: '/press/video-segments' },
    ],
  },
];

export const footerLinks: NavLink[] = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
];

export const isGroup = (item: NavLink | NavGroup): item is NavGroup => 'children' in item;

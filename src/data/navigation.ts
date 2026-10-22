import { cams } from '../config/cams';

/** Main navigation. Order here is the order in the header and mobile menu. */
export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href: string;
  children: NavLink[];
  /**
   * On desktop, the label links straight to `href` instead of opening a
   * dropdown (the children still appear in the mobile menu and footer).
   */
  direct?: boolean;
  /** Show the red "live" dot when a Ball cam stream is live. */
  liveDot?: boolean;
}

export const mainNav: (NavLink | NavGroup)[] = [
  { label: 'NYE History', href: '/nye-history' },
  { label: 'Ball History', href: '/ball-history' },
  { label: 'Ball Facts', href: '/ball-facts' },
  {
    // One entry per cam in src/config/cams.ts
    label: 'Ball Cams',
    href: `/${cams[0].slug}`,
    children: cams.map((cam) => ({ label: cam.title, href: `/${cam.slug}` })),
    direct: true,
    liveDot: true,
  },
  { label: 'NYE Webcast', href: '/webcast' },
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

/** The Press submenu, also shown as tabs on every press page. */
export const pressLinks = mainNav.filter(isGroup).find((g) => g.href === '/press')?.children ?? [];

/**
 * The current page's path without the site's base folder or a trailing slash,
 * so it can be compared with the hrefs above ("/press/photos").
 */
export function currentPath(url: URL): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = base && url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
  return path.replace(/\/$/, '') || '/';
}

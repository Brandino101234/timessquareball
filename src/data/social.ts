/** Social links shown in the footer. Remove a line to hide that network. */
export const social = [
  { name: 'Instagram', url: 'https://www.instagram.com/timessquareball/' },
  { name: 'Facebook', url: 'https://www.facebook.com/TimesSquareBall' },
  { name: 'YouTube', url: 'https://www.youtube.com/user/TimesSquareNYE/' },
  { name: 'X', url: 'https://x.com/timessquareball' },
] as const;

export type SocialNetwork = (typeof social)[number]['name'];

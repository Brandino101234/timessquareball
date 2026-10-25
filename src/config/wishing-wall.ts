/**
 * The Confetti Wishing Wall. Update the dates and hours each year once the
 * Times Square Alliance announces them. Until `datesAnnounced` is true the page
 * shows last year's schedule as a guide and says this year's is to come.
 */
export const wishingWall = {
  datesAnnounced: false,
  /** e.g. "December 1 to December 29" */
  dates: 'December 1 to December 29',
  hours: '11 a.m. to 8 p.m. daily',
  closed: 'Closed December 25',
  location: 'Broadway plazas between 45th and 47th Streets',
  /** Online wishes are collected by the Times Square Alliance. */
  onlineUrl: 'https://www.timessquarenyc.org/nye/wishing-wall',
  /** Wishes received after this date are printed for the following year. */
  lastDay: 'December 28',
  confettiPounds: 3000,
} as const;

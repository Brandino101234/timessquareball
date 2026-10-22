/**
 * Opening hours shown in the homepage live strip ("One Times Square, open today").
 *
 * One Times Square does not publish its hours on its website (October 2026: "Hours
 * of operation vary by attraction"), so fill these in when the company confirms
 * them. Write each day as it should appear, e.g. '10:00 a.m. – 10:00 p.m.', or
 * 'Closed'. While a day is empty, the strip says "Hours vary" and links to
 * One Times Square's ticket page, where visitors can see the time slots.
 */
export const hours = {
  label: 'One Times Square',
  schedule: {
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: '',
    sunday: '',
  } as Record<'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday', string>,
  /** Where "See times" goes when today's hours are not filled in. */
  timesUrl: 'https://onetimessquare.com/buy-tickets',
};

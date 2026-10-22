/**
 * "Getting to Times Square on NYE" on the homepage.
 *
 * Based on official guidance for New Year's Eve 2025 from the Times Square
 * Alliance (https://www.timessquarenyc.org/nye/nye-faq) and the City of New
 * York's street-closure notice. Check both each December and update anything
 * that changed (times, access streets, prohibited items).
 */
export const gettingThere = {
  intro:
    'Watching in person is free, and no tickets are needed. Viewing areas fill in order of arrival, and crowds begin gathering in the afternoon.',
  facts: [
    {
      label: 'Viewing areas open',
      value: '3:00 p.m. on December 31',
    },
    {
      label: 'Where to enter',
      value: 'From 6th or 8th Avenue at 45th, 49th, 52nd or 56th Street',
    },
    {
      label: 'Getting there',
      value: 'Take public transit, exit at a station around Times Square and walk in. Streets close to traffic through the day.',
    },
    {
      label: 'Leave at home',
      value: 'Backpacks, large bags, umbrellas, chairs, coolers, alcohol, drones and weapons. All bags are searched.',
    },
    {
      label: 'Good to know',
      value: 'There are no portable restrooms or food vendors, and if you leave your viewing area you can’t return to it.',
    },
  ],
  /** Where visitors can check this year's details. */
  moreInfo: { label: 'Times Square Alliance NYE FAQ', url: 'https://www.timessquarenyc.org/nye/nye-faq' },
  /**
   * Map of One Times Square (lat 40.7564, lon -73.9862). The OpenStreetMap
   * embed shows on the page; the buttons open directions in Apple Maps or
   * Google Maps (plain links, no API key needed).
   */
  map: {
    embedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=-73.9945%2C40.7525%2C-73.9775%2C40.7625&layer=mapnik&marker=40.7564%2C-73.9862',
    appleMapsUrl: 'https://maps.apple.com/?q=One+Times+Square&address=1+Times+Square,+New+York,+NY+10036&ll=40.7564,-73.9862',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=One+Times+Square%2C+New+York%2C+NY+10036',
    directionsAppleUrl: 'https://maps.apple.com/?daddr=1+Times+Square,+New+York,+NY+10036&dirflg=r',
    directionsGoogleUrl: 'https://www.google.com/maps/dir/?api=1&destination=One+Times+Square%2C+New+York%2C+NY+10036&travelmode=transit',
  },
};

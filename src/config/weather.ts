/**
 * Current weather in the homepage live strip.
 *
 * Source: the US National Weather Service (api.weather.gov). It is free, needs
 * no account or key, and each visitor's browser asks it directly. The URL is
 * the hourly forecast for the Times Square grid point (found from
 * https://api.weather.gov/points/40.758,-73.9855); the strip shows the current hour.
 *
 * Set `enabled` to false to hide the weather.
 */
export const weather = {
  enabled: true,
  forecastUrl: 'https://api.weather.gov/gridpoints/OKX/34,44/forecast/hourly',
  label: 'Times Square weather',
  source: 'National Weather Service',
};

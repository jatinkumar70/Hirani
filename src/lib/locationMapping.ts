/**
 * Maps countries to their primary cities
 * @param country The country name to look up
 * @returns The corresponding city name or undefined if not found
 */
export function getCityByCountry(country?: string): string | undefined {
  if (!country) return undefined;

  const countryToCityMap: Record<string, string> = {
    "United Kingdom": "London",
    "United Arab Emirates": "Dubai",
    "Saudi Arabia": "Riyadh",
    // Add more country-city mappings as needed
  };

  return countryToCityMap[country];
}

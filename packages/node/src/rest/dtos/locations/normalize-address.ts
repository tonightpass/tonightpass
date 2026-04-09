/**
 * Strips trailing segments from `address` that are already represented by
 * structured fields (`zipCode`, `city`, `country`).
 *
 * Mapbox Search Box returns `feature.properties.context.address.name` as the
 * full formatted address (e.g. `"Place de l'Odéon, 75006 Paris, France"`)
 * for POIs that don't have a strict street number, which leads to duplicated
 * data when concatenated client-side. This normalizer guarantees the stored
 * `address` only contains the street-level information, regardless of how
 * the client built it.
 */
export const normalizeAddress = (
  address: string | undefined,
  parts: { zipCode?: string; city?: string; country?: string }
): string | undefined => {
  if (!address) {
    return address;
  }

  const segments = address.split(",").map((segment) => segment.trim());
  const zip = parts.zipCode?.toLowerCase();
  const city = parts.city?.toLowerCase();
  const country = parts.country?.toLowerCase();
  const exactMatches = [zip, city, country].filter((value): value is string =>
    Boolean(value)
  );
  const zipCity = zip && city ? `${zip} ${city}` : undefined;

  const isNoise = (segment: string): boolean => {
    const lower = segment.toLowerCase();
    if (exactMatches.includes(lower)) {
      return true;
    }
    if (zipCity && lower === zipCity) {
      return true;
    }
    return false;
  };

  const cleaned: string[] = [];
  for (const segment of segments) {
    if (!isNoise(segment)) {
      cleaned.push(segment);
    }
  }

  return cleaned.join(", ").trim() || address;
};

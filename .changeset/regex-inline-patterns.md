---
"tonightpass": patch
---

Add `REGEX.INLINE.EMAIL`, `REGEX.INLINE.URL`, and `REGEX.INLINE.MENTION` for detecting these patterns anywhere inside free text (non-anchored, global). The existing anchored `REGEX.EMAIL` stays the validation-only variant.

Extend `places.cities.search` with an optional `countryCode` filter so a free-text city name can be disambiguated to a single (countrySlug, citySlug) pair when the ISO country code is known.

Extend `places.countries.getAll` with an optional `code` filter to look up a country by its ISO 3166-1 alpha-2 code (e.g. `code: "FR"`).

Extend `ArtistWithTracks` with a `soundcloud.topTracks: ArtistTrack[]` field, populated from SoundCloud's `/users/:id/toptracks` (artist-curated "Popular tracks"). The existing `soundcloud.tracks` field continues to return the artist's most recent uploads.

Type `GET /artists/:idOrPermalink` query params via a new `GetArtistOptions = { trackLimit?: number }`.

Align the `places` SDK with the `Query<>` pattern already used by the `artists` SDK: every method now takes a single query object instead of positional path params + options. Callers should migrate:

- `places.countries.get(slug)` → `places.countries.get({ countrySlug: slug })`
- `places.countries.cities.getAll(slug, opts)` → `places.countries.cities.getAll({ countrySlug: slug, ...opts })`
- `places.countries.cities.get(country, city)` → `places.countries.cities.get({ countrySlug: country, citySlug: city })`
- `places.countries.cities.nearby(country, city, opts)` → `places.countries.cities.nearby({ countrySlug: country, citySlug: city, ...opts })`
- `places.cities.search(q, opts)` → `places.cities.search({ q, ...opts })`

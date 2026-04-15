import { mockSafetyZones } from "../mocks/safetyZones";

export type GeocodeInput = {
  venueName?: string;
  streetAddress: string;
  neighborhood?: string;
  city?: string;
  postalCode?: string;
};

export type GeocodeResult = {
  coordinates: [number, number];
  fullAddress: string;
  featureType: string;
  mapboxId?: string;
  source?: "searchbox" | "geocoding";
};

type MapboxFeature = {
  id?: string;
  geometry?: {
    coordinates?: [number, number];
  };
  properties?: {
    feature_type?: string;
    full_address?: string;
    name?: string;
    place_formatted?: string;
    mapbox_id?: string;
    coordinates?: {
      longitude?: number;
      latitude?: number;
    };
    context?: {
      country?: { name?: string };
      region?: { name?: string };
      place?: { name?: string };
      district?: { name?: string };
      locality?: { name?: string };
      neighborhood?: { name?: string };
      postcode?: { name?: string };
      street?: { name?: string };
    };
    match_code?: Record<string, unknown>;
  };
};

type SearchBoxFeature = {
  geometry?: {
    coordinates?: [number, number];
  };
  properties?: {
    name?: string;
    full_address?: string;
    feature_type?: string;
    mapbox_id?: string;
    poi_category?: string[];
    coordinates?: {
      longitude?: number;
      latitude?: number;
    };
    context?: {
      country?: { name?: string };
      region?: { name?: string };
      place?: { name?: string };
      district?: { name?: string };
      locality?: { name?: string };
      neighborhood?: { name?: string };
      postcode?: { name?: string };
      street?: { name?: string };
    };
  };
};

type Candidate<TFeature> = {
  feature: TFeature;
  coordinates: [number, number];
  textScore: number;
  insideSelectedZone: boolean;
  distanceToZoneCentroidKm: number | null;
};

type ZoneLike = {
  id: string;
  name: string;
  coordinates: number[][][];
};

const DEFAULT_PROXIMITY: [number, number] = [-69.9312, 18.4861];

function normalizeText(value: string | undefined): string {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ");
}

function includesNormalized(haystack: string | undefined, needle: string | undefined): boolean {
  const h = normalizeText(haystack);
  const n = normalizeText(needle);
  if (!h || !n) return false;
  return h.includes(n);
}

function buildGeocodeQuery(input: GeocodeInput): string {
  return [
    input.venueName?.trim(),
    input.streetAddress.trim(),
    input.neighborhood?.trim(),
    input.city?.trim() || "Santo Domingo",
    input.postalCode?.trim(),
    "Dominican Republic",
  ]
    .filter(Boolean)
    .join(", ");
}

function buildLandmarkQuery(input: GeocodeInput): string {
  return [
    input.venueName?.trim(),
    input.neighborhood?.trim(),
    input.city?.trim() || "Santo Domingo",
    "Dominican Republic",
  ]
    .filter(Boolean)
    .join(", ");
}

function getFeatureCoordinates(
  feature: MapboxFeature | SearchBoxFeature
): [number, number] | null {
  const propsCoords = feature?.properties?.coordinates;
  const geometryCoords = feature?.geometry?.coordinates;

  const longitude = propsCoords?.longitude ?? geometryCoords?.[0];
  const latitude = propsCoords?.latitude ?? geometryCoords?.[1];

  if (typeof longitude !== "number" || typeof latitude !== "number") {
    return null;
  }

  return [longitude, latitude];
}

function scoreFeatureText(
  feature: MapboxFeature | SearchBoxFeature,
  input: GeocodeInput
): number {
  const featureType = feature?.properties?.feature_type ?? "";
  const fullAddress = feature?.properties?.full_address ?? "";
  const placeFormatted =
    "place_formatted" in (feature?.properties ?? {})
      ? (feature.properties as MapboxFeature["properties"])?.place_formatted ?? ""
      : "";
  const name = feature?.properties?.name ?? "";

  const city = input.city ?? "Santo Domingo";
  const venueName = input.venueName ?? "";
  const streetAddress = input.streetAddress ?? "";
  const neighborhood = input.neighborhood ?? "";
  const postalCode = input.postalCode ?? "";

  let score = 0;

  if (featureType === "poi") score += 140;
  else if (featureType === "address") score += 120;
  else if (featureType === "secondary_address") score += 110;
  else if (featureType === "street") score += 70;
  else if (featureType === "neighborhood") score += 40;
  else if (featureType === "postcode") score += 20;
  else if (featureType === "place") score += 10;
  else if (featureType === "region") score += 0;

  if (streetAddress) {
    if (includesNormalized(fullAddress, streetAddress)) score += 50;
    if (includesNormalized(name, streetAddress)) score += 35;
  }

  if (venueName) {
    if (includesNormalized(fullAddress, venueName)) score += 60;
    if (includesNormalized(name, venueName)) score += 80;
  }

  if (neighborhood) {
    if (includesNormalized(fullAddress, neighborhood)) score += 25;
    if (includesNormalized(placeFormatted, neighborhood)) score += 20;
    if (includesNormalized(name, neighborhood)) score += 30;
    if (includesNormalized(feature?.properties?.context?.neighborhood?.name, neighborhood)) score += 40;
    if (includesNormalized(feature?.properties?.context?.district?.name, neighborhood)) score += 10;
    if (includesNormalized(feature?.properties?.context?.locality?.name, neighborhood)) score += 10;
  }

  if (city) {
    if (includesNormalized(fullAddress, city)) score += 15;
    if (includesNormalized(placeFormatted, city)) score += 15;
    if (includesNormalized(feature?.properties?.context?.place?.name, city)) score += 25;
  }

  if (postalCode) {
    if (includesNormalized(fullAddress, postalCode)) score += 20;
    if (includesNormalized(feature?.properties?.context?.postcode?.name, postalCode)) score += 30;
  }

  if (featureType === "place") score -= 15;
  if (featureType === "postcode") score -= 20;
  if (featureType === "region") score -= 30;

  return score;
}

function findZoneByNeighborhood(neighborhood?: string): ZoneLike | null {
  const target = normalizeText(neighborhood);
  if (!target) return null;

  return (
    mockSafetyZones.find((zone) => normalizeText(zone.name) === target) ??
    mockSafetyZones.find((zone) => normalizeText(zone.id) === target) ??
    null
  );
}

function getOuterRing(zone: ZoneLike): [number, number][] {
  const ring = zone.coordinates?.[0] ?? [];
  return ring as [number, number][];
}

function getPolygonCentroid(zone: ZoneLike): [number, number] {
  const ring = getOuterRing(zone);

  if (!ring.length) {
    return DEFAULT_PROXIMITY;
  }

  let sumLng = 0;
  let sumLat = 0;

  for (const [lng, lat] of ring) {
    sumLng += lng;
    sumLat += lat;
  }

  return [sumLng / ring.length, sumLat / ring.length];
}

function isPointOnSegment(
  point: [number, number],
  start: [number, number],
  end: [number, number],
  epsilon = 1e-10
): boolean {
  const [px, py] = point;
  const [x1, y1] = start;
  const [x2, y2] = end;

  const cross = (py - y1) * (x2 - x1) - (px - x1) * (y2 - y1);
  if (Math.abs(cross) > epsilon) return false;

  const dot = (px - x1) * (px - x2) + (py - y1) * (py - y2);
  return dot <= epsilon;
}

function pointInRing(point: [number, number], ring: [number, number][]): boolean {
  let inside = false;

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0];
    const yi = ring[i][1];
    const xj = ring[j][0];
    const yj = ring[j][1];

    if (isPointOnSegment(point, ring[j], ring[i])) {
      return true;
    }

    const intersects =
      yi > point[1] !== yj > point[1] &&
      point[0] < ((xj - xi) * (point[1] - yi)) / (yj - yi + 0.0) + xi;

    if (intersects) {
      inside = !inside;
    }
  }

  return inside;
}

function isPointInZone(point: [number, number], zone: ZoneLike): boolean {
  const ring = getOuterRing(zone);
  if (ring.length < 3) return false;
  return pointInRing(point, ring);
}

function haversineKm(a: [number, number], b: [number, number]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const [lng1, lat1] = a;
  const [lng2, lat2] = b;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLng / 2) ** 2;

  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

function compareCandidates<TFeature>(a: Candidate<TFeature>, b: Candidate<TFeature>): number {
  if (a.insideSelectedZone !== b.insideSelectedZone) {
    return a.insideSelectedZone ? -1 : 1;
  }

  if (b.textScore !== a.textScore) {
    return b.textScore - a.textScore;
  }

  const aDist = a.distanceToZoneCentroidKm ?? Number.POSITIVE_INFINITY;
  const bDist = b.distanceToZoneCentroidKm ?? Number.POSITIVE_INFINITY;

  return aDist - bDist;
}

function rankCandidates<TFeature extends MapboxFeature | SearchBoxFeature>(
  features: TFeature[],
  input: GeocodeInput,
  selectedZone: ZoneLike | null
): Candidate<TFeature>[] {
  const zoneCentroid = selectedZone
    ? getPolygonCentroid(selectedZone)
    : DEFAULT_PROXIMITY;

  return features
    .map((feature) => {
      const coordinates = getFeatureCoordinates(feature);
      if (!coordinates) return null;

      const insideSelectedZone = selectedZone
        ? isPointInZone(coordinates, selectedZone)
        : false;

      const distanceToZoneCentroidKm = selectedZone
        ? haversineKm(coordinates, zoneCentroid)
        : null;

      return {
        feature,
        coordinates,
        textScore: scoreFeatureText(feature, input),
        insideSelectedZone,
        distanceToZoneCentroidKm,
      };
    })
    .filter((candidate): candidate is Candidate<TFeature> => candidate !== null)
    .sort(compareCandidates);
}

async function geocodeAddressFallback(input: GeocodeInput): Promise<GeocodeResult> {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_MAPBOX_ACCESS_TOKEN");
  }

  if (!input.streetAddress.trim()) {
    throw new Error("Street address is required");
  }

  const selectedZone = findZoneByNeighborhood(input.neighborhood);
  const zoneCentroid = selectedZone
    ? getPolygonCentroid(selectedZone)
    : DEFAULT_PROXIMITY;

  const query = buildGeocodeQuery(input);

  const url =
    `https://api.mapbox.com/search/geocode/v6/forward` +
    `?q=${encodeURIComponent(query)}` +
    `&access_token=${token}` +
    `&limit=10` +
    `&country=DO` +
    `&proximity=${zoneCentroid[0]},${zoneCentroid[1]}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to geocode address");
  }

  const data = await response.json();
  const features: MapboxFeature[] = data?.features ?? [];

  console.log("GEOCODING QUERY:", query);
  console.log("GEOCODING ALL FEATURES:", features);

  if (!features.length) {
    throw new Error("Address not found");
  }

  const ranked = rankCandidates(features, input, selectedZone);
  const best = ranked[0];

  if (!best) {
    throw new Error("No valid coordinates returned");
  }

  console.log(
    "GEOCODING RANKED:",
    ranked.map((candidate) => ({
      textScore: candidate.textScore,
      insideSelectedZone: candidate.insideSelectedZone,
      distanceToZoneCentroidKm: candidate.distanceToZoneCentroidKm,
      featureType: candidate.feature?.properties?.feature_type,
      name: candidate.feature?.properties?.name,
      fullAddress: candidate.feature?.properties?.full_address,
      coordinates: candidate.coordinates,
    }))
  );

  return {
    coordinates: best.coordinates,
    fullAddress: best.feature?.properties?.full_address ?? query,
    featureType: best.feature?.properties?.feature_type ?? "unknown",
    mapboxId: best.feature?.properties?.mapbox_id ?? best.feature?.id,
    source: "geocoding",
  };
}

async function searchLandmarkWithSearchBox(
  input: GeocodeInput
): Promise<GeocodeResult | null> {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Missing VITE_MAPBOX_ACCESS_TOKEN");
  }

  if (!input.venueName?.trim()) {
    return null;
  }

  const selectedZone = findZoneByNeighborhood(input.neighborhood);
  const zoneCentroid = selectedZone
    ? getPolygonCentroid(selectedZone)
    : DEFAULT_PROXIMITY;

  const query = buildLandmarkQuery(input);

  const url =
    `https://api.mapbox.com/search/searchbox/v1/forward` +
    `?q=${encodeURIComponent(query)}` +
    `&access_token=${token}` +
    `&limit=10` +
    `&country=DO` +
    `&proximity=${zoneCentroid[0]},${zoneCentroid[1]}`;

  const response = await fetch(url);

  if (!response.ok) {
    console.warn("Search Box request failed:", response.status);
    return null;
  }

  const data = await response.json();
  const features: SearchBoxFeature[] = data?.features ?? [];

  console.log("SEARCH BOX QUERY:", query);
  console.log("SEARCH BOX FEATURES:", features);

  if (!features.length) {
    return null;
  }

  const ranked = rankCandidates(features, input, selectedZone);

  console.log(
    "SEARCH BOX RANKED:",
    ranked.map((candidate) => ({
      textScore: candidate.textScore,
      insideSelectedZone: candidate.insideSelectedZone,
      distanceToZoneCentroidKm: candidate.distanceToZoneCentroidKm,
      featureType: candidate.feature?.properties?.feature_type,
      name: candidate.feature?.properties?.name,
      fullAddress: candidate.feature?.properties?.full_address,
      coordinates: candidate.coordinates,
    }))
  );

  const best = ranked[0];
  if (!best) {
    return null;
  }

  const bestType = best.feature?.properties?.feature_type ?? "unknown";
  const bestName = best.feature?.properties?.name ?? "";
  const venueName = input.venueName ?? "";

  const strongLandmarkMatch =
    bestType === "poi" ||
    includesNormalized(bestName, venueName) ||
    includesNormalized(best.feature?.properties?.full_address, venueName);

  if (!strongLandmarkMatch) {
    console.log("SEARCH BOX result not strong enough, falling back to geocoding.");
    return null;
  }

  return {
    coordinates: best.coordinates,
    fullAddress: best.feature?.properties?.full_address ?? query,
    featureType: bestType,
    mapboxId: best.feature?.properties?.mapbox_id,
    source: "searchbox",
  };
}

/**
 * New helper: landmark-first, address fallback.
 */
export async function searchLandmarkOrAddress(
  input: GeocodeInput
): Promise<GeocodeResult> {
  const poiResult = await searchLandmarkWithSearchBox(input);
  if (poiResult) {
    return poiResult;
  }

  return geocodeAddressFallback(input);
}

/**
 * Backward-compatible export name.
 * Existing callers can keep using geocodeAddress().
 */
export async function geocodeAddress(
  input: GeocodeInput
): Promise<GeocodeResult> {
  return searchLandmarkOrAddress(input);
}
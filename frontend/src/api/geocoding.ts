export type GeocodeResult = {
  coordinates: [number, number];
  fullAddress: string;
};

export async function geocodeAddress(address: string): Promise<GeocodeResult> {
  const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Missing VITE_MAPBOX_ACCESS_TOKEN");
  }

  const url =
    `https://api.mapbox.com/search/geocode/v6/forward` +
    `?q=${encodeURIComponent(address)}` +
    `&access_token=${token}` +
    `&limit=1` +
    `&country=DO` +
    `&proximity=-69.9312,18.4861`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to geocode address");
  }

  const data = await response.json();
  const feature = data?.features?.[0];

  if (!feature) {
    throw new Error("Address not found");
  }

  const propsCoords = feature?.properties?.coordinates;
  const geometryCoords = feature?.geometry?.coordinates;

  const longitude =
    propsCoords?.longitude ?? geometryCoords?.[0];
  const latitude =
    propsCoords?.latitude ?? geometryCoords?.[1];

  if (typeof longitude !== "number" || typeof latitude !== "number") {
    throw new Error("No valid coordinates returned");
  }

  console.log("feature_type:", feature?.properties?.feature_type);
  console.log("match_code:", feature?.properties?.match_code);
  console.log("full_address:", feature?.properties?.full_address);
  console.log("coords:", { longitude, latitude });

  return {
    coordinates: [longitude, latitude],
    fullAddress: feature?.properties?.full_address ?? address,
  };
}
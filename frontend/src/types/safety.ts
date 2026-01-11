export type SafetyLevel = "safe" | "caution" | "danger";

export type SafetyZone = {
  id: string;
  name: string;
  level: SafetyLevel;
  coordinates: number[][][]; // GeoJSON polygon
};

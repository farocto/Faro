export type Event = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;

  startDateTime: string; // ISO string
  endDateTime?: string;

  zoneId: string;
};

export type RiskLevel = "low" | "medium" | "high";

export type Zone = {
  id: string;
  riskLevel: RiskLevel;
};

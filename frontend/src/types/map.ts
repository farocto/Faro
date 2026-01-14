export type Event = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  daysFromToday: number;
  zoneId: string; // NEW
};

export type Driver = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "available" | "busy" | "offline";
};

export type RiskLevel = "low" | "medium" | "high";

export type Zone = {
  id: string;
  riskLevel: RiskLevel;
};
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

export type EventPin = {
  id: string;
  title: string;

  date: string;
  startAtUtc: string;
  endAtUtc: string | null;

  coordinates: [number, number];

  venueId: string;
  venueName: string;
  address: string;

  hostBusinessId: string | null;
  hostBusinessName: string | null;

  category: string | null;
  imageUrl: string | null;

  isFree: boolean;
  priceAmount: number | null;
  priceLabel: string | null;

  status: string;
  description: string | null;
};
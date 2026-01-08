import type { Event } from "../types/map";

export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Concert Zona Colonial",
    latitude: 18.4734,
    longitude: -69.8844,
    daysFromToday: 0,
    riskLevel: "medium",
  },
  {
    id: "e2",
    title: "Football Match",
    latitude: 18.4607,
    longitude: -69.9196,
    daysFromToday: 2,
    riskLevel: "high",
  },
  {
    id: "e3",
    title: "Street Festival",
    latitude: 18.5001,
    longitude: -69.9473,
    daysFromToday: 5,
    riskLevel: "low",
  },
];

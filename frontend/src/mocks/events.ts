import type { Event } from "../types/map";

export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "Concert Zona Colonial",
    latitude: 18.4734,
    longitude: -69.8844,
    startDateTime: "2026-01-30T20:00:00-04:00",
    zoneId: "Zona-Colonial",
  },
  {
    id: "e2",
    title: "Football Match",
    latitude: 18.4607,
    longitude: -69.9196,
    startDateTime: "2026-01-31T18:30:00-04:00",
    zoneId: "Capotillo",
  },
  {
    id: "e3",
    title: "Street Festival",
    latitude: 18.5001,
    longitude: -69.9473,
    startDateTime: "2026-02-02T16:00:00-04:00",
    zoneId: "low",
  },
];

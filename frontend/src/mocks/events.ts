export type EventPin = {
  id: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  coordinates: [number, number]; // [lng, lat]
};

export const mockEvents: EventPin[] = [
  {
    id: "1",
    title: "Concert",
    date: "2026-03-20",
    coordinates: [-69.902, 18.486],
  },
  {
    id: "2",
    title: "Festival",
    date: "2026-03-11",
    coordinates: [-69.93, 18.47],
  },
];
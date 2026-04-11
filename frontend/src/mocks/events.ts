export type EventPin = {
  id: string;
  title: string;
  date: string;
  coordinates: [number, number];

  address: string;
  location: string;
  business: string;
  attendees: number;
  ticketPrice: number;
  description: string;
  imageUrl?: string;
};

export const mockEvents: EventPin[] = [
  {
    id: "1",
    title: "Concert",
    date: "2026-03-20",
    coordinates: [-69.902, 18.486],
    address: "Mercedes 341 esq Calle, C. Santomé, Santo Domingo",
    location: "Santo Domingo",
    business: "Example Venue",
    attendees: 100,
    ticketPrice: 10,
    description: "Sample event description. This will later come from the backend.",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Festival",
    date: "2026-03-11",
    coordinates: [-69.93, 18.47],
    address: "C2XX+28P, Av. Sarasota, Santo Domingo",
    location: "Santo Domingo",
    business: "Festival Grounds",
    attendees: 250,
    ticketPrice: 20,
    description: "A city festival with music, food, and activities.",
    imageUrl: "",
  },
];
export type EventPin = {
  id: string;
  title: string;
  date: string;
  coordinates: [number, number];

  venueName: string;
  streetAddress: string;
  neighborhood: string;
  city: string;
  postalCode: string;

  address: string; // final formatted address from geocoder
  location: string; // keep for compatibility/display

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

    venueName: "Example Venue",
    streetAddress: "Mercedes 341 esq Calle, C. Santomé",
    neighborhood: "Zona Colonial",
    city: "Santo Domingo",
    postalCode: "",

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

    venueName: "Festival Grounds",
    streetAddress: "Av. Sarasota",
    neighborhood: "",
    city: "Santo Domingo",
    postalCode: "",

    address: "C2XX+28P, Av. Sarasota, Santo Domingo",
    location: "Santo Domingo",

    business: "Festival Grounds",
    attendees: 250,
    ticketPrice: 20,
    description: "A city festival with music, food, and activities.",
    imageUrl: "",
  },
];
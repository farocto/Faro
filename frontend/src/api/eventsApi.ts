const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export type EventSummaryDto = {
  id: string;
  title: string;
  startAtUtc: string;
  endAtUtc: string | null;
  category: string | null;
  imageUrl: string | null;
  isFree: boolean;
  priceAmount: number | null;
  priceLabel: string | null;
  venueId: string;
  venueName: string;
  venueAddress: string | null;
  latitude: number;
  longitude: number;
  status: string;
};

export async function getEvents(dateUtc?: string): Promise<EventSummaryDto[]> {
  const url = new URL(`${API_BASE_URL}/events`);

  if (dateUtc) {
    url.searchParams.set("dateUtc", dateUtc);
  }

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch events. Status: ${response.status}`);
  }

  return response.json();
}

export type CreateEventRequest = {
  title: string;
  description?: string | null;
  startAtUtc: string;
  endAtUtc?: string | null;
  isFree: boolean;
  priceAmount?: number | null;
  priceLabel?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  externalUrl?: string | null;
  venueId: string;
};

export type EventDetailDto = {
  id: string;
  title: string;
  description: string | null;
  startAtUtc: string;
  endAtUtc: string | null;
  isFree: boolean;
  priceAmount: number | null;
  priceLabel: string | null;
  category: string | null;
  imageUrl: string | null;
  externalUrl: string | null;
  status: string;
  venueId: string;
  venueName: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export async function createEvent(
  request: CreateEventRequest
): Promise<EventDetailDto> {
  const response = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create event. Status: ${response.status}. ${errorText}`);
  }

  return response.json();
}
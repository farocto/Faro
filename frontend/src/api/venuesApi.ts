const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export type CreateVenueRequest = {
  name: string;
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  country?: string | null;
  latitude: number;
  longitude: number;
  placeId?: string | null;
  venueType?: string | null;
  capacity?: number | null;
  isRentable: boolean;
  rentalNotes?: string | null;
  isPubliclyListed: boolean;
};

export type VenueDto = {
  id: string;
  name: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
  placeId: string | null;
  venueType: string | null;
  capacity: number | null;
  isRentable: boolean;
  rentalNotes: string | null;
  isPubliclyListed: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export async function createVenue(
  request: CreateVenueRequest
): Promise<VenueDto> {
  const response = await fetch(`${API_BASE_URL}/venues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create venue. Status: ${response.status}. ${errorText}`);
  }

  return response.json();
}
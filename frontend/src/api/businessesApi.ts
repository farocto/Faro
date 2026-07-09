const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export type BusinessDto = {
  id: string;
  name: string;
  description: string | null;
  businessType: string | null;
  status: string;
  venueRelationship: string;
  ownerUserAccountId: string;
  createdAtUtc: string;
  updatedAtUtc: string;
};

export async function getBusinessesForUser(
  userAccountId: string
): Promise<BusinessDto[]> {
  const response = await fetch(
    `${API_BASE_URL}/user-accounts/${userAccountId}/businesses`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch businesses. Status: ${response.status}`
    );
  }

  return response.json();
}
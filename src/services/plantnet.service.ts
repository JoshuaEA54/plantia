import { apiFetch } from './api';
import type { IdentifyResponse, PlantSuggestion } from '@/src/types-dtos/plantnet.types';

export async function identifyPlantPhoto(photoUri: string): Promise<IdentifyResponse> {
  const formData = new FormData();
  formData.append('image', {
    uri: photoUri,
    type: 'image/jpeg',
    name: 'plant.jpg',
  } as any);

  return apiFetch<IdentifyResponse>('/api/plants/identify', {
    method: 'POST',
    headers: {},
    body: formData,
  });
}

export async function saveIdentifiedPlant(
  userId: string,
  suggestion: PlantSuggestion,
): Promise<{ userPlantId: string; plantId: string }> {
  return apiFetch(`/api/users/${userId}/plants/identified`, {
    method: 'POST',
    body: JSON.stringify({
      scientificName: suggestion.scientificName,
      commonName: suggestion.commonName,
      family: suggestion.family,
      imageUrl: suggestion.imageUrl,
      confidence: Math.round(suggestion.confidence),
    }),
  });
}

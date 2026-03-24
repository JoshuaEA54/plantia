import {
  ApiPlantDetailResponse,
  ApiUserPlant,
  ApiUserProfileResponse,
} from '@/src/types-dtos/user.types';
import { apiFetch } from './api';

export function fetchUserProfile(userId: string): Promise<ApiUserProfileResponse> {
  return apiFetch<ApiUserProfileResponse>(`/api/users/${userId}/profile`);
}

export function fetchUserPlants(userId: string): Promise<ApiUserPlant[]> {
  return apiFetch<ApiUserPlant[]>(`/api/users/${userId}/plants`);
}

export function fetchPlantDetail(plantId: string): Promise<ApiPlantDetailResponse> {
  return apiFetch<ApiPlantDetailResponse>(`/api/plants/${plantId}`);
}

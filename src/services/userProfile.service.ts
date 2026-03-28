import {
  ApiPlant,
  ApiPlantDetailResponse,
  ApiUser,
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

export function updateUserProfile(userId: string, data: Partial<Pick<ApiUser, 'fullName' | 'username' | 'bio' | 'birthdate'>>): Promise<ApiUser> {
  return apiFetch<ApiUser>(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function updatePlant(plantId: string, data: Partial<Pick<ApiPlant, 'name' | 'family' | 'habitat' | 'description'>>): Promise<ApiPlant> {
  return apiFetch<ApiPlant>(`/api/plants/${plantId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

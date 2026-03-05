import { Category, Plant, UserProfileData } from '@/src/types-dtos/user.types';

const AVATAR_URL = 'https://www.figma.com/api/mcp/asset/aec0292c-50e5-4965-b885-81433650ab69';
const PLANT_MONSTERA = 'https://www.figma.com/api/mcp/asset/043082ea-96e1-4980-87e2-b3e22679784c';
const PLANT_CACTUS = 'https://www.figma.com/api/mcp/asset/d20138ac-cf0a-4ceb-a394-04047df0b78a';
const PLANT_ORQUIDEA = 'https://www.figma.com/api/mcp/asset/0f382101-9c91-4eb4-aef9-71128c73cab5';
const PLANT_HELECHO = 'https://www.figma.com/api/mcp/asset/6346626e-946a-4b84-9674-c8fc64a8c5ae';
const PLANT_ESPATIFILO = 'https://www.figma.com/api/mcp/asset/595dbb96-ffe4-4b83-ba5c-422560b6103a';
const PLANT_POTHOS = 'https://www.figma.com/api/mcp/asset/aec0292c-50e5-4965-b885-81433650ab69';

const USER: UserProfileData = {
  name: 'Sofía Martínez',
  handle: '@sofia.verde',
  bio: 'Amante de las plantas 🌿 Coleccionando verde desde 2019. Identifico plantas con IA cada día ✨',
  birthdate: '12 de marzo, 1997',
  avatarUrl: AVATAR_URL,
  stats: {
    plants: 47,
    friends: 128,
    streak: 21,
  },
};

const CATEGORIES: Category[] = [
  { emoji: '🌵', name: 'Cactus' },
  { emoji: '🌸', name: 'Flores' },
  { emoji: '🌿', name: 'Tropicale' },
  { emoji: '🍃', name: 'Suculentas' },
  { emoji: '🌳', name: 'Árboles' },
  { emoji: '🪴', name: 'Interior' },
];

const PLANTS: Plant[] = [
  { id: 1, name: 'Monstera Deliciosa', status: '🌱 Saludable', image: PLANT_MONSTERA },
  { id: 2, name: 'Cactus Saguaro', status: '🌱 Saludable', image: PLANT_CACTUS },
  { id: 3, name: 'Orquídea Phalaenopsis', status: '🌱 Saludable', image: PLANT_ORQUIDEA },
  { id: 4, name: 'Helecho Boston', status: '🌱 Saludable', image: PLANT_HELECHO },
  { id: 5, name: 'Espatifilo', status: '🌱 Saludable', image: PLANT_ESPATIFILO },
  { id: 6, name: 'Pothos Dorado', status: '🌱 Saludable', image: PLANT_POTHOS },
];

export function useUserProfile() {
  return {
    user: USER,
    categories: CATEGORIES,
    plants: PLANTS,
  };
}

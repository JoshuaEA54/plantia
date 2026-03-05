import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const PLANT_CARD = {
  WIDTH: (SCREEN_WIDTH - 44) / 2,
  IMAGE_HEIGHT: 120,
} as const;

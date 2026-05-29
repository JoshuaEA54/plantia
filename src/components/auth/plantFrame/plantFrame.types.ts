import { ImageResizeMode, ImageSourcePropType, ImageStyle } from 'react-native';

export type PlantSide = 'arriba' | 'abajo';
export type PlantFrameMode = 'splash' | 'ambient';

export type PlantMotion = {
  peek: number;
  offset: number;
};

export type PlantSideLayout = {
  side: PlantSide;
  containerStyle: ImageStyle;
  motion: PlantMotion;
  source: ImageSourcePropType;
  zIndex: number;
  resizeMode: ImageResizeMode;
};

export type PlantFrameLayout = Record<PlantSide, PlantSideLayout>;

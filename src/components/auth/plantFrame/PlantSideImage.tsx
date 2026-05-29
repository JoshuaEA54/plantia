import { ImageStyle, StyleProp } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';
import { PLANT_FRAME_CONFIG } from './plantFrame.config';
import { PlantSideLayout } from './plantFrame.types';

type Props = {
  layout: PlantSideLayout;
  animatedStyle: StyleProp<AnimatedStyle<ImageStyle>>;
};

export default function PlantSideImage({ layout, animatedStyle }: Props) {
  const { opacity } = PLANT_FRAME_CONFIG.appearance;

  return (
    <Animated.Image
      source={layout.source}
      style={[layout.containerStyle, animatedStyle, { opacity }]}
      resizeMode={layout.resizeMode}
    />
  );
}

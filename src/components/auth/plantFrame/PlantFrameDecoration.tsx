import { ReactNode, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@/src/theme/desingSystem';
import { PLANT_SIDES } from './plantFrame.config';
import { getPlantFrameLayout } from './plantFrame.layout';
import { PlantFrameMode } from './plantFrame.types';
import PlantSideImage from './PlantSideImage';
import { usePlantFrameAnimation } from './usePlantFrameAnimation';

type Props = {
  mode: PlantFrameMode;
  children?: ReactNode;
  isReady?: boolean;
  onComplete?: () => void;
};

export default function PlantFrameDecoration({
  mode,
  children,
  isReady = true,
  onComplete,
}: Props) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { top, bottom } = insets;
  const layout = useMemo(
    () => getPlantFrameLayout({ top, bottom }),
    [top, bottom],
  );
  const animatedStyles = usePlantFrameAnimation({
    mode,
    layout,
    isReady,
    onComplete,
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {PLANT_SIDES.map((side) => (
        <PlantSideImage
          key={side}
          layout={layout[side]}
          animatedStyle={animatedStyles[side]}
        />
      ))}

      {children ? (
        <View style={styles.content} pointerEvents="box-none">
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});

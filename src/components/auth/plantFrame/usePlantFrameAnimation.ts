import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ImageStyle } from 'react-native';
import {
  AnimatedStyle,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PLANT_FRAME_CONFIG, PLANT_SIDES } from './plantFrame.config';
import { PlantFrameLayout, PlantFrameMode, PlantSide } from './plantFrame.types';

const ENTRY_ESTIMATE_MS = 800;

type PlantAnimatedStyles = Record<PlantSide, AnimatedStyle<ImageStyle>>;

type Params = {
  mode: PlantFrameMode;
  layout: PlantFrameLayout;
  isReady?: boolean;
  onComplete?: () => void;
};

function getInitialMotionValue(
  mode: PlantFrameMode,
  layout: PlantFrameLayout,
  side: PlantSide,
): number {
  return mode === 'ambient' ? layout[side].motion.peek : layout[side].motion.offset;
}

function startAmbientSway(
  side: PlantSide,
  value: ReturnType<typeof useSharedValue<number>>,
  peek: number,
) {
  const { swayPx, baseDurationMs, delayBySide, durationOffsetBySide, reverseSwayBySide } =
    PLANT_FRAME_CONFIG.ambient;
  const duration = baseDurationMs + durationOffsetBySide[side];
  const delay = delayBySide[side];
  const easing = Easing.inOut(Easing.sin);
  const from = reverseSwayBySide[side] ? peek - swayPx : peek + swayPx;
  const to = reverseSwayBySide[side] ? peek + swayPx : peek - swayPx;

  value.value = peek;
  value.value = withDelay(
    delay,
    withRepeat(
      withSequence(
        withTiming(from, { duration, easing }),
        withTiming(to, { duration, easing }),
      ),
      -1,
      true,
    ),
  );
}

export function usePlantFrameAnimation({
  mode,
  layout,
  isReady = true,
  onComplete,
}: Params): PlantAnimatedStyles {
  const [entryDone, setEntryDone] = useState(mode === 'ambient');
  const entryStarted = useRef(false);

  const arribaPeek = layout.arriba.motion.peek;
  const arribaOffset = layout.arriba.motion.offset;
  const abajoPeek = layout.abajo.motion.peek;
  const abajoOffset = layout.abajo.motion.offset;

  const arriba = useSharedValue(getInitialMotionValue(mode, layout, 'arriba'));
  const abajo = useSharedValue(getInitialMotionValue(mode, layout, 'abajo'));

  useLayoutEffect(() => {
    if (mode !== 'splash') return;

    if (entryStarted.current) return;
    entryStarted.current = true;

    const { staggerMs, springEntry } = PLANT_FRAME_CONFIG.splash;

    arriba.value = arribaOffset;
    abajo.value = abajoOffset;
    arriba.value = withDelay(0, withSpring(arribaPeek, springEntry));
    abajo.value = withDelay(staggerMs, withSpring(abajoPeek, springEntry));

    const entryTimer = setTimeout(() => {
      setEntryDone(true);
    }, staggerMs * (PLANT_SIDES.length - 1) + ENTRY_ESTIMATE_MS);

    return () => {
      clearTimeout(entryTimer);
      entryStarted.current = false;
      setEntryDone(false);
    };
  }, [mode, arribaPeek, arribaOffset, abajoPeek, abajoOffset, arriba, abajo]);

  useEffect(() => {
    if (mode !== 'splash' || !entryDone || !isReady || !onComplete) return;

    const { minDisplayMs } = PLANT_FRAME_CONFIG.splash;
    const completeTimer = setTimeout(onComplete, minDisplayMs);

    return () => clearTimeout(completeTimer);
  }, [mode, entryDone, isReady, onComplete]);

  useEffect(() => {
    if (mode !== 'ambient') return;

    startAmbientSway('arriba', arriba, layout.arriba.motion.peek);
    startAmbientSway('abajo', abajo, layout.abajo.motion.peek);
  }, [mode, layout, arriba, abajo]);

  const styleArriba = useAnimatedStyle(() => ({
    transform: [{ translateY: arriba.value }],
  }));
  const styleAbajo = useAnimatedStyle(() => ({
    transform: [{ translateY: abajo.value }],
  }));

  return { arriba: styleArriba, abajo: styleAbajo };
}

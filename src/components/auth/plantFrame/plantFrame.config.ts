export const PLANT_SIDES = ['arriba', 'abajo'] as const;

export const PLANT_FRAME_CONFIG = {
  layout: {
    maxTopBottomBandRatio: 0.32,
    topBottomHeightRatio: 0.26,
    hiddenRatio: 0.25,
    offScreenExtraPx: 40,
  },

  appearance: {
    opacity: 0.9,
  },

  splash: {
    staggerMs: 80,
    minDisplayMs: 1200,
    springEntry: { damping: 24, stiffness: 40 },
  },

  ambient: {
    swayPx: 8,
    baseDurationMs: 2800,
    delayBySide: {
      arriba: 0,
      abajo: 400,
    },
    durationOffsetBySide: {
      arriba: 0,
      abajo: 200,
    },
    reverseSwayBySide: {
      arriba: false,
      abajo: true,
    },
  },

  plants: {
    arriba: {
      source: require('@/assets/images/splash/planta-arriba.png'),
      zIndex: 1,
      resizeMode: 'cover' as const,
    },
    abajo: {
      source: require('@/assets/images/splash/planta-abajo.png'),
      zIndex: 1,
      resizeMode: 'cover' as const,
    },
  },
} as const;

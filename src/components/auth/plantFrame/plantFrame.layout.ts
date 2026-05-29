import { Dimensions, Image, ImageSourcePropType, ImageStyle } from 'react-native';
import { PLANT_FRAME_CONFIG, PLANT_SIDES } from './plantFrame.config';
import { PlantFrameLayout, PlantMotion, PlantSide } from './plantFrame.types';

const { width: W, height: H } = Dimensions.get('window');

function getTopBottomBandHeight(source: ImageSourcePropType): number {
  const { maxTopBottomBandRatio, topBottomHeightRatio } = PLANT_FRAME_CONFIG.layout;
  const asset = Image.resolveAssetSource(source);

  if (!asset?.width || !asset?.height) {
    return H * topBottomHeightRatio;
  }

  const idealHeight = W * (asset.height / asset.width);
  const maxHeight = H * maxTopBottomBandRatio;
  return Math.min(idealHeight, maxHeight);
}

function getMotion(side: PlantSide, source: ImageSourcePropType): PlantMotion {
  const { hiddenRatio, offScreenExtraPx } = PLANT_FRAME_CONFIG.layout;
  const band = getTopBottomBandHeight(source);
  const hidden = band * hiddenRatio;

  if (side === 'arriba') {
    return { peek: -hidden, offset: -band - offScreenExtraPx };
  }

  return { peek: hidden, offset: band + offScreenExtraPx };
}

function getContainerStyle(
  side: PlantSide,
  source: ImageSourcePropType,
  insets: { top: number; bottom: number },
): ImageStyle {
  const { zIndex } = PLANT_FRAME_CONFIG.plants[side];
  const height = getTopBottomBandHeight(source);

  if (side === 'arriba') {
    return {
      position: 'absolute',
      top: insets.top,
      left: 0,
      right: 0,
      width: W,
      height,
      zIndex,
    };
  }

  return {
    position: 'absolute',
    bottom: insets.bottom,
    left: 0,
    right: 0,
    width: W,
    height,
    zIndex,
  };
}

export function getPlantFrameLayout(insets: { top: number; bottom: number }): PlantFrameLayout {
  return PLANT_SIDES.reduce((acc, side) => {
    const plant = PLANT_FRAME_CONFIG.plants[side];

    acc[side] = {
      side,
      containerStyle: getContainerStyle(side, plant.source, insets),
      motion: getMotion(side, plant.source),
      source: plant.source,
      zIndex: plant.zIndex,
      resizeMode: plant.resizeMode,
    };

    return acc;
  }, {} as PlantFrameLayout);
}

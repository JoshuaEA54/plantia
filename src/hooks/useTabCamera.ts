import { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { CAMERA_OVERLAY_SPRING } from '@/src/constants/camera';

export function useTabCamera() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);
  const overlayOpacity = useSharedValue(0);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
    opacity: overlayOpacity.value,
  }));

  const handleOpenCamera = useCallback(() => {
    setIsCameraActive(true);
    setCameraKey(k => k + 1);
    overlayOpacity.value = withSpring(1, CAMERA_OVERLAY_SPRING);
  }, []);

  const handleCloseCamera = useCallback(() => {
    setIsCameraActive(false);
    overlayOpacity.value = withSpring(0, CAMERA_OVERLAY_SPRING);
  }, []);

  return {
    isCameraActive,
    cameraKey,
    overlayAnimatedStyle,
    handleOpenCamera,
    handleCloseCamera,
  };
}

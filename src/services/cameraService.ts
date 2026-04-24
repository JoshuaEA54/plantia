import { CameraView, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { RefObject } from 'react';
import type { PhotoResult, CaptureOptions } from '@/src/types-dtos/camera.types';

const CameraService = {
  async takePhoto(
    cameraRef: RefObject<CameraView>,
    options: CaptureOptions = {}
  ): Promise<PhotoResult> {
    if (!cameraRef.current) {
      throw new Error('La cámara no está disponible');
    }

    const photo = await cameraRef.current.takePictureAsync({
      quality: options.quality ?? 0.8,
      base64: options.base64 ?? false,
      skipProcessing: options.skipProcessing ?? true,
    });

    if (!photo) throw new Error('No se pudo capturar la foto');

    return {
      uri: photo.uri,
      width: photo.width,
      height: photo.height,
      base64: photo.base64,
    };
  },

  async saveToGallery(uri: string): Promise<MediaLibrary.Asset> {
    const asset = await MediaLibrary.createAssetAsync(uri);
    return asset;
  },

  toggleFacing(current: CameraType): CameraType {
    return current === 'back' ? 'front' : 'back';
  },

  cycleFlashMode(current: FlashMode): FlashMode {
    const modes: FlashMode[] = ['off', 'on', 'auto'];
    const index = modes.indexOf(current);
    return modes[(index + 1) % modes.length];
  },

  async pickFromGallery(): Promise<PhotoResult | null> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
    });

    if (result.canceled || result.assets.length === 0) return null;

    const asset = result.assets[0];
    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
    };
  },
};

export default CameraService;

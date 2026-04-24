import { useRef, useState, useCallback, useEffect } from 'react';
import { Alert, Linking } from 'react-native';
import { CameraView, CameraType, FlashMode } from 'expo-camera';

import CameraService from '@/src/services/cameraService';
import type { PhotoResult, CaptureOptions } from '@/src/types-dtos/camera.types';
import PermissionService from '@/src/services/permissionService';
import type { AppPermissions } from '@/src/types-dtos/permission.types';

interface UseCameraOptions {
  requestOnMount?: boolean;
  onBack?: () => void;
}

interface UseCameraReturn {
  cameraRef: React.RefObject<CameraView | null>;
  permissions: AppPermissions | null;
  isPermissionGranted: boolean;
  isPermanentlyDenied: boolean;
  isLoadingPermissions: boolean;
  facing: CameraType;
  flashMode: FlashMode;
  requestPermissions: () => Promise<void>;
  takePhoto: (options?: CaptureOptions) => Promise<PhotoResult | null>;
  toggleFacing: () => void;
  toggleFlash: () => void;
  saveToGallery: (uri: string) => Promise<void>;
  lastPhoto: PhotoResult | null;
  previewPhoto: PhotoResult | null;
  openGallery: () => Promise<void>;
  clearPreview: () => void;
  error: string | null;
}

export function useCamera(options: UseCameraOptions = {}): UseCameraReturn {
  const { requestOnMount = true, onBack } = options;

  // Ref so requestPermissions always reads the latest onBack without needing it as dep
  const onBackRef = useRef(onBack);
  useEffect(() => { onBackRef.current = onBack; }, [onBack]);

  const cameraRef = useRef<CameraView>(null);

  const [permissions, setPermissions] = useState<AppPermissions | null>(null);
  const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [lastPhoto, setLastPhoto] = useState<PhotoResult | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<PhotoResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isPermissionGranted =
    !!permissions &&
    PermissionService.isGranted(permissions.camera);

  const isPermanentlyDenied =
    !!permissions &&
    !isPermissionGranted &&
    !PermissionService.canAskAgain(permissions.camera);

  const requestPermissions = useCallback(async () => {
    setIsLoadingPermissions(true);
    setError(null);
    try {
      const result = await PermissionService.requestCameraPermission();
      setPermissions(result);

      const granted = PermissionService.isGranted(result.camera);
      if (!granted) {
        const permanentlyDenied = !result.camera.canAskAgain;
        if (permanentlyDenied) {
          Alert.alert(
            'Permiso de cámara bloqueado',
            'Plantia no tiene acceso a la cámara. Actívalo manualmente en los ajustes de tu dispositivo.',
            [
              { text: 'Cancelar', style: 'cancel', onPress: () => onBackRef.current?.() },
              {
                text: 'Abrir ajustes',
                onPress: () => { Linking.openSettings(); onBackRef.current?.(); },
              },
            ],
          );
        } else {
          onBackRef.current?.();
        }
      }
    } catch {
      setError('Error al solicitar permisos');
    } finally {
      setIsLoadingPermissions(false);
    }
  }, []);

  useEffect(() => {
    if (requestOnMount) {
      requestPermissions();
    }
  }, [requestOnMount]);

  const takePhoto = useCallback(async (options: CaptureOptions = {}): Promise<PhotoResult | null> => {
    setError(null);
    if (cameraRef.current === null) {
      throw new Error('No se ha detectado ninguna cámara');
    }
    try {
      const photo = await CameraService.takePhoto(
        cameraRef as React.RefObject<CameraView>,
        options
      );
      setLastPhoto(photo);
      setPreviewPhoto(photo);
      return photo;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al capturar foto';
      setError(message);
      return null;
    }
  }, []);

  const openGallery = useCallback(async () => {
    setError(null);
    try {
      const photo = await CameraService.pickFromGallery();
      if (photo) setPreviewPhoto(photo);
    } catch {
      setError('Error al acceder a la galería');
    }
  }, []);

  const clearPreview = useCallback(() => {
    setPreviewPhoto(null);
  }, []);

  const toggleFacing = useCallback(() => {
    setFacing((prev) => CameraService.toggleFacing(prev));
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode((prev) => CameraService.cycleFlashMode(prev));
  }, []);

  const saveToGallery = useCallback(async (uri: string) => {
    setError(null);
    try {
      await CameraService.saveToGallery(uri);
    } catch {
      setError('Error al guardar en galería');
    }
  }, []);

  return {
    cameraRef,
    permissions,
    isPermissionGranted,
    isPermanentlyDenied,
    isLoadingPermissions,
    facing,
    flashMode,
    requestPermissions,
    takePhoto,
    toggleFacing,
    toggleFlash,
    saveToGallery,
    lastPhoto,
    previewPhoto,
    openGallery,
    clearPreview,
    error,
  };
}

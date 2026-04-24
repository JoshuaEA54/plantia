import { Camera } from 'expo-camera';
import type { PermissionResult, AppPermissions } from '../types-dtos/permission.types';


const normalize = (granted: boolean, status: string, canAskAgain: boolean): PermissionResult => ({
  status: granted ? 'granted' : status === 'undetermined' ? 'undetermined' : 'denied',
  canAskAgain,
});

const PermissionService = {
  async requestCameraPermission(): Promise<AppPermissions> {
    const camera = await Camera.requestCameraPermissionsAsync();
    return {
      camera: normalize(camera.granted, camera.status, camera.canAskAgain),
    };
  },

  async checkCameraPermission(): Promise<AppPermissions> {
    const camera = await Camera.getCameraPermissionsAsync();
    return {
      camera: normalize(camera.granted, camera.status, camera.canAskAgain),
    };
  },

  isGranted: (p: PermissionResult): boolean => p.status === 'granted',
  canAskAgain: (p: PermissionResult): boolean => p.canAskAgain,
};

export default PermissionService;

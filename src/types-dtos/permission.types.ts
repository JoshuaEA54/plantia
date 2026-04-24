export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export interface PermissionResult {
  status: PermissionStatus;
  canAskAgain: boolean;
}

export interface AppPermissions {
  camera: PermissionResult;
  mediaLibrary?: PermissionResult;
}

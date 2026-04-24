export interface PhotoResult {
  uri: string;
  width: number;
  height: number;
  base64?: string;
}

export interface CaptureOptions {
  quality?: number;
  base64?: boolean;
  skipProcessing?: boolean;
}

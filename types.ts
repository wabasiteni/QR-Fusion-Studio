
export enum QRErrorCorrectionLevel {
  L = 'L', // Low, ~7% correction
  M = 'M', // Medium, ~15% correction
  Q = 'Q', // Quartile, ~25% correction
  H = 'H'  // High, ~30% correction
}

export interface QRCodeSettings {
  data: string;
  bgColor: string;
  fgColor: string;
  level: QRErrorCorrectionLevel;
  size: number;
  quietZone: number;
  logoSrc?: string; // base64 encoded image string
  logoWidth: number; // pixel value for logo width
  logoHeight: number; // pixel value for logo height
  logoExcavate: boolean; // whether to clear QR cells under the logo
  // Frame and Border settings
  padding: number;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
}


import { QRErrorCorrectionLevel, QRCodeSettings } from './types';

export const DEFAULT_QR_DATA = 'https://gemini.google.com';
export const DEFAULT_FG_COLOR = '#1A202C'; // A darker, richer black (Tailwind gray-800)
export const DEFAULT_BG_COLOR = '#FFFFFF';
export const DEFAULT_LEVEL = QRErrorCorrectionLevel.H; // High, best for logos
export const DEFAULT_SIZE = 280; // Default QR code canvas size
export const DEFAULT_QUIET_ZONE = 10; // Default margin around QR code (passed to library)
export const DEFAULT_LOGO_DIMENSION = 60; // Default width/height for logo in pixels
export const DEFAULT_LOGO_EXCAVATE = true;
// New defaults
export const DEFAULT_PADDING = 16;
export const DEFAULT_BORDER_RADIUS = 24;
export const DEFAULT_BORDER_WIDTH = 0; // Off by default
export const DEFAULT_BORDER_COLOR = '#1A202C'; // Same as fg color

export const INITIAL_SETTINGS: QRCodeSettings = {
  data: DEFAULT_QR_DATA,
  fgColor: DEFAULT_FG_COLOR,
  bgColor: DEFAULT_BG_COLOR,
  level: DEFAULT_LEVEL,
  size: DEFAULT_SIZE,
  quietZone: DEFAULT_QUIET_ZONE,
  logoSrc: undefined,
  logoWidth: DEFAULT_LOGO_DIMENSION,
  logoHeight: DEFAULT_LOGO_DIMENSION,
  logoExcavate: DEFAULT_LOGO_EXCAVATE,
  // New settings
  padding: DEFAULT_PADDING,
  borderRadius: DEFAULT_BORDER_RADIUS,
  borderWidth: DEFAULT_BORDER_WIDTH,
  borderColor: DEFAULT_BORDER_COLOR,
};

export const ERROR_CORRECTION_LEVELS = [
  { value: QRErrorCorrectionLevel.L, label: 'Low (~7%)' },
  { value: QRErrorCorrectionLevel.M, label: 'Medium (~15%)' },
  { value: QRErrorCorrectionLevel.Q, label: 'Quartile (~25%)' },
  { value: QRErrorCorrectionLevel.H, label: 'High (~30%) - Recommended' },
];

export const MAX_QR_DATA_LENGTH = 2000; // Sensible limit for QR data
export const MAX_SIZE = 1000; // Max QR code size
export const MIN_SIZE = 50; // Min QR code size
export const MAX_QUIET_ZONE = 40;
export const MIN_QUIET_ZONE = 0;
export const MAX_LOGO_DIMENSION = 200;
export const MIN_LOGO_DIMENSION = 10;

// New constants for frame and border
export const MIN_PADDING = 0;
export const MAX_PADDING = 100;
export const MIN_BORDER_RADIUS = 0;
export const MAX_BORDER_RADIUS = 150;
export const MIN_BORDER_WIDTH = 0;
export const MAX_BORDER_WIDTH = 50;

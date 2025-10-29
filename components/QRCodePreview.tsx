import React, { useRef, useCallback } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeSettings } from '../types';
import Button from './common/Button';
import DownloadIcon from './icons/DownloadIcon';

interface QRCodeImageSettings {
  src: string;
  x?: number;
  y?: number;
  height: number;
  width: number;
  excavate: boolean;
}

interface QRCodePreviewProps {
  settings: QRCodeSettings;
}

// Helper function to draw a rounded rectangle on a canvas, for creating custom borders
const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
};

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ settings }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const {
    data,
    size,
    fgColor,
    bgColor,
    level,
    quietZone,
    logoSrc,
    logoWidth,
    logoHeight,
    logoExcavate,
    padding,
    borderRadius,
    borderWidth,
    borderColor,
  } = settings;

  const imageSettings: QRCodeImageSettings | undefined = logoSrc
    ? {
        src: logoSrc,
        height: logoHeight,
        width: logoWidth,
        excavate: logoExcavate,
      }
    : undefined;

  const handleDownload = useCallback(() => {
    const qrCanvas = qrRef.current?.querySelector('canvas');
    if (!qrCanvas) {
      console.error("Could not find QR Code canvas element to download.");
      return;
    }

    const totalWidth = size + 2 * padding + 2 * borderWidth;
    const totalHeight = size + 2 * padding + 2 * borderWidth;

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = totalWidth;
    finalCanvas.height = totalHeight;
    const ctx = finalCanvas.getContext('2d');

    if (!ctx) {
       console.error("Could not get canvas context.");
       return;
    }

    // Step 1: Draw the border
    if (borderWidth > 0) {
      ctx.fillStyle = borderColor;
      drawRoundedRect(ctx, 0, 0, totalWidth, totalHeight, borderRadius);
    }
    
    // Step 2: Draw the background (padding area)
    ctx.fillStyle = bgColor;
    const innerRadius = Math.max(0, borderRadius - borderWidth);
    drawRoundedRect(ctx, borderWidth, borderWidth, totalWidth - 2 * borderWidth, totalHeight - 2 * borderWidth, innerRadius);

    // Step 3: Draw the QR code canvas onto the new canvas
    // The QR code canvas itself contains the quietZone, so we place it inside the padding.
    ctx.drawImage(qrCanvas, borderWidth + padding, borderWidth + padding);
    
    // Step 4: Trigger download
    const pngUrl = finalCanvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream'); // Force download
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'qr-fusion-code.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  }, [settings]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
      <div
        ref={qrRef}
        className="shadow-lg transition-all duration-200"
        style={{
          padding: `${padding}px`,
          borderRadius: `${borderRadius}px`,
          border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : 'none',
          backgroundColor: bgColor,
          display: 'inline-block',
          lineHeight: 0, // Prevents extra space below canvas
        }}
      >
        <QRCodeCanvas
          value={data}
          size={size}
          fgColor={fgColor}
          bgColor={bgColor}
          level={level}
          quietZone={quietZone}
          imageSettings={imageSettings}
        />
      </div>
      <Button 
        onClick={handleDownload}
        disabled={!data}
        leftIcon={<DownloadIcon className="w-5 h-5" />}
        className="min-w-[200px]"
      >
        Download QR Code
      </Button>
      {logoSrc && level !== 'H' && level !== 'Q' && (
         <p className="text-xs text-amber-400 text-center max-w-xs">
          Tip: For QR codes with logos, using 'High (H)' or 'Quartile (Q)' error correction is recommended for better scannability.
        </p>
      )}
    </div>
  );
};

export default QRCodePreview;

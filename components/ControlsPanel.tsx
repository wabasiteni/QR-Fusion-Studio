
import React, { useCallback } from 'react';
import { QRCodeSettings, QRErrorCorrectionLevel } from '../types';
import { ERROR_CORRECTION_LEVELS, MAX_QR_DATA_LENGTH, MIN_SIZE, MAX_SIZE, MIN_QUIET_ZONE, MAX_QUIET_ZONE, MIN_LOGO_DIMENSION, MAX_LOGO_DIMENSION, MIN_PADDING, MAX_PADDING, MIN_BORDER_RADIUS, MAX_BORDER_RADIUS, MIN_BORDER_WIDTH, MAX_BORDER_WIDTH } from '../constants';
import Button from './common/Button';
import Input from './common/Input';
import Select from './common/Select';
import ColorPicker from './common/ColorPicker';
import UploadIcon from './icons/UploadIcon';
import ResetIcon from './icons/ResetIcon';

interface ControlsPanelProps {
  settings: QRCodeSettings;
  onSettingChange: <K extends keyof QRCodeSettings>(key: K, value: QRCodeSettings[K]) => void;
  onReset: () => void;
  onLogoUpload: (file: File | null) => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  settings,
  onSettingChange,
  onReset,
  onLogoUpload,
}) => {
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number | boolean = value;

    if (type === 'number') {
      processedValue = parseFloat(value) || 0;
      if (name === 'size') processedValue = Math.max(MIN_SIZE, Math.min(MAX_SIZE, processedValue));
      if (name === 'quietZone') processedValue = Math.max(MIN_QUIET_ZONE, Math.min(MAX_QUIET_ZONE, processedValue));
      if (name === 'logoWidth' || name === 'logoHeight') processedValue = Math.max(MIN_LOGO_DIMENSION, Math.min(MAX_LOGO_DIMENSION, processedValue));
      if (name === 'padding') processedValue = Math.max(MIN_PADDING, Math.min(MAX_PADDING, processedValue));
      if (name === 'borderRadius') processedValue = Math.max(MIN_BORDER_RADIUS, Math.min(MAX_BORDER_RADIUS, processedValue));
      if (name === 'borderWidth') processedValue = Math.max(MIN_BORDER_WIDTH, Math.min(MAX_BORDER_WIDTH, processedValue));

    } else if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    }
    
    onSettingChange(name as keyof QRCodeSettings, processedValue as any);
  }, [onSettingChange]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onLogoUpload(e.target.files[0]);
    } else {
      onLogoUpload(null);
    }
  }, [onLogoUpload]);

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex-grow space-y-6 overflow-y-auto pr-2 -mr-2 max-h-[calc(100vh-250px)] lg:max-h-none">
        {/* Section: Content */}
        <div>
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Content</h3>
          <Input
            label="QR Data"
            id="data"
            name="data"
            value={settings.data}
            onChange={handleInputChange}
            maxLength={MAX_QR_DATA_LENGTH}
            placeholder="Enter text or URL"
            wrapperClassName="mb-2"
          />
          <p className="text-xs text-slate-500">{settings.data.length}/{MAX_QR_DATA_LENGTH} characters</p>
        </div>

        {/* Section: Colors */}
        <div>
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Colors</h3>
          <ColorPicker
            label="Foreground Color"
            id="fgColor"
            name="fgColor"
            value={settings.fgColor}
            onChange={handleInputChange}
          />
          <ColorPicker
            label="Background Color"
            id="bgColor"
            name="bgColor"
            value={settings.bgColor}
            onChange={handleInputChange}
          />
        </div>
        
        {/* Section: Styling & Sizing */}
        <div>
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Sizing & Layout</h3>
          <Input
            label={`QR Code Size (${MIN_SIZE}-${MAX_SIZE}px)`}
            id="size"
            name="size"
            type="number"
            value={settings.size}
            onChange={handleInputChange}
            min={MIN_SIZE}
            max={MAX_SIZE}
            wrapperClassName="mb-2"
          />
          <Input
            label={`Quiet Zone (${MIN_QUIET_ZONE}-${MAX_QUIET_ZONE} modules)`}
            id="quietZone"
            name="quietZone"
            type="number"
            value={settings.quietZone}
            onChange={handleInputChange}
            min={MIN_QUIET_ZONE}
            max={MAX_QUIET_ZONE}
            wrapperClassName="mb-2"
          />
          <Select
            label="Error Correction Level"
            id="level"
            name="level"
            value={settings.level}
            onChange={handleInputChange}
            options={ERROR_CORRECTION_LEVELS}
          />
        </div>

        {/* Section: Frame & Border */}
        <div>
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Frame & Border</h3>
          <Input
            label={`Padding (${MIN_PADDING}-${MAX_PADDING}px)`}
            id="padding"
            name="padding"
            type="number"
            value={settings.padding}
            onChange={handleInputChange}
            min={MIN_PADDING}
            max={MAX_PADDING}
            wrapperClassName="mb-2"
          />
          <Input
            label={`Border Radius (${MIN_BORDER_RADIUS}-${MAX_BORDER_RADIUS}px)`}
            id="borderRadius"
            name="borderRadius"
            type="number"
            value={settings.borderRadius}
            onChange={handleInputChange}
            min={MIN_BORDER_RADIUS}
            max={MAX_BORDER_RADIUS}
            wrapperClassName="mb-2"
          />
          <Input
            label={`Border Width (${MIN_BORDER_WIDTH}-${MAX_BORDER_WIDTH}px)`}
            id="borderWidth"
            name="borderWidth"
            type="number"
            value={settings.borderWidth}
            onChange={handleInputChange}
            min={MIN_BORDER_WIDTH}
            max={MAX_BORDER_WIDTH}
            wrapperClassName="mb-2"
          />
          <ColorPicker
            label="Border Color"
            id="borderColor"
            name="borderColor"
            value={settings.borderColor}
            onChange={handleInputChange}
          />
        </div>

        {/* Section: Logo */}
        <div>
          <h3 className="text-lg font-semibold text-sky-400 mb-3">Logo</h3>
          <div className="mb-4">
            <label htmlFor="logoUpload" className="block text-sm font-medium text-slate-300 mb-1">
              Upload Logo
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="logoUpload"
                name="logoUpload"
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById('logoUpload')?.click()}
                leftIcon={<UploadIcon className="w-4 h-4" />}
              >
                Choose File
              </Button>
              {settings.logoSrc && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-2 text-red-400 hover:text-red-300"
                  onClick={() => onLogoUpload(null)}
                >
                  Remove Logo
                </Button>
              )}
            </div>
            {settings.logoSrc && (
              <div className="mt-3 p-2 border border-slate-700 rounded-md inline-block bg-slate-750">
                <img src={settings.logoSrc} alt="Logo preview" className="h-16 w-16 object-contain rounded" />
              </div>
            )}
          </div>

          {settings.logoSrc && (
            <>
              <Input
                label={`Logo Width (${MIN_LOGO_DIMENSION}-${MAX_LOGO_DIMENSION}px)`}
                id="logoWidth"
                name="logoWidth"
                type="number"
                value={settings.logoWidth}
                onChange={handleInputChange}
                min={MIN_LOGO_DIMENSION}
                max={MAX_LOGO_DIMENSION}
                wrapperClassName="mb-2"
              />
              <Input
                label={`Logo Height (${MIN_LOGO_DIMENSION}-${MAX_LOGO_DIMENSION}px)`}
                id="logoHeight"
                name="logoHeight"
                type="number"
                value={settings.logoHeight}
                onChange={handleInputChange}
                min={MIN_LOGO_DIMENSION}
                max={MAX_LOGO_DIMENSION}
                wrapperClassName="mb-2"
              />
              <div className="flex items-center mt-3 mb-4">
                <input
                  id="logoExcavate"
                  name="logoExcavate"
                  type="checkbox"
                  checked={settings.logoExcavate}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-sky-500 bg-slate-700 border-slate-600 rounded focus:ring-sky-500 focus:ring-offset-slate-800"
                />
                <label htmlFor="logoExcavate" className="ml-2 block text-sm text-slate-300">
                  Clear QR area behind logo (recommended)
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-auto pt-6 border-t border-slate-700">
        <Button
          onClick={onReset}
          variant="secondary"
          className="w-full"
          leftIcon={<ResetIcon className="w-4 h-4" />}
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default ControlsPanel;

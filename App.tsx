
import React, { useState, useCallback } from 'react';
import { QRCodeSettings } from './types';
import { INITIAL_SETTINGS } from './constants';
import ControlsPanel from './components/ControlsPanel';
import QRCodePreview from './components/QRCodePreview';

const App: React.FC = () => {
  const [settings, setSettings] = useState<QRCodeSettings>(INITIAL_SETTINGS);

  const handleSettingsChange = useCallback(<K extends keyof QRCodeSettings>(
    key: K,
    value: QRCodeSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleResetSettings = useCallback(() => {
    setSettings(INITIAL_SETTINGS);
  }, []);

  const handleLogoUpload = useCallback((file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSettingsChange('logoSrc', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      handleSettingsChange('logoSrc', undefined);
    }
  }, [handleSettingsChange]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-inter">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
          QR Fusion Studio
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          Craft your unique QR codes with logos and custom styles.
        </p>
      </header>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:w-1/3 bg-slate-800 shadow-2xl rounded-xl p-6">
          <ControlsPanel
            settings={settings}
            onSettingChange={handleSettingsChange}
            onReset={handleResetSettings}
            onLogoUpload={handleLogoUpload}
          />
        </div>
        <div className="lg:w-2/3 bg-slate-800 shadow-2xl rounded-xl p-6 flex justify-center items-center">
          <QRCodePreview settings={settings} />
        </div>
      </div>
       <footer className="mt-12 text-center text-slate-500 text-xs">
        <p>&copy; {new Date().getFullYear()} QR Fusion Studio. All rights reserved.</p>
        <p>Powered by React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;

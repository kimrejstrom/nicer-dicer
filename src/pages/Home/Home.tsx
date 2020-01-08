import React, { useState } from 'react';
import d20 from 'pages/Home/d20.svg';
import { PresetFeature } from 'features/presets/PresetFeature';
import { RollInput } from 'features/rollInput/RollInput';
import Button from 'components/Button/Button';

export const Home: React.FC = () => {
  // Open mobile menu open
  const [presetsOpen, setPresetsOpen] = useState(false);
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <h1 className="text-center">Nicer</h1>
        <img src={d20} className="w-16 px-2 py-5" alt="logo" />
        <h1 className="text-center">Dicer</h1>
      </div>
      <div className="flex justify-center items-center">
        <Button
          title={presetsOpen ? 'Hide Presets' : 'Show Presets'}
          onClick={() => setPresetsOpen(!presetsOpen)}
          className="bg-transparent text-yellow-700 py-2 px-4 border border-yellow-700 rounded"
        />
      </div>
      {presetsOpen ? <PresetFeature /> : undefined}
      <RollInput />
    </div>
  );
};

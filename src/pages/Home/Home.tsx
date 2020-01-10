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
        <div className="w-full absolute top-0 h-1 bg-yellow-700"></div>
        <h1 className="text-center mt-4 mr-12">Nicer</h1>
        <div className="absolute arrow-down shape-shadow"></div>
        <img
          src={d20}
          className="absolute top-0 w-12 px-2 py-2 shape-shadow"
          alt="logo"
        />
        <h1 className="text-center mt-4 ml-12">Dicer</h1>
      </div>
      <div className="text-center mt-6 mb-6">
        <div className="text-white text-xl">The Ultimate RPG Dice Roller</div>
      </div>
      <div className="flex justify-center items-center">
        <Button
          title={presetsOpen ? 'Hide Presets' : 'Show Presets'}
          onClick={() => setPresetsOpen(!presetsOpen)}
          className="bg-transparent text-yellow-700 py-2 px-4 border border-yellow-900 rounded"
        />
      </div>
      {presetsOpen ? <PresetFeature /> : undefined}
      <RollInput />
    </div>
  );
};

import React, { useState } from 'react';
import { PresetFeature } from 'features/presets/PresetFeature';
import { RollInput } from 'features/rollInput/RollInput';
import Button from 'components/Button/Button';

export const Roller: React.FC = () => {
  // Open presets
  const [presetsOpen, setPresetsOpen] = useState(false);
  return (
    <div className="container mx-auto mt-8 max-w-xs p-4">
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

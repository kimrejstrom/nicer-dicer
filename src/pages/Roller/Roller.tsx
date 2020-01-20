import React, { useState } from 'react';
import { PresetFeature } from 'features/presets/PresetFeature';
import { RollInput } from 'features/rollInput/RollInput';
import Button from 'components/Button/Button';

export const Roller: React.FC = () => {
  // Open presets
  const [presetsOpen, setPresetsOpen] = useState(false);
  return (
    <div className="container mx-auto mt-8 max-w-xs pt-4">
      <div className="flex justify-center items-center">
        <Button
          title={presetsOpen ? 'Hide Presets' : 'Show Presets'}
          onClick={() => setPresetsOpen(!presetsOpen)}
          className="hover:bg-secondary-dark bg-transparent text-yellow-200 py-2 px-4 border border-yellow-700 rounded"
        />
      </div>
      {presetsOpen ? <PresetFeature /> : undefined}
      <RollInput />
    </div>
  );
};

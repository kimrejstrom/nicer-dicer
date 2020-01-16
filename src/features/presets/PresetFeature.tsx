import React from 'react';
import { PresetList } from 'features/presets/PresetList';

export interface Preset {
  rollType: 'attack' | 'damage' | 'save';
  defaultDie: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
  formula: string;
  repeat: boolean;
  modifier: 'advantage' | 'disadvantage' | 'normal';
}
export const PresetFeature = () => {
  const presets: Preset[] = [
    {
      rollType: 'attack',
      defaultDie: 'd20',
      formula: `{5+1d20...10}>=15`,
      repeat: true,
      modifier: 'normal',
    },
    {
      rollType: 'attack',
      defaultDie: 'd20',
      formula: `{5+1d20}>=15`,
      repeat: false,
      modifier: 'normal',
    },
    {
      rollType: 'damage',
      defaultDie: 'd6',
      formula: `3d6+2`,
      repeat: false,
      modifier: 'normal',
    },
    {
      rollType: 'damage',
      defaultDie: 'd6',
      formula: `3d6kh+2`,
      repeat: false,
      modifier: 'advantage',
    },
    {
      rollType: 'save',
      defaultDie: 'd20',
      formula: `2d20kl+5`,
      repeat: false,
      modifier: 'disadvantage',
    },
    {
      rollType: 'save',
      defaultDie: 'd20',
      formula: `{5+2d20kl...10}>=15`,
      repeat: true,
      modifier: 'disadvantage',
    },
  ];
  // Render
  return (
    <div>
      <PresetList presets={presets} />
    </div>
  );
};

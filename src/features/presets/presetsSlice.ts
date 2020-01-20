import { createSlice } from '@reduxjs/toolkit';

interface PresetsState {
  presets: Preset[];
}

export interface Preset {
  rollType: 'attack' | 'damage' | 'save' | 'other';
  defaultDie: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
  formula: string;
  title: string;
}

const initialState: PresetsState = {
  presets: [
    {
      rollType: 'attack',
      defaultDie: 'd20',
      formula: `{5+1d20...10}>=15`,
      title: 'Multi d20+mod, DC 15',
    },
    {
      rollType: 'attack',
      defaultDie: 'd20',
      formula: `{5+1d20}>=15`,
      title: 'd20+mod, DC 15',
    },
    {
      rollType: 'damage',
      defaultDie: 'd6',
      formula: `3d6+2`,
      title: 'Standard dmg',
    },
    {
      rollType: 'damage',
      defaultDie: 'd6',
      formula: `2d6kh+2`,
      title: 'd6+mod w/ advantage',
    },
    {
      rollType: 'save',
      defaultDie: 'd20',
      formula: `2d20kl+5`,
      title: 'd20+mod w/ disadavantage',
    },
    {
      rollType: 'save',
      defaultDie: 'd20',
      formula: `{5+2d20kl...10}>=15`,
      title: 'multi d20+mod w/ dis, DC 15',
    },
  ],
};

const presetsSlice = createSlice({
  name: 'presets',
  initialState: initialState,
  reducers: {
    addPreset(state, action) {
      state.presets.push(action.payload);
    },
  },
});

export const { addPreset } = presetsSlice.actions;

export default presetsSlice.reducer;

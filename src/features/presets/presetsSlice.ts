import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PresetsState {
  presets: Preset[];
}

export interface Preset {
  defaultDie: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
  formula: string;
  title: string;
}

export const presetsInitialState: PresetsState = {
  presets: [
    {
      defaultDie: 'd6',
      formula: `2+2d6kh`,
      title: 'd6+mod w/ advantage',
    },
    {
      defaultDie: 'd10',
      formula: `5+2d10kl`,
      title: 'd10+mod w/ disadavantage',
    },
    {
      defaultDie: 'd10',
      formula: `{2d10r<=2}>=8`,
      title: '2d10 re-roll >2s, DC8',
    },
    {
      defaultDie: 'd6',
      formula: `{4d6kh3....6}`,
      title: 'Roll Stats',
    },
    {
      defaultDie: 'd20',
      formula: `{5+2d20kl...10}>=15`,
      title: 'multi d20+mod w/ dis, DC 15',
    },
  ],
};

const presetsSlice = createSlice({
  name: 'presets',
  initialState: presetsInitialState,
  reducers: {
    addPreset(state, action: PayloadAction<Preset>) {
      state.presets.push(action.payload);
    },
    removePreset(state, action: PayloadAction<number>) {
      state.presets.splice(action.payload, 1);
    },
    resetPresets(state, action: PayloadAction) {
      state.presets = presetsInitialState.presets;
    },
  },
});

export const { addPreset, removePreset, resetPresets } = presetsSlice.actions;

export default presetsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PresetsState {
  presets: Preset[];
}

export type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';
export interface Preset {
  diceType: DiceType;
  formula: string;
  title: string;
}

export const presetsInitialState: PresetsState = {
  presets: [
    {
      diceType: 'd10',
      formula: `2d10r<=1`,
      title: 'Re-roll 1s',
    },
    {
      diceType: 'd6',
      formula: `2+2d6kh`,
      title: 'd6+mod w/ advantage',
    },
    {
      diceType: 'd10',
      formula: `5+2d10kl`,
      title: 'd10+mod w/ disadavantage',
    },
    {
      diceType: 'd10',
      formula: `{2d10r<=2}>=8`,
      title: '2d10 re-roll >2s, DC8',
    },
    {
      diceType: 'd6',
      formula: `{4d6kh3...6}`,
      title: 'Roll Stats',
    },
    {
      diceType: 'd20',
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
    updatePreset(state, action: PayloadAction<{ preset: Preset; id: number }>) {
      state.presets[action.payload.id] = action.payload.preset;
    },
    removePreset(state, action: PayloadAction<number>) {
      state.presets.splice(action.payload, 1);
    },
    resetPresets(state, action: PayloadAction) {
      state.presets = presetsInitialState.presets;
    },
  },
});

export const {
  addPreset,
  updatePreset,
  removePreset,
  resetPresets,
} = presetsSlice.actions;

export default presetsSlice.reducer;

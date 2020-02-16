import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  animations: boolean;
}

const initialState: SettingsState = {
  animations: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    toggleAnimations(state, action) {
      state.animations = action.payload;
    },
  },
});

export const { toggleAnimations } = settingsSlice.actions;

export default settingsSlice.reducer;

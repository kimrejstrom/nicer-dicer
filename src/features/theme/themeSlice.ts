import { createSlice } from '@reduxjs/toolkit';

export const ThemeMode = {
  DEFAULT: 'DEFAULT',
  DARK: 'DARK',
  LIGHT: 'LIGHT',
};

const themeSlice = createSlice({
  name: 'themeMode',
  initialState: ThemeMode.DEFAULT,
  reducers: {
    setThemeMode(state, action) {
      return action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export default themeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface RollsState {
  rolls: string[];
}

const initialState: RollsState = {
  rolls: [],
};

const rollInputSlice = createSlice({
  name: 'rolls',
  initialState: initialState,
  reducers: {
    addRoll(state, action) {
      state.rolls.push(action.payload);
    },
  },
});

export const { addRoll } = rollInputSlice.actions;

export default rollInputSlice.reducer;

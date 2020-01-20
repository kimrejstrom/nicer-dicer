import { createSlice } from '@reduxjs/toolkit';

interface RollsState {
  rolls: string[];
  currentRoll: string;
}

const initialState: RollsState = {
  rolls: [],
  currentRoll: '5+2d20',
};

const rollInputSlice = createSlice({
  name: 'rolls',
  initialState: initialState,
  reducers: {
    addRoll(state, action) {
      state.rolls.push(action.payload);
    },
    setCurrentRoll(state, action) {
      state.currentRoll = action.payload;
    },
  },
});

export const { addRoll, setCurrentRoll } = rollInputSlice.actions;

export default rollInputSlice.reducer;

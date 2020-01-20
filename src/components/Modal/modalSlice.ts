import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  visible: boolean;
}

const initialState: ModalState = {
  visible: false,
};

const modalSlice = createSlice({
  name: 'modalVisibility',
  initialState: initialState,
  reducers: {
    toggleModal(state, action) {
      state.visible = action.payload;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;

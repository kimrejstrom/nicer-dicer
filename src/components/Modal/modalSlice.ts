import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModal } from 'components/Modal/Modal';

interface ModalState extends IModal {
  visible: boolean;
}

const initialState: ModalState = {
  visible: false,
  title: undefined,
  content: undefined,
};

const modalSlice = createSlice({
  name: 'modalVisibility',
  initialState: initialState,
  reducers: {
    toggleModal(state, action: PayloadAction<ModalState>) {
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.visible = action.payload.visible;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export default modalSlice.reducer;

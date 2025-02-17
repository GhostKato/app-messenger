import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  [modalType: string]: boolean;
}

type ModalsState = {
  [key: string]: ModalState;
}

type ModalPayload = {
  modalId: string | null;
  modalType: 'userUpdate' | 'userMenu' | 'messageUpdate' | string; 
}

const initialState: ModalsState = {};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {    
    openModal(state, action: PayloadAction<ModalPayload>) {
      const { modalId, modalType } = action.payload;
      const id = modalId === null ? modalType : modalId;
      state[id] = { ...state[id], [modalType]: true };
    },    
    closeModal(state, action: PayloadAction<ModalPayload>) {
      const { modalId, modalType } = action.payload;
      const id = modalId === null ? modalType : modalId;
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: false };
      }
    },    
    toggleModal(state, action: PayloadAction<ModalPayload>) {
      const { modalId, modalType } = action.payload;
      const id = modalId === null ? modalType : modalId;
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: !state[id][modalType] };
      } else {
        state[id] = { [modalType]: true };
      }
    },
    closeDynamicModal(state, action: PayloadAction<{ modalType: string }>) {
      
      const { modalType } = action.payload;
      if (state[modalType]) {
        state[modalType] = { [modalType]: false };
      }
    }
  },
});

export const { openModal, closeModal, toggleModal, closeDynamicModal } = modalsSlice.actions;

export default modalsSlice.reducer;

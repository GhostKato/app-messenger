import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  [modalType: string]: boolean;
}

type ModalsState = {
  [key: string]: ModalState;
}

type ModalPayload = {
  contactId: string | null;
  modalType: 'userUpdate' | 'userMenu';
}

const initialState: ModalsState = {};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {    
    openModal(state, action: PayloadAction<ModalPayload>) {
      const { contactId, modalType } = action.payload;
      const id = contactId === null ? modalType : contactId;
      state[id] = { ...state[id], [modalType]: true };
    },    
    closeModal(state, action: PayloadAction<ModalPayload>) {
      const { contactId, modalType } = action.payload;
      const id = contactId === null ? modalType : contactId;
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: false };
      }
    },    
    toggleModal(state, action: PayloadAction<ModalPayload>) {
      const { contactId, modalType } = action.payload;
      const id = contactId === null ? modalType : contactId;
      if (state[id]) {
        state[id] = { ...state[id], [modalType]: !state[id][modalType] };
      } else {
        state[id] = { [modalType]: true };
      }
    },
  },
});

export const { openModal, closeModal, toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;

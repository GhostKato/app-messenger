interface Modals {
  [key: string]: {   
    userUpdate?: boolean;
    userMenu?: boolean;
  };
}

interface RootState {
  modals: Modals;
}

export const selectModalState = (
  state: RootState,
  contactId: string | null,
  modalType: 'userUpdate' | 'userMenu'
): boolean => {
  const id = contactId === null ? modalType : contactId;
  return state.modals[id] ? state.modals[id][modalType] ?? false : false;
};

export const selectUserMenu = (state: RootState): boolean =>
  selectModalState(state, null, 'userMenu');

export const selectUserUpdate = (state: RootState): boolean =>
  selectModalState(state, null, 'userUpdate');

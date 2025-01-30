interface Modals {
  [key: string]: {   
    userEdit?: boolean;
    userMenu?: boolean;
  };
}

interface RootState {
  modals: Modals;
}

export const selectModalState = (
  state: RootState,
  contactId: string | null,
  modalType: 'userEdit' | 'userMenu'
): boolean => {
  const id = contactId === null ? modalType : contactId;
  return state.modals[id] ? state.modals[id][modalType] ?? false : false;
};

export const selectUserMenu = (state: RootState): boolean =>
  selectModalState(state, null, 'userMenu');

export const selectUserEdit = (state: RootState): boolean =>
  selectModalState(state, null, 'userEdit');

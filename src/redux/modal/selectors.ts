interface Modals {
  [key: string]: {   
    sidebar?: boolean;
    menuUser?: boolean;
  };
}

interface RootState {
  modals: Modals;
}

export const selectModalState = (
  state: RootState,
  contactId: string | null,
  modalType: 'sidebar' | 'userMenu'
): boolean => {
  const id = contactId === null ? modalType : contactId;
  return state.modals[id] ? state.modals[id][modalType] ?? false : false;
};

export const selectSidebar = (state: RootState): boolean =>
  selectModalState(state, null, 'sidebar');

export const selectUserMenu = (state: RootState): boolean =>
  selectModalState(state, null, 'userMenu');

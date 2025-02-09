type Modals = {
  [key: string]: {   
    userUpdate?: boolean;
    userMenu?: boolean;
    messageUpdate?: boolean;
  };
}

type RootState = {
  modals: Modals;
}

export const selectModalState = (
  state: RootState,
  modalId: string | null,
  modalType: 'userUpdate' | 'userMenu' | 'messageUpdate'
): boolean => {
  const id = modalId === null ? modalType : modalId;
  return state.modals[id] ? state.modals[id][modalType] ?? false : false;
};

export const selectUserMenu = (state: RootState): boolean =>
  selectModalState(state, null, 'userMenu');

export const selectUserUpdate = (state: RootState): boolean =>
  selectModalState(state, null, 'userUpdate');



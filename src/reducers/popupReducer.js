const INITIAL_STATE = {
  isVisible: false,
  rightPanelActive: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_UP":
      return { ...state, isVisible: true, rightPanelActive: true };

    case "LOGIN":
      return { ...state, isVisible: true, rightPanelActive: false };

    case "HIDE_POPUP":
      return { ...state, isVisible: false, rightPanelActive: false };

    default:
      return state;
  }
};

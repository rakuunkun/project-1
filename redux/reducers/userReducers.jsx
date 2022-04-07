const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  username: "",
  error_mes: "",
  roleId: 0,
};

const userReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_mes: "", ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "ERROR":
      return { error_mes: action.payload };
    default:
      return state;
  }
};

export default userReducers;

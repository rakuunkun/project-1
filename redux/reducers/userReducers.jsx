const INITIAL_STATE = {
  id: 0,
  isLogin: false,
  isVerified: 0,
  username: "",
  error_mes: "",
  email: "",
  fullname: "",
  bio: "",
  profilePic: "",
  birthDate: "",
  caption: "",
  createdAt: "",
};

const userReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: true, error_mes: "", ...action.payload };
    case "REGISTER":
      return { ...state, error_mes: "", ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "ERROR":
      return { error_mes: action.payload };
    default:
      return state;
  }
};

export default userReducers;

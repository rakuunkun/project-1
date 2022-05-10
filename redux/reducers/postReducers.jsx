const INITIAL_STATE = {
  created_at: "",
  data: [],
};

const postReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.payload.data };
    default:
      return state;
  }
};

export default postReducers;

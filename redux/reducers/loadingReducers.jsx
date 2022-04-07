const INITIAL_STATE = false;

// reducer untuk loading dan done
const loadingReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADING":
      return true;
    case "DONE":
      return false;
    default:
      return state;
  }
};

export default loadingReducers;

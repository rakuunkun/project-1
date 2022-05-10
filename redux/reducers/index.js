import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import loadingReducers from "./loadingReducers";
import userReducers from "./userReducers";
import postReducers from "./postReducers";

// combineReducers untuk menggabungkan berbagai reducer jadi 1 dlm 1 obj
const reducers = combineReducers({
  user: userReducers,
  loading: loadingReducers,
  post: postReducers,
});
// thunk utk menjalankan action secara async
const middlewares = [thunk];

export const store = createStore(reducers, applyMiddleware(...middlewares));

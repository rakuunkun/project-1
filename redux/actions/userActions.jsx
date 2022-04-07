import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "../../helpers/api_url";

export const logoutAction = (router) => {
  return async (dispatch) => {
    console.log("lewat logout action");
    dispatch({ type: "LOGOUT" });
    Cookies.remove("token");
    router.push("/login");
  };
};
export const loginAction = ({ username, password }, router) => {
  return async (dispatch) => {
    try {
      //   dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/login`, {
        username,
        email: username,
        password,
      });
      console.log(res.data);
      dispatch({ type: "LOGIN", payload: res.data });

      // set cookies for nextjs
      Cookies.set("token", res.headers["x-access-token"]);
      router.push("/home");
      toast.success("berhasil Login", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message || "error server", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "network error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

import Swal from "sweetalert2";
import { API_URL } from "../../helpers/api_url";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchPost = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      const res = await axios.get(`${API_URL}/post/getpost`);
      console.log(res.data);
      dispatch({ type: "UPDATE_DATA", payload: { data: res.data } });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const sendPost = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/post/postcaptionimage`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      Swal.fire("Post sent!", "", "success");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

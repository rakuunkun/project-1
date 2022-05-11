import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { API_URL } from "../../helpers/api_url";
import Swal from "sweetalert2";

export const logoutAction = (router) => {
  return async (dispatch) => {
    console.log("lewat logout action");
    dispatch({ type: "LOGOUT" });
    Cookies.remove("token");
    router.push("/login");
  };
};

export const homeAction = (router) => {
  return async () => {
    console.log("lewat logout action");
    router.push("/home");
  };
};

export const profileAction = (router) => {
  return async () => {
    console.log("lewat logout action");
    router.push("/userProfile");
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
      Cookies.set("token", res.headers["x-token-access"]);
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

export const registerAction = (
  { username, email, password, fullname, birthDate },
  router
) => {
  return async (dispatch) => {
    try {
      let res = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        fullname,
        birthDate,
      });
      console.log(res.data);
      dispatch({ type: "REGISTER", payload: res.data });

      // set cookies for nextjs
      // Cookies.set("token", res.headers["x-access-token"]);
      router.push("/verify");
      toast.success("berhasil Register", {
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

export const editProfile = ({ ...values }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");

      let res2 = await axios.patch(
        `${API_URL}/profile/editProfile`,
        {
          ...values,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "LOGIN", payload: res2.data });

      Swal.fire("Profile successfully changed!", "Yay!", "success");
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

export const editProfilePhoto = (values) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING" });
      let token = Cookies.get("token");

      let res2 = await axios.patch(`${API_URL}/userProfile/addPhotos`, values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "LOGIN", payload: res2.data });

      Swal.fire("Profile successfully changed!", "Yay!", "success");
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

// export const editAllPhotos = ({ formData,  }) => {
//   return async (dispatch) => {
//     try {
//       dispatch({ type: "LOADING" });
//       let token = Cookies.get("token");

//       let res2 = await axios.all([
//         axios.patch(`${API_URL}/photos`, formData, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }),
//         axios.patch(`${API_URL}/photos/coverphotos`, formDataCover, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);

//       console.log(res2);

//       for (let i = 0; i < res2.length; i++) {
//         const element = res2[i];
//         dispatch({ type: "LOGIN", payload: element.data });
//       }

//       Swal.fire("Profile successfully changed!", "Yay!", "success");
//     } catch (error) {
//       dispatch({
//         type: "ERROR",
//         payload: error.response.data.message || "Network Error",
//       });
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.response.data.message || "Network Error",
//       });
//     } finally {
//       dispatch({ type: "DONE" });
//     }
//   };
// };

export const signOutAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
    }
  };
};

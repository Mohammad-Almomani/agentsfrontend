import axios from "axios";
import cookies from "react-cookies";
import Swal from "sweetalert2";
import { actionType } from "../types/AuthActionTypes";

export const login = (dispatch, payload) => {
  try {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/signin`,
        {},
        {
          headers: {
            Authorization: `Basic ${payload}`,
          },
        }
      )
      .then((res) => {
        cookies.save("token", res.data.token);
        cookies.save("capabilities", JSON.stringify(res.data.capabilities));
        cookies.save("userInfo", JSON.stringify(res.data));
        dispatch({ type: actionType.SUCCESS_LOGIN, payload: res.data });
      })
      .catch((err) => dispatch({ type: actionType.FAILED_LOGIN }));
  } catch (e) {
    dispatch({ type: actionType.FAILED_LOGIN });
  }
};

export const logoutHandler = (dispatch) => {
  cookies.remove("userInfo");
  cookies.remove("token");
  cookies.remove("capabilities");
  dispatch({ type: actionType.LOGOUT });
};

export const getUserProfile = async (dispatch) => {
  console.log("getting user profile");
  try {
    await axios
      .get(`${process.env.REACT_APP_BACKEND}/profile`, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        dispatch({ type: actionType.GET_PROFILE, payload: res.data });
        console.log("done getting user info");
      });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
    });
    console.log(error);
    cookies.remove("userInfo");
    cookies.remove("token");
    cookies.remove("capabilities");
    dispatch({ type: actionType.FAILED_LOGIN });
  }
};

export const signupAction = (dispatch, payload) => {
  try {
    axios
      .post(`${process.env.REACT_APP_BACKEND}/signup`, payload)
      .then((res) => {
        console.log(res.data.username);
        cookies.save("token", res.data.token);
        cookies.save("capabilities", JSON.stringify(res.data.capabilities));
        cookies.save("userInfo", JSON.stringify(res.data));
        dispatch({ type: actionType.SUCCESS_SIGNUP, payload: res.data });
      })
      .catch((e) => dispatch({ type: actionType.FAILED_SIGNUP }));
  } catch (e) {
    dispatch({ type: actionType.FAILED_SIGNUP });
  }
};

export const updateUser = (dispatch, payload) => {
  try {
    axios
      .put(`${process.env.REACT_APP_BACKEND}/cartUpdate`, payload, {
        headers: {
          Authorization: `Bearer ${cookies.load("token")}`,
        },
      })
      .then((res) => {
        dispatch({ type: actionType.GET_PROFILE, payload: res.data });
      })
      .catch((e) => dispatch({ type: actionType.FAILED_SIGNUP }));
  } catch (e) {
    dispatch({ type: actionType.FAILED_SIGNUP });
  }
};

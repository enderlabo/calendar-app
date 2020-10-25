import Swal from "sweetalert2";
import { fetchWithOutToken, fetchWithToken } from "../../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    //( auth = route of endpoint to used, { email, password are the data to send on server }, type of HTTP Method )
    const resp = await fetchWithOutToken("auth", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      //Auth login
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      //TODO: can show the error message from bd= "body.msg"
      //Swal.fire('Error', body.msg, 'error');
      console.log(body.msg);
    }

    console.log(body);
  };
};

export const startRegister = (email, password, name) => {
  return async (dispatch) => {
    const resp = await fetchWithOutToken(
      "auth/new",
      { email, password, name },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      //Auth login
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      //TODO: can show the error message from bd= "body.msg"
      Swal.fire("Error", body.msg, "error");
      console.log(body.msg);
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      //Auth login
      dispatch(login({ uid: body.uid, name: body.name }));
    } else {
      //TODO: can show the error message from bd= "body.msg"
      //Swal.fire("Error", body.msg, "error");
      console.log(body.msg);
      dispatch(checkingEnd());
    }
  };
};

const checkingEnd = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

//destroyed localstorage with reducer
export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();

    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });

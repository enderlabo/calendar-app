import Swal from "sweetalert2";
import { fetchWithToken } from "../../helpers/fetch";
import { fixEvents } from "../../helpers/fixDateEvent";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    //getState on thunk is equal useSelector.
    const { uid, name } = getState().auth;
    try {
      // /api/event call this endpoint from own backend
      const resp = await fetchWithToken("event", event, "POST");
      const body = resp.json();

      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };

        console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClean = () => ({
  type: types.eventClean,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const res = await fetchWithToken(` event/${event.id}`, event, "PUT");
      const body = await res.json();

      if (body.ok) {
        dispatch(eventStartUpdate(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
      // console.log(event);
    } catch (error) {}
  };
};

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;

    try {
      const resp = await fetchWithToken(`event/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const eventDeleted = () => ({
  type: types.eventDeleted,
});

export const startLoadingEvent = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("event");
      const body = await resp.json();
      //get events from backend
      const events = fixEvents(body.events);
      console.log(events);

      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
});

//destroyed localstorage with reducer
export const eventStartLogout = () => {
  return (dispatch) => {
    localStorage.clear();

    dispatch(eventStartLogout());
    dispatch(eventLogout());
  };
};

const eventLogout = () => ({ type: types.eventLogOut, events: [] });

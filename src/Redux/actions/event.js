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

export const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
});

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

      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (event) => ({
  type: types.eventLoaded,
  payload: event,
});

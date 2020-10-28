import React from "react";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
import { AppRouter } from "./routers/AppRouter";

export const Calendar = () => {
  return (
    <Provider store={store}>
      <AppRouter />
      <hr />
    </Provider>
  );
};

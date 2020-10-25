import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { CalendarS } from "../components/calendar/CalendarS";
import { Loading } from "../components/UI/loading";
import { startChecking } from "../Redux/actions/auth";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";

export const AppRouter = () => {
  //checking auth
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    //Component loading
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            component={Login}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            exact
            path="/"
            component={CalendarS}
            isAuthenticated={!!uid}
          />

          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

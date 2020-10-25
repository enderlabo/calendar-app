import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../Redux/actions/auth";

import "./UI.css";

export const Navbar = (e) => {
  const { pathname } = window.location;
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <>
      {pathname === "/" && (
        <div className="navbar navbar-dark bg-dark mb-4">
          <span className="navbar-brand"> {name} </span>

          <button className="btn btn-outline-danger b3" onClick={handleLogOut}>
            <i className="fas fa-sign-out-alt"></i>
            <span> Exit</span>
          </button>
        </div>
      )}

      {pathname === "/login" && (
        <div className={`${pathname === "/login" && "navL"}`}>
          <span className="navbar-brand"> Calendar-App </span>

          <button className="btn btn-outline b1">
            <i className="fa fa-user" aria-hidden="true"></i>
            <span> Login In </span>
          </button>

          <button className="btn btn-outline b2">
            <i className="fa fa-address-card" aria-hidden="true"></i>
            <span> Sign In</span>
          </button>
        </div>
      )}
    </>
  );
};

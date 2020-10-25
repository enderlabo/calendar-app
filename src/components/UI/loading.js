import React from "react";

import "./UI.css";

export const Loading = () => {
  return (
    <div className="loader-wrapper">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
};

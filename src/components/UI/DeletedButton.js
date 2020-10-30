import React from "react";
import { useDispatch } from "react-redux";
import { eventStartDelete } from "../../Redux/actions/event";

export const DeletedButton = () => {
  const dispatch = useDispatch();

  const handleDeleted = () => {
    dispatch(eventStartDelete());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleted}>
      <i className="fas fa-trash"></i>
    </button>
  );
};

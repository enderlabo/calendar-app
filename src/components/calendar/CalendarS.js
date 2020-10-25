import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Navbar } from "../UI/Navbar";
import { message } from "../../helpers/calendar-messages";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./css/styles.css";
import { uiOpenEmptyModal, uiOpenModal } from "../../Redux/actions/uiOpenModal";
import { useDispatch, useSelector } from "react-redux";
import { eventClean, eventSetActive } from "../../Redux/actions/event";
import { Button } from "../UI/Button";
import { DeletedButton } from "../UI/DeletedButton";
import { CalendarClickedModal } from "./CalendarClickedModal";

const localizer = momentLocalizer(moment);

export const CalendarS = () => {
  // useEffect(() => {

  // }, [ activeEvent, setFormValues, ])

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  //any doubleclicked event
  const onDoubleClick = () => {
    dispatch(uiOpenModal());
  };
  //Event selected
  const onSelectEvent = (e) => {
    console.log(e);
    dispatch(eventSetActive(e));
  };
  //see change of view
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    console.log(e);
    if (e.action === "doubleClick") {
      dispatch(uiOpenEmptyModal());
      // dispatch( uiOpenModal() );
    } else {
      dispatch(eventClean());
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "rgb(16, 167, 194)",
      borderRadius: "0px",
      display: "block",
      opacity: "0.8",
      color: "#FFF",
    };

    return {
      style,
    };
  };

  return (
    <>
      <div className="calendar-screen">
        <Navbar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={message}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onSelectSlot={onSelectSlot}
          selectable={true}
          components={{ event: CalendarEvent }}
          view={lastView}
          onView={onViewChange}
        />
        <Button />
        <>{!activeEvent && <CalendarClickedModal />}</>
        {activeEvent && <DeletedButton />}
        <CalendarModal />
      </div>
    </>
  );
};

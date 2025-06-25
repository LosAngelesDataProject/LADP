import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo, useState } from "react";
import styles from "./Calendar.module.css";
import { Card, Modal } from "react-bootstrap";
import { addDays, subDays } from "date-fns";
import "font-awesome/css/font-awesome.min.css";

function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const events = [
    {
      date: "Wed May 01 2024 12:14:29 GMT-0500 (Central Daylight Time)",
      title: "Event 1",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      date: "Fri May 03 2024 12:14:29 GMT-0500 (Central Daylight Time)",
      title: "Event 2",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      date: subDays(new Date(), 9),
      title: "Event 3",
      details: "random details",
    },
    {
      date: addDays(new Date(), 3),
      title: "Event 4",
      details: "random details",
    },
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const firstDayOfMonth = startOfMonth(currentMonth);
  const lastDayOfMonth = endOfMonth(currentMonth);
  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = getDay(lastDayOfMonth);
  const placeholdersToEnd = 6 - endingDayIndex;
  const [modal, setModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    date: "Fri May 03 2024 12:14:29 GMT-0500 (Central Daylight Time)",
    title: "",
    details: "",
  });

  const toggleModal = (event) => {
    setCurrentEvent(event);
    setModal(!modal);
  };

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    }, {});
  }, [events]);

  const CalendarCards = () => (
    <>
      {Array.from({ length: startingDayIndex }).map((_, index) => (
        <div key={`emptyCard-start-${index}`} className="col" />
      ))}
      {daysInMonth.map((day, index) => {
        const dateKey = format(day, "yyyy-MM-dd");
        const todaysEvents = eventsByDate[dateKey] || [];
        return (
          <div
            key={`card-${index}`}
            className={`col  ${styles.calendarCard} ${
              isToday(day) ? styles.calendarToday : ""
            }`}
          >
            <Card.Header className={`fw-bold ${styles.dateHeader}`}>
              {format(day, "d")}
            </Card.Header>
            <Card.Body>
              {todaysEvents.map((event, eventIndex) => {
                return (
                  <div
                    key={`event-${eventIndex}`}
                    className={`p-1 ${styles.eventCard}`}
                    onClick={() => toggleModal(event)}
                  >
                    {event.title}
                  </div>
                );
              })}
            </Card.Body>
          </div>
        );
      })}
      {Array.from({ length: placeholdersToEnd }).map((_, index) => (
        <div key={`emptyCard-end-${index}`} className="col" />
      ))}
    </>
  );

  const EventModal = () => (
    <Modal show={modal} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        {currentEvent
          ? `Event on ${format(new Date(currentEvent.date), "PPPP")}`
          : "No event selected."}
      </Modal.Header>
      <Modal.Body>
        <p>Event Details</p>
        <p>{currentEvent ? currentEvent.details : ""}</p>
      </Modal.Body>
    </Modal>
  );

  return (
    <>
      <div className={styles.headerBackground}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Food Distribution Calendar</h1>
          <div className={styles.monthYearRow}>
            <span className={styles.monthYearText}>{format(currentMonth, "MMMM yyyy")}</span>
          </div>
          <div className={styles.monthSwitchButtons}>
            <button
              className={styles.monthSwitchButton}
              onClick={handlePreviousMonth}
            >
              Previous Month
            </button>
            <button className={styles.monthSwitchButton} onClick={handleNextMonth}>
              Next Month
            </button>
          </div>
        </div>
      </div>
      <div className={`row ${styles.customGrid} ${styles.roundedCalendar} g-0`}>
        {weekDays.map((day) => (
          <div key={day} className={`col ${styles.weekdayHeader}`}>
            {day}
          </div>
        ))}
        <CalendarCards />
        <EventModal />
      </div>
    </>
  );
}

export default Calendar;
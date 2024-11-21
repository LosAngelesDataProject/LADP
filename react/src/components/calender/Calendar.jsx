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
import Logo from "../../assets/ladpLogo_light.png";
import { Container, Card, Modal } from "react-bootstrap";
import { addDays, subDays } from "date-fns";

function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const events = [
    {
      date: "Wed May 01 2024 12:14:29 GMT-0500 (Central Daylight Time)",
      title: "Event 1",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      date: "Fri May 03 2024 12:14:29 GMT-0500 (Central Daylight Time)",
      title: "Event 2",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
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
            className={`col rounded ${styles.calendarCard} ${
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
    <Container className={`${styles.calendarConatiner}`}>
      <div className={`mx-0 px-0 ${styles.headerBackground}`}>
        <div className={styles.headerContent}>
          <h1 className="text-white">Food Distribution Calendar</h1>
          <h4 className="text-white">{format(currentDate, "MMMM yyyy")}</h4>
        </div>
        <img
          src={Logo}
          width="120"
          height="120"
          alt="logo"
          className={`ms-5 ${styles.logo}`}
        />
      </div>
      <div className={`row ${styles.customGrid} g-0`}>
        {weekDays.map((day) => (
          <div key={day} className={`col ${styles.weekdayHeader}`}>
            {day}
          </div>
        ))}
        <CalendarCards />
        <EventModal />
      </div>
    </Container>
  );
}

export default Calendar;

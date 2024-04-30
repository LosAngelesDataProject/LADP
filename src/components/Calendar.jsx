import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo, useState } from "react";
import styles from "./Calendar.module.css"
import Logo from '../assets/ladpLogo_light.png'
import { Container, Card, Modal } from "react-bootstrap";
import { addDays, subDays } from "date-fns";

function Calendar() {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const events = [
    { date: subDays(new Date(), 6), title: "Event 1" },
    { date: subDays(new Date(), 1), title: "Event 2" },
    { date: subDays(new Date(), 9), title: "Event 3" },
    { date: addDays(new Date(), 3), title: "Event 4" }
  ]
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const startingDayIndex = getDay(firstDayOfMonth);
  const endingDayIndex = getDay(lastDayOfMonth);
  const placeholdersToEnd = 6 - endingDayIndex;
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
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
          <div key={`card-${index}`} className={`col rounded ${styles.calendarCard} ${isToday(day) ? styles.calendarToday : ''}`}>
            <Card.Header className="fw-bold">
              {format(day, "d")}
            </Card.Header>
            {todaysEvents.map((event, eventIndex) => {
              const eventId = `event-${eventIndex}`;
              return (
                <Card.Body key={eventId} className="p-1" onClick={toggle}>
                  {event.title}
                  <Modal 
                    isOpen={modal}
                    toggle={toggle}
                  >
                    <Modal.Header
                        toggle={toggle}>{eventId}</Modal.Header>
                    <Modal.Body>
                      eventId
                    </Modal.Body>
                    <Modal.Footer>
                        <button color="primary" onClick={toggle}>Okay</button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              );
            })}
          </div>
        );
      })}
      {Array.from({ length: placeholdersToEnd }).map((_, index) => (
        <div key={`emptyCard-end-${index}`} className="col" />
      ))}
    </>
  );

  return (
    <Container className={`${styles.calendarConatiner}`}>
      <div className={`mx-0 px-0 ${styles.headerBackground}`}>
        <img
          src={Logo}
          width="120"
          height="120"
          alt="logo"
          className={`ms-5 ${styles.logo}`}
        />      
      </div>
      <div className="mb-4 text-center">
        <h1 >Food Distribution Calendar</h1>
        <h4 >{format(currentDate, "MMMM yyyy")}</h4>
      </div>
      <div className={`row ${styles.customGrid} g-0`}>
        {weekDays.map((day) => (
          <div key={day} className="col p-2">
            <div className="fw-bold text-center">
              {day}
            </div>
          </div>
        ))}
        <CalendarCards/>
      </div>
    </Container>
  );
}

export default Calendar;
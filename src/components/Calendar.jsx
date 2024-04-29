import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";
import styles from "./Calendar.module.css"
import Image from 'react-bootstrap/Image';
import Logo from '../assets/images/logo.png'

function Calendar({ events }) {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const endingDayIndex = getDay(lastDayOfMonth);
  const placeholdersToEnd = 6 - endingDayIndex; // Calculate placeholders needed after last day of the month

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

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

  return (
    <div className={`container ${styles.calendarConatiner}`}>
      <div className={`mx-0 px-0 ${styles.headerBackground}`}>
      <Image src={Logo} height={100} rounded />
      </div>
      <div className="mb-4 text-center">
        <h1 >Food Distribution Calendar</h1>
        <h4 >{format(currentDate, "MMMM yyyy")}</h4>
      </div>
      <div className={`row ${styles.customGrid} gx-2`}>
        {weekDays.map((day) => (
          <div key={day} className="col p-2">
            <div className="fw-bold text-center">
              {day}
            </div>
          </div>
        ))}
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="col border rounded p-2 text-center"
          />
        ))}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvents = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={`col border rounded p-2 text-center ${isToday(day) ? "bg-secondary text-dark" : ''}`}
            >
              {format(day, "d")}
              {todaysEvents.map((event) => (
                <div
                  key={event.title}
                  className="mt-1 bg-success rounded text-white p-1"
                >
                  {event.title}
                </div>
              ))}
            </div>
          );
        })}
         {Array.from({ length: placeholdersToEnd }).map((_, index) => (
                    <div
                        key={`empty-end-${index}`}
                        className="col border rounded p-2 text-center"
                    />
                ))}
      </div>
    </div>
  );
}

export default Calendar;
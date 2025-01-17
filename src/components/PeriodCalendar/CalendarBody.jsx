import { useRef } from "react";
import CalendarMonth from "./CalendarMonth";
import styles from "./CalendarStyle.module.css";
import { CURRENT_YEAR } from "@constants/admin";
import PropTypes from "prop-types";

CalendarBody.propTypes = {
  year: PropTypes.number.isRequired,
  period: PropTypes.object.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default function CalendarBody({ year, period, setPeriod }) {
  const isStart = useRef(true);
  const calendars = [];

  // Render calendar
  // 역순으로 달력 표시
  if (year == CURRENT_YEAR) {
    for (let month = 0; month <= new Date().getMonth(); month++) {
      calendars.push([year, month]);
    }
  } else {
    for (let month = 0; month < 12; month++) {
      calendars.push([year, month]);
    }
  }

  return (
    <>
      <div className={styles.calendar_body}>
        {calendars.map((calendar, idx) => {
          return (
            <CalendarMonth
              key={idx}
              year={calendar[0]}
              month={calendar[1]}
              period={period}
              setPeriod={setPeriod}
              isStart={isStart}
            />
          );
        })}
      </div>
    </>
  );
}

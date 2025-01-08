import tw from "tailwind-styled-components";
import styles from "./CalendarStyle.module.css";
import { useRef, useEffect } from "react";
import CalendarBody from "./CalendarBody";
import { CURRENT_YEAR } from "@constants/admin";
import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

CalendarContainer.propTypes = {
  period: PropTypes.object,
  setPeriod: PropTypes.func,
  onClose: PropTypes.func,
};

export default function CalendarContainer({ period, setPeriod, onClose }) {
  const containerRef = useRef(null);

  const YEAR_RANGE = 10;
  const years = Array.from(
    { length: YEAR_RANGE },
    (_, i) => CURRENT_YEAR - (YEAR_RANGE - 1) + i,
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
  }, []);

  return (
    <>
      <div className="absolute bg-white border border-gray-400 rounded w-80 h-max">
        <div className="flex items-center justify-between w-full h-10 p-2 border-b border-gray-400 ">
          <span>기간 선택</span>
          <button onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>
        <Container className={styles.scrollable_calendar} ref={containerRef}>
          {years.map((year, idx) => {
            return (
              <div key={idx} className={styles.calendar}>
                <div className={styles.calendar_header}>{year}년</div>
                <CalendarBody
                  year={year}
                  period={period}
                  setPeriod={setPeriod}
                />
              </div>
            );
          })}
        </Container>
      </div>
    </>
  );
}

const Container = tw.div`
  scrollable-calendar       
`;

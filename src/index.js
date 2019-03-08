import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";

function App() {
  const [startDate, setStartDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const calendarDates = new Array(31).fill(0).map((e, i) => i);

  function updateDate(day) {
    if (!startDate) setStartDate(day);
    setEndDate(day);
  }

  function handleHover(day) {
    if (!startDate) return;
    setHoverDate(day);
  }

  return (
    <div className="App">
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>

      <StyledCalendar className="calendar">
        {calendarDates.map((day, index) => {
          const realDayNumber = index + 1;

          let isSelected = false;
          let isInBetween = false;
          if (realDayNumber === startDate) isSelected = true;
          if (realDayNumber === endDate) isSelected = true;
          if (
            realDayNumber > startDate &&
            (realDayNumber < hoverDate || realDayNumber < endDate)
          )
            isInBetween = true;

          return (
            //always put a key when you're mapping over things
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              isInBetween={isInBetween}
              isEnd={endDate === realDayNumber}
              onClick={() => updateDate(realDayNumber)}
              onMouseEnter={() => {
                if (endDate && endDate !== startDate) return;
                handleHover(realDayNumber);
              }}
            >
              {realDayNumber}
            </StyledCalendarDay>
          );
        })}
      </StyledCalendar>
    </div>
  );
}

const StyledCalendar = styled.div`
  max-width: 400px;
  border: 1px solid #000;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #fff;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center; //align vertically (cross axis)
  justify-content: center; //align horizontally (main axis)
  background: ${props => {
    if (props.isEnd) return "#0FF";
    if (props.isSelected) return "#10ADED";
    if (props.isInBetween) return "#C0FFEE";

    return "none";
  }}
  border: none;
  transition: 0.3s ease background;
  padding: 15px;
  color: #444;
  cursor: pointer;
  &:hover {
    background: #bada55;
  }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

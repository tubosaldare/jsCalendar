import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";

function App() {
  const [dateType, setDateType] = useState("start"); // start/end
  const [startDate, setStartDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const calendarDates = Array(31)
    .fill(0)
    .map((e, i) => i);

  function updateDate(day) {
    if (dateType === "start") {
      if (endDate && day > endDate) return;
      setStartDate(day);
      setDateType("end");
      return;
    }
    setEndDate(day);
  }

  function handleHover(day) {
    if (!startDate || endDate) return;
    setHoverDate(day);
  }

  function checkInBetween(day) {
    if (!endDate) return day > startDate && day < hoverDate;
    return day > startDate && day < endDate;
  }

  return (
    <div className="App">
      <StyledDateChooser dateType={dateType}>
        <StyledDateChooserButton
          onClick={() => setDateType("start")}
          isChoosing={dateType === "start"}
        >
          Start Date <span>{startDate}</span>
        </StyledDateChooserButton>
        <StyledDateChooserButton
          onClick={() => setDateType("end")}
          isChoosing={dateType === "end"}
        >
          End Date <span>{endDate}</span>
        </StyledDateChooserButton>
      </StyledDateChooser>

      <StyledCalendar className="calendar">
        {calendarDates.map((day, index) => {
          const realDayNumber = index + 1;
          let isSelected = false;
          let isInBetween = checkInBetween(realDayNumber);
          if (realDayNumber === startDate) isSelected = true; // start
          if (realDayNumber === endDate) isSelected = true; // end

          return (
            <StyledCalendarDay
              key={index}
              isSelected={isSelected}
              isInBetween={isInBetween}
              isEnd={endDate === realDayNumber}
              onClick={() => updateDate(realDayNumber)}
              onMouseEnter={() => {
                if (endDate) return;
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

const StyledDateChooser = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledDateChooserButton = styled.button`
  color: #fff;
  flex: 1;
  padding: 15px;
  background: none;
  cursor: pointer;
  border: none;
  border-bottom: ${props => (props.isChoosing ? "2px solid #fff" : "none")};

  span {
    display: block;
    font-size: 50px;
  }
`;

const StyledCalendar = styled.div`
  max-width: 400px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #fff;
`;

const StyledCalendarDay = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15px;
	color: #444;
	transition: 0.3s ease background;
	border: none;
	background: ${props => {
    if (props.isEnd) return "#f7c99b";
    if (props.isSelected) return "peachpuff";
    if (props.isInBetween) return "peachpuff";

    return "none";
  }}
	cursor: pointer;

	&:hover {
		background: #f7c99b;
	}
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

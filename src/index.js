import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import "./styles.css";

function App() {
  const calendarDates = new Array(31).fill(0).map((e, i) => i);

  let startDate = 1;
  let endDate;

  return (
    <div className="App">
      <StyledCalendar className="calendar">
        {calendarDates.map((day, index) => {
          const isSelected = startDate === index + 1;

          return (
            //always put a key when you're mapping over things
            <StyledCalendarDay key={index} isSelected={isSelected}>
              {day + 1}
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
  grid-gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
`;

const StyledCalendarDay = styled.button`
  display: flex;
  align-items: center; //align vertically (cross axis)
  justify-content: center; //align horizontally (main axis)
  background: ${props => (props.isSelected ? "#c00c00" : "none")};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  border: none;
  transition: 0.3s ease background;
  cursor: pointer;
  &:hover {
    background: #bada55;
  }
  &.is-selected {
    background: #c00c00;
  }
`;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

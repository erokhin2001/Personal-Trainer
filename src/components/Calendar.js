import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import * as moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function TrainingsCalendar() {
  
  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = useState([{
      title: "",
      start: "",
      end: "",
  },]);
  
  useEffect(() => {
      getTrainings();
  }, []);
  
  const getTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then((response) => response.json())
      .then((responseData) => {
          return setTrainings(
              responseData.map((data) => ({
                  title: data.activity,
                  start: new Date(moment(data.date)),
                  end: new Date(moment(data.date).add(data.duration, "minutes")),
              }))
          );
      })
      .catch((err) => console.log(err));
  };
  
  return (
      <div className="Body">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={trainings}
          style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:"500px", margin: "20px"}}
        />
      </div>
  );
};

export default TrainingsCalendar;
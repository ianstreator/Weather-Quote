import React from "react";
import { WeekdayData } from "../Types";

import WeekDayCard from "./WeekDayCard";

function CardTrack({ data }: { data: WeekdayData[] }) {
  console.log(data);
  const forecast = [...data].splice(1, data.length - 1);
  return (
    <div className="carousel max-w-xs m-auto mt-2 md:mt-auto carousel-end space-x-8 p-0 bg-transparent md:max-w-full md:w-full md:justify-between">
      {forecast.map((day, i) => {
        return <WeekDayCard key={i} data={day} />;
      })}
    </div>
  );
}

export default CardTrack;

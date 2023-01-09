import React from "react";
import { WeekdayData } from "../Types";

import WeekDayCard from "./WeekDayCard";

function CardTrack({ data }: { data: WeekdayData[] }) {
  const forecast = data.splice(1, data.length - 1);
  return (
    <div className="carousel max-w-xs m-auto mt-2 md:mt-auto carousel-center space-x-8 md:space p-0 bg-transparent rounded-box md:max-w-full md:w-full">
      {forecast.map((day, i) => {
        return <WeekDayCard key={i} data={day} />;
      })}
    </div>
  );
}

export default CardTrack;

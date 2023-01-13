import React from "react";
import { WeekdayData } from "../Types";

import WeekDayCard from "./WeekDayCard";

function CardTrack({ data }: { data: WeekdayData[] }) {
  console.log(data);
  const forecast = [...data].splice(1, data.length - 1);
  return (
    <div className="carousel max-w-xs mx-auto mt-2 carousel-end space-x-8 p-0 bg-transparent md:max-w-full md:w-full md:justify-between md:mt-auto md:mb-10">
      {forecast.map((day, i) => {
        return <WeekDayCard key={i} data={day} />;
      })}
    </div>
  );
}

export default CardTrack;

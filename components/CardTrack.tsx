import React from "react";
import { WeekdayData } from "../Types";

import WeekDayCard from "./WeekDayCard";

function CardTrack({ data }: { data: WeekdayData[] }) {
  console.log(data);
  return (
    <div className="carousel max-w-xs m-auto mt-2 md:mt-auto carousel-center space-x-8 md:space p-0 bg-transparent rounded-box md:max-w-full md:w-full">
      {data.map((day, i) => {
        console.log(i);
        if (i > 5) return;
        return <WeekDayCard key={i} data={day} />;
      })}
    </div>
  );
}

export default CardTrack;

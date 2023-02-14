import React from "react";
import { WeekdayData } from "../Types";

import WeekDayCard from "./WeekDayCard";

function CardTrack({ data }: { data: WeekdayData[] }) {
  return (
    <div className="scrollbar overflow-y-hidden flex max-w-xs mx-auto mt-2 space-x-8 p-0 bg-transparent md:max-w-full md:w-full md:justify-between md:mt-20 md:mb-10">
      {data.map((day, i) => {
        return <WeekDayCard key={i} data={day} />;
      })}
    </div>
  );
}

export default CardTrack;

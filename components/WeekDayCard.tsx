import React, { JSXElementConstructor, useEffect, useState } from "react";
import Image from "next/image";
import { WeekdayData } from "../Types";

type WeekMap = {
  [int: number]: string;
};

const currentDay: WeekMap = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

const iconSize = 100;

function WeekDayCard({ data }: { data: WeekdayData }) {
  const [cardView, setCardView] = useState<React.ReactNode>();

  const dayNum = new Date(data.dt * 1000).getDay();
  const weekDay = currentDay[dayNum];
  const front = (
    <>
      <figure className="absolute bottom-0 right-0">
        <Image
          src="/turn-arrow.svg"
          alt="weather-icon"
          width={iconSize / 4}
          height={iconSize / 4}
        />
      </figure>
      <figure className="mx-auto">
        <Image
          src={`/${data.weather[0].icon}.svg`}
          alt="weather-icon"
          width={iconSize}
          height={iconSize}
        />
      </figure>

      <p className="w-24 text-xl">{data.weather[0].description}</p>
    </>
  );

  // const back = (

  // )

  useEffect(() => {
    setCardView(front);
  }, [front]);

  return (
    <div className="card max-w-sm w-36 h-52 p-2 text-center flex flex-col items-center justify-around bg-base-100/80 backdrop-blur-sm">
      <h1 className="text-xl font-bold w-36">{weekDay}</h1>
      {cardView}
    </div>
  );
}

export default WeekDayCard;

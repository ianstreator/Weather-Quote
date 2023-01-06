import React, { useEffect, useState } from "react";
import clsx from "clsx";
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
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  const dayNum = new Date(data.dt * 1000).getDay();
  const weekDay = currentDay[dayNum];

  const turnArrow = (
    <figure className="arrow">
      <Image
        src="/turn-arrow.svg"
        alt="weather-icon"
        width={iconSize / 4}
        height={iconSize / 4}
      />
    </figure>
  );

  const front = (
    <div className="card front">
      <h1>{weekDay}</h1>

      <figure className="">
        <Image
          src={`/${data.weather[0].icon}.svg`}
          alt="weather-icon"
          width={iconSize}
          height={iconSize}
        />
      </figure>
      <p className="">{data.weather[0].description}</p>
      {turnArrow}
    </div>
  );

  const back = (
    <div className="card back">
      <h1>{weekDay}</h1>

      <p>{(data.pop * 100).toFixed(0)}% chance of precipitation</p>
      {data.snow && <p>up to {Math.ceil(data.snow!).toFixed(2)}mm of snow</p>}
      {data.rain && <p>up to {Math.ceil(data.rain!).toFixed(2)}mm of rain</p>}

      {turnArrow}
    </div>
  );

  return (
    <div
      onClick={() => setCardFlipped(!cardFlipped)}
      className={clsx("weekday-card", cardFlipped && "flipped")}
    >
      {front}
      {back}
    </div>
  );
}

export default WeekDayCard;

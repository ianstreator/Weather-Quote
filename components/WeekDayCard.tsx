import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { WeekdayData } from "../Types";
import useGetDay from "../hooks/useGetDay";
import useInches from "../hooks/useInches";
import useTime from "../hooks/useTime";

const iconSize = 100;

function WeekDayCard({ data }: { data: WeekdayData }) {
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  const weekDay = useGetDay(data.dt);
  const rain = useInches(data.rain);
  const snow = useInches(data.snow);

  const { timeString: riseTime, timeAbbr: riseAbbr } = useTime(data.sunrise);
  const { timeString: setTime, timeAbbr: setAbbr } = useTime(data.sunset);

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
      <h1>{`${Math.round(data.temp.day)}°`}</h1>

      <figure className="">
        <Image
          src={`/${data.weather[0].icon}.svg`}
          alt="weather-icon"
          width={iconSize / 1.5}
          height={iconSize / 1.5}
        />
      </figure>
      <p>{data.weather[0].description}</p>
      {turnArrow}
    </div>
  );

  const back = (
    <div className="card back text-sm">
      <fieldset>
        <legend>Temperature</legend>
        <div className="w-11/12 flex justify-between items-center mx-auto">
          <p>{`${Math.round(data.temp.max)}°`}</p>
          <Image
            src={"/temp-diff.svg"}
            alt="temp-diff"
            width={iconSize / 3}
            height={iconSize / 3}
          ></Image>
          <p className="text-white/75">{`${Math.round(data.temp.min)}°`}</p>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Precipitation{" "}
          <span className="text-xs font-thin">
            {(data.pop * 100).toFixed(0)}%
          </span>
        </legend>

        {rain && (
          <div className="flex items-center m-auto ">
            <Image
              src={"/rain.svg"}
              alt="rain"
              width={iconSize / 6}
              height={iconSize / 6}
            ></Image>

            <p>{rain}</p>
          </div>
        )}
        {snow && (
          <div className="flex items-center m-auto ">
            <Image
              src={"/snow.svg"}
              alt="snow"
              width={iconSize / 6}
              height={iconSize / 6}
            ></Image>

            <p>{snow}</p>
          </div>
        )}
      </fieldset>
      <fieldset>
        <legend>Sun</legend>
        <div className="relative w-11/12 flex flex-row justify-between mx-auto">
          <div className="absolute top-0 left-0 text-start">
            <p> {riseTime}</p>
            <p className="text-xs"> {riseAbbr}</p>
          </div>

          <Image
            src={"/sun-rise-set.svg"}
            width={iconSize / 2}
            height={iconSize / 2}
            alt="sun-rise-set"
            className="mt-auto mx-auto"
          ></Image>

          <div className="absolute bottom-0 right-0 text-end">
            <p className="text-xs"> {setAbbr}</p>
            <p> {setTime}</p>
          </div>
        </div>
      </fieldset>

      {turnArrow}
    </div>
  );

  return (
    <div className="carousel-item">
      <div
        onClick={() => setCardFlipped(!cardFlipped)}
        className={clsx("weekday-card", cardFlipped && "flipped")}
      >
        {front}
        {back}
      </div>
    </div>
  );
}

export default WeekDayCard;

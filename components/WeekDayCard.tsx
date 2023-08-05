import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Daily } from "../Types";
import useGetDay from "../hooks/useGetDay";
import useInches from "../hooks/useInches";
import useTime from "../hooks/useTime";

const iconSize = 30;

function WeekDayCard({
  dt,
  rain,
  snow,
  sunrise,
  sunset,
  temp: { day, min, max },
  weather: {
    0: { description, icon },
  },
  pop,
}: Daily) {
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);

  const { timeString: riseTime, timeAbbr: riseAbbr } = useTime(sunrise);
  const { timeString: setTime, timeAbbr: setAbbr } = useTime(sunset);

  const turnArrow = (
    <figure className="arrow">
      <Image
        src="/turn-arrow.svg"
        alt="weather-icon"
        width={iconSize}
        height={iconSize}
      />
    </figure>
  );

  const front = (
    <div className="card front">
      <h1>{useGetDay(dt)}</h1>
      <h1>{`${Math.round(day)}°`}</h1>

      <figure className="">
        <Image
          src={`/${icon}.svg`}
          alt="weather-icon"
          width={iconSize}
          height={iconSize}
        />
      </figure>
      <p>{description}</p>
      {turnArrow}
    </div>
  );

  const back = (
    <div className="card back text-sm">
      <fieldset>
        <legend>Temperature</legend>
        <div className="w-11/12 flex justify-between items-center mx-auto">
          <p>{`H: ${Math.round(max)}°`}</p>
          <Image
            src={"/temp-diff.svg"}
            alt="temp-diff"
            width={iconSize}
            height={iconSize}
          ></Image>
          <p className="opacity-60">{`L: ${Math.round(min)}°`}</p>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          Precipitation{" "}
          <span className="text-xs font-thin">{(pop * 100).toFixed(0)}%</span>
        </legend>

        {rain && description.includes("rain") && (
          <div className="flex items-center m-auto ">
            <Image
              src={"/rain-drop.svg"}
              alt="rain"
              width={iconSize}
              height={iconSize}
            ></Image>

            <p>{useInches(rain)}</p>
          </div>
        )}
        {snow && description.includes("snow") && (
          <div className="flex items-center m-auto ">
            <Image
              src={"/snow-flake.svg"}
              alt="snow"
              width={iconSize}
              height={iconSize}
            ></Image>

            <p>{useInches(snow)}</p>
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
            width={iconSize * 1.5}
            height={iconSize * 1.5}
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

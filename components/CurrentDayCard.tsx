import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../Types";
import RainGraph from "./RainGraph";
import useTime from "../hooks/useTime";
import useGetDay from "../hooks/useGetDay";

const svgSize = 100;

function CurrentDayCard({
  city,
  weather: {
    current: {
      dt,
      sunrise,
      sunset,
      temp,
      feels_like,
      weather: {
        0: { icon, description },
      },
    },
    hourly,
    daily: {
      0: {
        temp: { min, max },
      },
    },
  },
}: CityWeatherData) {
  const { timeString: riseTime, timeAbbr: riseAbbr } = useTime(sunrise);
  const { timeString: setTime, timeAbbr: setAbbr } = useTime(sunset);

  return (
    <div className="card max-w-xs w-10/12 max-h-80 rounded-lg bg-black/50 backdrop-blur-sm text-center  text-white mx-auto p-2 flex flex-row content-center md:mx-0 md:max-w-lg">
      <div className="w-1/2 flex flex-col justify-between">
        <h2 className="text-center text-2xl font-bold">{city}</h2>
        <div className="flex-col items-center w-full bg-black/0 bg-opacity-25 p-0">
          <div className="w-10/12 flex flex-row justify-between text-sm mx-auto">
            <p>H: {`${Math.round(max)}°`}</p>
            <p className="opacity-70">L: {`${Math.round(min)}°`}</p>
          </div>
          <RainGraph hourly={hourly} />
          <div className="relative w-10/12 flex flex-row justify-between text-sm mx-auto">
            <div className="absolute top-0 left-0 text-start text-xs">
              <p> {riseTime + " " + riseAbbr}</p>
              <p> Rise</p>
            </div>

            <Image
              src={"/sun-rise-set.svg"}
              width={svgSize * 0.75}
              height={svgSize * 0.75}
              alt="sun-rise-set"
              className="mt-auto mx-auto"
            ></Image>

            <div className="absolute bottom-0 right-0 text-end text-xs">
              <p> Set</p>
              <p> {setTime + " " + setAbbr}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-around bg-black/25">
        <p className="text-2xl font-bold">{useGetDay(dt)}</p>
        <div className="flex-col mx-auto">
          <div className="flex justify-center">
            <p className="text-4xl">{Math.round(temp)}</p>
            <p className="text-xl">℉</p>
          </div>

          <p className="text-xs">( Feels like {Math.round(feels_like)} )</p>
        </div>

        <figure>
          <Image
            src={`/${icon}.svg`}
            alt="icon"
            width={svgSize}
            height={svgSize}
          ></Image>
        </figure>
        <p className="w-full px-2 text-center mx-auto">{description}</p>
      </div>
    </div>
  );
}

export default CurrentDayCard;

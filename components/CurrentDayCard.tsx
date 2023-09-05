import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../types";
import RainGraph from "./RainGraph";
import epochTo12HourTime from "../utils/epochTo12HourTime";
import epochToDayOfWeek from "../utils/epochToDayOfWeek";
import { BASE_ICON_SIZE } from "../utils/constants";

function CurrentDayCard({
  city,
  weather: {
    current: {
      dt: timeEpoch,
      sunrise,
      sunset,
      temp: avgTemp,
      weather: {
        0: { description: weatherDescription, icon: weatherIcon },
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
  const { timeString: riseTime, timeAbbr: riseAbbr } =
    epochTo12HourTime(sunrise);
  const { timeString: setTime, timeAbbr: setAbbr } = epochTo12HourTime(sunset);

  return (
    <div className="max-w-xs h-fit rounded-sm bg-black/50 backdrop-blur-sm text-center  text-white mx-auto p-2 flex flex-col content-center md:mx-0 md:max-w-lg">
      <h2 className="text-xl font-bold pb-2">{city}'s weather</h2>

      <div className="flex flex-row">
        <div className="w-1/2 flex flex-col justify-around items-center bg-black/30 rounded-lg p-2">
          <p className="text-xl">{epochToDayOfWeek(timeEpoch)}</p>
          <div className="flex justify-center">
            <p className="text-xl">{Math.round(avgTemp)}°</p>
          </div>

          <figure>
            <Image
              src={`/${weatherIcon}.svg`}
              alt="icon"
              width={BASE_ICON_SIZE * 7}
              height={BASE_ICON_SIZE * 7}
            ></Image>
          </figure>
          <p className="w-full px-2 text-center mx-auto">
            {weatherDescription}
          </p>
        </div>
        <div className="w-1/2 flex flex-col justify-between p-2">
          <div className="flex-col items-center w-full bg-black/0 bg-opacity-25 p-0">
            <div className="w-full flex flex-row justify-between mx-auto">
              <Image
                src={"/temp-diff.svg"}
                width={BASE_ICON_SIZE * 4}
                height={BASE_ICON_SIZE * 4}
                alt="temp"
              ></Image>
              <div className="flex flex-col">
                <p>H: {`${Math.round(max)}°`}</p>
                <p className="opacity-70">L: {`${Math.round(min)}°`}</p>
              </div>
            </div>
            <RainGraph hourly={hourly} />
            <div className="w-full flex flex-row justify-between items-center">
              <Image
                src={"/sun-rise-set.svg"}
                width={BASE_ICON_SIZE * 4}
                height={BASE_ICON_SIZE * 4}
                alt="sun-rise-set"
              ></Image>
              <div className="flex flex-col">
                <p> {riseTime + " " + riseAbbr}</p>
                <p> {setTime + " " + setAbbr}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentDayCard;

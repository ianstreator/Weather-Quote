import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../Types";
import createTransformer from "tailwind-group-variant";

import RainGraph from "./RainGraph";

const expandVariant = createTransformer();

const time = (epoch: number) => {
  const t = new Date(epoch * 1000);
  const hour = t.getHours();
  const minute = t.getMinutes();

  const timeAbbr = hour < 12 ? "AM" : "PM";
  const hours = hour < 12 ? hour : hour - 12;
  const minutes = minute < 10 ? `0${minute}` : minute;

  const timeString = `${hours}:${minutes} ${timeAbbr}`;
  return timeString;
};
const svgSize = 100;

function CurrentDayCard({ weather, city }: CityWeatherData) {
  const current = weather.current;
  const sunrise = time(current.sunrise);
  const sunset = time(current.sunset);

  const hourly = weather.hourly;
  const highTemp = `${Math.round(hourly[0].temp)}℉`;
  const lowTemp = `${Math.round(hourly[23].temp)}℉`;
  console.log(highTemp, lowTemp);

  return (
    <div
      className={expandVariant(
        "card w-10/12 rounded-none bg-base-100 bg-opacity-75 backdrop-blur-sm shadow-xl text-center text-xl mx-auto p-4 flex flex-row justify-self-center content-center"
      )}
    >
      <div className="w-1/2">
        <h2 className="text-center text-2xl">{city}</h2>
        <div className="flex-col h-max items-center w-full bg-black bg-opacity-25 h-1/2 p-2">
          <div className="w-10/12 flex flex-row justify-between text-sm mx-auto">
            <p>H: {highTemp}</p>
            <p className="opacity-70">L: {lowTemp}</p>
          </div>
          <RainGraph data={weather} />
          <div className="relative w-10/12 flex flex-row justify-between text-sm mx-auto">
            <div className="absolute top-0 left-0 text-start text-xs">
              <p> {sunrise}</p>
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
              <p> {sunset}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-between">
        <p className="text-4xl">{Math.round(current.temp)}℉</p>
        <p className="text-sm">
          ( Feels like {Math.round(current.feels_like)} )
        </p>
        <figure>
          <Image
            src={`/${current.weather[0].icon}.svg`}
            alt="icon"
            width={svgSize}
            height={svgSize}
          ></Image>
        </figure>
        <p className="w-full px-2 text-center mx-auto">
          {current.weather[0].description}
        </p>
      </div>
    </div>
  );
}

export default CurrentDayCard;

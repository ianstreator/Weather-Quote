import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../Types";
import createTransformer from "tailwind-group-variant";
const expandVariant = createTransformer();

const time = (epoch: number) => {
  const t = new Date(epoch * 1000);
  const hour = t.getHours();
  const minute = t.getMinutes();

  const timeAbr = hour < 12 ? "AM" : "PM";
  const hours = hour < 12 ? hour : hour - 12;
  const minutes = minute < 10 ? `0${minute}` : minute;

  const timeString = `${hours}:${minutes}${timeAbr}`;
  return timeString;
};

function CurrentDayCard({ weather: { current }, city }: CityWeatherData) {

  const sunrise = time(current.sunrise);
  const sunset = time(current.sunset);
  return (
    <div
      className={expandVariant(
        "card w-10/12 rounded-none bg-base-100 bg-opacity-75 backdrop-blur-sm shadow-xl text-center text-xl mx-auto p-4 flex flex-row justify-self-center content-center"
      )}
    >
      <div className="w-1/2">
        <h2 className="text-center text-2xl">{city}</h2>
        <div className="w-full bg-black bg-opacity-25 h-1/2">
        <div className="w-10/12 flex flex-row justify-between text-sm mx-auto">
            <p>{sunrise}</p>
            <p>{sunset}</p>
          </div>
          <Image
            src={"/sun-rise-set.svg"}
            width={125}
            height={150}
            alt="sun-rise-125"
            className="mt-auto mx-auto"
          ></Image>
          <div className="w-10/12 flex flex-row justify-between text-sm mx-auto">
            <p>{sunrise}</p>
            <p>{sunset}</p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        <p>{Math.round(current.temp)}℉</p>
        <p className="text-sm">( Feels like {Math.round(current.feels_like)}℉ )</p>
        <figure>
          <Image
            src={`/${current.weather[0].icon}.svg`}
            alt="icon"
            width={125}
            height={125}
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

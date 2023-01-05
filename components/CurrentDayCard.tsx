import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../Types";
import RainGraph from "./RainGraph";
import useTime from "../hooks/useTime";

const svgSize = 100;

function CurrentDayCard({ weather, city }: CityWeatherData) {
  const current = weather.current;
  const sunrise = useTime(current.sunrise);
  const sunset = useTime(current.sunset);

  const hourly = weather.hourly;
  const highTemp = `${Math.round(hourly[0].temp)}℉`;
  const lowTemp = `${Math.round(hourly[23].temp)}℉`;

  return (
    <div className="card max-w-xs w-10/12 max-h-80 rounded-none bg-base-100/80 backdrop-blur-sm shadow-xl text-center text-xl text-white mx-auto p-4 flex flex-row justify-self-center content-center md:mx-0">
      <div className="w-1/2 flex flex-col justify-between">
        <h2 className="text-center text-2xl">{city}</h2>
        <div className="flex-col items-center w-full bg-black/0 bg-opacity-25 p-0">
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
        <div className="flex-col mx-auto">
          <div className="flex justify-center">
            <p className="text-5xl">{Math.round(current.temp)}</p>
            <p className="text-2xl">℉</p>
          </div>

          <p className="text-xs">
            ( Feels like {Math.round(current.feels_like)} )
          </p>
        </div>

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

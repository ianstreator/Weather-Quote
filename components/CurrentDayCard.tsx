import React from "react";
import Image from "next/image";
import { CityWeatherData } from "../Types";

function CurrentDayCard({ weather: { current }, city }: CityWeatherData) {
  return (
    <div className="card w-96 bg-base-100 bg-opacity-75 shadow-xl">
      <figure>
        <Image
          src={`/${current.weather[0].icon}.svg`}
          alt="icon"
          width={200}
          height={200}
        ></Image>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{city}</h2>
        <p>{current.weather[0].description}</p>
      </div>
    </div>
  );
}

export default CurrentDayCard;

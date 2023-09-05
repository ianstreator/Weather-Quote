import React, { useState } from "react";
import clsx from "clsx";
import { Daily } from "../types";

import FrontWeatherCard from "./FrontWeatherCard";
import BackWeatherCard from "./BackWeatherCard";

function WeekDayCard({
  dt: timeEpoch,
  rain,
  snow,
  sunrise,
  sunset,
  temp: { day: avgTemp, min: minTemp, max: maxTemp },
  weather: {
    0: { description: weatherDescription, icon: weatherIcon },
  },
  pop: chanceOfPrecipitation,
}: Daily) {
  const [cardFlipped, setCardFlipped] = useState<boolean>(false);
  const frontCardData = { timeEpoch, avgTemp, weatherDescription, weatherIcon };
  const backCardData = {
    maxTemp,
    minTemp,
    rain,
    snow,
    weatherDescription,
    sunrise,
    sunset,
    chanceOfPrecipitation,
  };

  return (
    <div
      onClick={() => setCardFlipped(!cardFlipped)}
      className={clsx("custom-card w-36 h-60 relative ml-8 first:ml-0", cardFlipped && "flipped")}
    >
      <FrontWeatherCard {...frontCardData} />
      <BackWeatherCard {...backCardData} />
    </div>
  );
}

export default WeekDayCard;

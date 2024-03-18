import React, { useState } from "react";
import clsx from "clsx";
import { Daily } from "../types";

import FrontForecastCard from "./FrontForecastCard";
import BackForecastCard from "./BackForecastCard";

function ForecastCard({
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
      className={clsx("custom-card cursor-pointer rounded-lg w-36 h-60 relative ml-8 first:ml-0 backdrop-blur-sm", cardFlipped && "flipped")}
    >
      <FrontForecastCard {...frontCardData} />
      <BackForecastCard {...backCardData} />
    </div>
  );
}

export default ForecastCard;

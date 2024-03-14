import Image from "next/image";
import { IoIosReturnRight } from "react-icons/io";

import epochToDayOfWeek from "../utils/epochToDayOfWeek";
import { BASE_ICON_SIZE } from "../utils/constants";

type FrontCardData = {
  timeEpoch: number;
  weatherIcon: string;
  weatherDescription: string;
  avgTemp: number;
};

function FrontWeatherCard({
  timeEpoch,
  weatherDescription,
  weatherIcon,
  avgTemp,
}: FrontCardData) {
  return (
    <div className="front absolute bg-black/40 rounded-lg p-2 flex flex-col items-center justify-between w-36 h-60">
      <h1 className="text-xl">{epochToDayOfWeek(timeEpoch)}</h1>
      <h1 className="text-xl">{Math.round(avgTemp)}°</h1>

      <figure>
        <Image
          src={`/${weatherIcon}.svg`}
          alt="weather-icon"
          width={BASE_ICON_SIZE * 6}
          height={BASE_ICON_SIZE * 6}
        />
      </figure>
      <p className="mb-4">{weatherDescription}</p>
      <IoIosReturnRight
        className="absolute bottom-0 right-0 mr-2 mb-1"
        size={BASE_ICON_SIZE * 2}
      />
    </div>
  );
}

export default FrontWeatherCard;

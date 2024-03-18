import Image from "next/image";
import { IoIosReturnLeft } from "react-icons/io";

import millimetersToInches from "../utils/millimetersToInches";
import epochTo12HourTime from "../utils/epochTo12HourTime";
import { BASE_ICON_SIZE } from "../utils/constants";
type BackCardData = {
  minTemp: number;
  maxTemp: number;
  rain?: number;
  snow?: number;
  weatherDescription: string;
  chanceOfPrecipitation: number;
  sunrise: number;
  sunset: number;
};

function BackForecastCard({
  minTemp,
  maxTemp,
  rain,
  snow,
  weatherDescription,
  chanceOfPrecipitation,
  sunrise,
  sunset,
}: BackCardData) {
  const { timeString: riseTime, timeAbbr: riseAbbr } =
    epochTo12HourTime(sunrise);
  const { timeString: setTime, timeAbbr: setAbbr } = epochTo12HourTime(sunset);

  const rainInches =
    rain && millimetersToInches(rain).toFixed(2).replace("0.", ".") + '"';
  const snowInches =
    snow && millimetersToInches(snow).toFixed(2).replace("0.", ".") + '"';

  return (
    <div className="back absolute bg-black/40 rounded-lg p-2 flex flex-col items-center justify-between w-36 h-60">
      <fieldset className="w-full border border-t border-x-0 border-b-0">
        <legend className="pr-1 font-semibold">Temperature</legend>
        <div className="w-full flex justify-between items-center mx-auto">
          <Image
            src={"/temp-diff.svg"}
            alt="temp-diff"
            width={BASE_ICON_SIZE * 3}
            height={BASE_ICON_SIZE * 3}
          ></Image>
          <div className="flex flex-col h-full justify-between">
            <p>{`H: ${Math.round(maxTemp)}°`}</p>
            <p className="opacity-70">{`L: ${Math.round(minTemp)}°`}</p>
          </div>
        </div>
      </fieldset>

      <fieldset className="w-full h-full flex border border-t border-x-0 border-b-0">
        <legend className="pr-1 font-semibold">
          Precip.{" "}
          <span className="font-thin">
            {(chanceOfPrecipitation * 100).toFixed(0)}%
          </span>
        </legend>

        {rain && weatherDescription.includes("rain") && (
          <div className="w-full flex items-center justify-between">
            <Image
              src={"/rain.svg"}
              alt="rain"
              width={BASE_ICON_SIZE * 3}
              height={BASE_ICON_SIZE * 3}
            ></Image>

            <p>{rainInches}</p>
          </div>
        )}
        {snow && weatherDescription.includes("snow") && (
          <div className="w-full flex items-center justify-between">
            <Image
              src={"/snow.svg"}
              alt="snow"
              width={BASE_ICON_SIZE * 3}
              height={BASE_ICON_SIZE * 3}
            ></Image>

            <p>{snowInches}</p>
          </div>
        )}
      </fieldset>
      <fieldset className="mb-4 w-full border border-t border-x-0 border-b-0">
        <legend className="pr-1 font-semibold">
          Sun <span className="font-thin">rise / set</span>
        </legend>
        <div className="relative w-full flex justify-between items-center mx-auto">
          <Image
            src={"/sun-rise-set.svg"}
            width={BASE_ICON_SIZE * 3}
            height={BASE_ICON_SIZE * 3}
            alt="sun"
          ></Image>

          <div className="flex flex-col h-full justify-between text-end">
            <p>{riseTime + " " + riseAbbr}</p>
            <p>{setTime + " " + setAbbr}</p>
          </div>
        </div>
      </fieldset>

      <IoIosReturnLeft
        className="absolute bottom-0 left-0 ml-2 mb-1"
        size={BASE_ICON_SIZE * 2}
      />
    </div>
  );
}

export default BackForecastCard;

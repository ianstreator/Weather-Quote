import { useEffect, useState } from "react";
import { CityWeatherData, Coords, ServerSideAssets } from "../types";
import { nextConfig } from "../next.config";
import Image from "next/image";
const { environment } = nextConfig;

import CurrentDayCard from "../components/CurrentDayCard";
import ForecastCard from "../components/ForecastCard";

export default function Home({
  url,
  quote: { quote, author },
}: ServerSideAssets) {
  const [cityWeatherData, setCityWeatherData] = useState<CityWeatherData>();
  useEffect(() => {
    (async () => {
      const coords = await getCoordinates();
      const cityWeatherData = await fetchCityWeatherData(coords);
      setCityWeatherData(cityWeatherData);
    })();
  }, []);
  if (!cityWeatherData)
    return (
      <div>
        <p>Checking weather...</p>
        <p>Setting scene...</p>
        <p>Finding quote...</p>
      </div>
    );

  return (
    <main className="w-screen h-screen flex flex-col md:p-10">
      <Image
        src={url}
        alt="background"
        fill
        priority={true}
        className="absolute z-[-1] object-cover	"
      ></Image>
      <div className="flex flex-col justify-start mb-2 md:pb-0 md:flex-row-reverse md:w-full md:justify-between">
        <div className="w-full py-4 flex flex-col bg-gradient-to-b from-zinc-900 md:w-max md:ml-6 md:h-fit md:bg-gradient-to-tl md:from-zinc-800/50 md:to-zinc-800 md:rounded-sm md:px-4">
          <div className="max-w-xs w-full mx-auto px-2">
            <p className="text-md text-start">{quote}</p>
            <p className="text-end pt-2">-{author}</p>
          </div>
        </div>
        <CurrentDayCard {...cityWeatherData} />
      </div>
      <div className="max-w-xs h-fit mx-auto relative flex flex-row overflow-hidden overflow-x-scroll md:mt-auto md:max-w-full lg:mx-0 lg:justify-between">
        {cityWeatherData.weather.daily.map((day, i) => {
          return <ForecastCard key={i} {...day} />;
        })}
      </div>
    </main>
  );
}

const getCoordinates = async () => {
  const {
    coords: { latitude: lat, longitude: lon },
  }: { coords: { latitude: number; longitude: number } } = await new Promise(
    (res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    }
  );
  return { lat, lon };
};

const fetchCityWeatherData = async (coords: Coords) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coords),
  };
  try {
    const res = await fetch(`${window.location.href}api/weather`, options);
    const data: CityWeatherData = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export async function getServerSideProps() {
  try {
    const res = await fetch(`${environment}api/assets`);
    const { url, quote } = (await res.json()) as ServerSideAssets;
    return {
      props: { url, quote },
    };
  } catch (error) {
    return {
      props: { error },
    };
  }
}

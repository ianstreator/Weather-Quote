import { useEffect, useState } from "react";
import { CityWeatherData, Coords, ServerSideAssets } from "../Types";
import { nextConfig } from "../next.config";
const { environment } = nextConfig;
import createTransformer from "tailwind-group-variant";
const expandVariant = createTransformer();

import Image from "next/image";

import WeekDayCard from "../components/WeekDayCard";
import CurrentDayCard from "../components/CurrentDayCard";
import QuoteCard from "../components/QuoteCard";
import CardTrack from "../components/CardTrack";

export default function Home({ url, quote }: ServerSideAssets) {
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
    <main
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className={expandVariant("w-screen, h-screen flex-col -z-50 absolute")}
    >
      <QuoteCard quote={quote} />
      <CurrentDayCard
        weather={cityWeatherData.weather}
        city={cityWeatherData.city}
      />
      <div className="w-screen h-1/3 bg-gradient-to-b from-black absolute top-0 -z-10"></div>
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
    const data = (await res.json()) as CityWeatherData;
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

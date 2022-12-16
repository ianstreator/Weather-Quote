import { useEffect, useState } from "react";
import { CityWeatherData, Coords, ServerSideAssets } from "../Types";
import { nextConfig } from "../next.config";
const { environment } = nextConfig;

import Image from "next/image";

import WeekDayCard from "../components/WeekDayCard";
import CurrentDayCard from "../components/CurrentDayCard";

export default function Home({ url, quote }: ServerSideAssets) {
  const [cityWeatherData, setCityWeatherData] = useState<CityWeatherData>();

  console.log(url, "undefined?");
  console.log(quote, "undefined?");

  useEffect(() => {
    (async () => {
      const coords = await getCoordinates();
      const cityWeatherData = await fetchCityWeatherData(coords);
      setCityWeatherData(cityWeatherData);
    })();
  }, []);

  if (!cityWeatherData) return <div>Checking weather...</div>;

  return (
    <main
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CurrentDayCard
        weather={cityWeatherData.weather}
        city={cityWeatherData.city}
      />
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
    const res = await fetch(`${environment}api/weather`, options);
    const data = (await res.json()) as Promise<CityWeatherData>;
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

import { useEffect, useState } from "react";
import { CityWeatherData, Coords, ServerSideAssets } from "../Types";
import { nextConfig } from "../next.config";
const { environment } = nextConfig;

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
  console.log(cityWeatherData?.weather);
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
      className="w-screen h-screen"
    >
      <div className="w-screen h-screen mx-auto flex flex-col md:flex-wrap-reverse md:p-4 md:w-10/12">
        <div className="flex flex-col md:flex-row-reverse md:w-full md:justify-between">
          <QuoteCard quote={quote} />
          <CurrentDayCard
            weather={cityWeatherData.weather}
            city={cityWeatherData.city}
          />
        </div>

        {/* <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"> */}
        <CardTrack data={cityWeatherData.weather.daily} />
        {/* </div> */}
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

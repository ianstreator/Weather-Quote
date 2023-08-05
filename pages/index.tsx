import { useEffect, useState } from "react";
import { Weather, CityWeatherData, Coords, ServerSideAssets } from "../Types";
import { nextConfig } from "../next.config";
import Image from "next/image";
const { environment } = nextConfig;

import CurrentDayCard from "../components/CurrentDayCard";
import WeekDayCard from "../components/WeekDayCard";

export default function Home({ url, quote:{quote,author} }: ServerSideAssets) {
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
      className="w-screen h-screen"
    >
      <div className="w-screen h-screen mx-auto flex flex-col md:pt-20 md:px-20 md:w-10/12 md:scale-125">
        <div className="flex flex-col md:flex-row-reverse md:w-full md:justify-between">
          <div className="w-screen max-h-72 text-white py-4 flex flex-row justify-center bg-gradient-to-b from-zinc-900 md:w-max md:ml-6 md:h-fit md:bg-gradient-to-tl md:from-zinc-800/50 md:to-zinc-800 md:rounded-lg">
            <div className="w-10/12 max-w-xs px-4 md:px-0">
              <p className="text-md text-start">{quote}</p>
              <p className="text-end pt-2">-{author}</p>
            </div>
          </div>
          <CurrentDayCard {...cityWeatherData} />
        </div>
        <div className="scrollbar-hide overflow-x-scroll flex max-w-xs mx-auto mt-4 md:mt-8 space-x-8 p-0 bg-transparent md:max-w-full md:w-full md:justify-between">
          {cityWeatherData.weather.daily.map((day, i) => {
            return <WeekDayCard key={i} {...day} />;
          })}
        </div>
        <div className="footer-container max-w-xs mx-auto md:max-w-full md:justify-start md:items-start md:pl-0">
      <a className="footer-card md:m-1" href="https://github.com/ianstreator" target="_blank" rel="noreferrer">
        <Image
          src={"/github-icon.svg"}
          width={25}
          height={25}
          alt="github"
        ></Image>
        &nbsp; ianstreator
      </a>
      <a className="footer-card md:m-1"  href="https://openweathermap.org" target="_blank" rel="noreferrer">
        <Image
          src={"/openweather-icon.svg"}
          width={25}
          height={25}
          alt="github"
        ></Image>
        &nbsp; OpenWeather
      </a>
    </div>
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

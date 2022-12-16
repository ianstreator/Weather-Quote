import { useEffect, useState } from "react";
import { CityWeatherData, Coords, ServerSideAssets } from "../Types";
import { nextConfig } from "../next.config";
const { environment } = nextConfig;

import Image from "next/image";

import WeekDayCard from "../components/WeekDayCard";

export default function Home({ url }: ServerSideAssets) {
  const [cityWeatherData, setCityWeatherData] = useState<CityWeatherData>();

  console.log(url);

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
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={`/${cityWeatherData.weather.current.weather[0].icon}.png`}
            alt="icon"
            width={400}
            height={400}
          ></Image>
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
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
    const data = (await res.json()) as ServerSideAssets;
    console.log(data);
    return {
      props: { data },
    };
  } catch (error) {
    return {
      props: { error },
    };
  }
}

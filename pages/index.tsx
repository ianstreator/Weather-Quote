import { nextConfig } from "../next.config";
import { useEffect, useState } from "react";
import { SetStateAction } from "react";

type WeatherData = {
  city: string | undefined;
  weather: {} | undefined;
};

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  useEffect(() => {
    async function getCoordinates() {
      const pos: { coords: { latitude: number; longitude: number } } =
        await new Promise((res, rej) => {
          navigator.geolocation.getCurrentPosition(res, rej);
        });
      const location = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      return location;
    }
    getWeather(setWeatherData, getCoordinates);
  }, []);
  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  if (!weatherData) return <div>Checking weather...</div>;

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title"> {weatherData?.city}</h2>
          <p>Text to display</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const getWeather = async (
  setWeatherData: React.Dispatch<SetStateAction<WeatherData | undefined>>,
  getCoordinates: () => Promise<{ lat: number; lon: number }>
): Promise<WeatherData> => {
  const { environment } = nextConfig;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(await getCoordinates()),
  };

  try {
    const res = await fetch(`${environment}api/weather`, options);
    const data = (await res.json()) as Promise<{
      city: string;
      weather: {} | undefined;
    }>;
    setWeatherData(await data);
    return data;
  } catch (error) {
    throw error;
  }
};

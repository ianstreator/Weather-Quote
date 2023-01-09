// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Coords, Weather, CityWeatherData, Error } from "../../Types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Coords;
}

const WEATHER_API_BASE_URL = "http://api.openweathermap.org/";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export default async function handler(
  { body: { lat, lon } }: ExtendedNextApiRequest,
  res: NextApiResponse<CityWeatherData | Error>
) {
  // const lonTest = 141.879;
  // const latTest = -12.629;

  const getCurrentCity = async () => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const [{ name: city }] = (await res.json()) as { name: string }[];
    return city;
  };

  const getCurrentWeather = async () => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    const weather = (await res.json()) as Promise<Weather>;
    return weather;
  };

  try {
    const cityWeatherData = (await Promise.all([
      getCurrentCity(),
      getCurrentWeather(),
    ]).then(([city, weather]) => ({
      city,
      weather,
    }))) as CityWeatherData;
    res.status(200).send({ ...cityWeatherData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

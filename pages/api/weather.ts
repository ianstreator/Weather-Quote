// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Coords = {
  lat: number;
  lon: number;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Coords;
}

type Weather = {
  current: {};
  daily: {}[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
};

type Data = {
  city: string | undefined;
  weather: Weather | undefined;
};
type Error = {
  message: any;
};

const WEATHER_API_BASE_URL = "http://api.openweathermap.org/";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  const c = req.body;

  const getCurrentCity = async (c: Coords): Promise<string> => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}geo/1.0/reverse?lat=${c.lat}&lon=${c.lon}&appid=${WEATHER_API_KEY}`
    );
    return (await res.json()).map(
      (cityData: { name: string }): string => cityData.name
    )[0];
  };

  const getCurrentWeather = async (c: Coords) => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}data/2.5/onecall?lat=${c.lat}&lon=${c.lon}&appid=${WEATHER_API_KEY}&exclude=minutely,hourly,alerts&units=imperial`
    );
    const weather = (await res.json()) as Promise<Weather>;
    return weather;
  };

  try {
    const weatherData = await Promise.all([
      getCurrentCity(c),
      getCurrentWeather(c),
    ]).then(([city, weather]: [string, Weather]) => ({ city, weather }));
    res.status(200).send({ ...weatherData });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

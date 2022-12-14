// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    lat: number;
    lon: number;
  };
}
type Coords = {
  lat: number;
  lon: number;
};
type Data = {
  city: string | undefined;
  weather: {} | undefined;
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
    const city = (await res.json()).map(
      (cityData: { name: string }): string => cityData.name
    )[0];
    return city;
  };

  const getCurrentWeather = async (c: Coords): Promise<{}> => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}data/2.5/onecall?lat=${c.lat}&lon=${c.lon}&appid=${WEATHER_API_KEY}&exclude=minutely,hourly,alerts&units=imperial`
    );
    const weather = (await res.json()) as Promise<{}>;
    return weather;
  };

  try {
    const weatherData = await Promise.all([
      getCurrentCity(c),
      getCurrentWeather(c),
    ]).then(([city, weather]: [string, {}]) => ({ city, weather }));
    res.status(200).send({ ...weatherData });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Coords, Weather, CityWeatherData, Error } from "../../types";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Coords;
}

const WEATHER_API_BASE_URL = "http://api.openweathermap.org/";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export default async function handler(
  { body: { lat, lon } }: ExtendedNextApiRequest,
  res: NextApiResponse<CityWeatherData | Error>
) {

  const getCurrentCity = async () => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const [{ name: city }] = (await res.json()) as { name: string }[];
    return city;
  };

  const getOpenWeatherData = async () => {
    const res = await fetch(
      `${WEATHER_API_BASE_URL}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );
    const weather = (await res.json()) as Promise<Weather>;
    return weather;
  };

  const city = await getCurrentCity();
  let weather = (await redis.hgetall(city)) as Weather;

  if (weather) {
    res.status(200).send({ city, weather });
  } else {
    try {
      const weatherData = await getOpenWeatherData();
      weather = {
        current: weatherData.current,
        hourly: weatherData.hourly.splice(0, 23),
        daily: weatherData.daily.splice(1, weatherData.daily.length - 1),
      };

      await redis.hset(city, weather);
      await redis.expire(city, 120);

      res.status(200).send({ city, weather });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

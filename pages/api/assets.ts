// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import {
  ServerSideAssets,
  Quote,
  Error,
  Unsplash,
  RedisURL,
} from "../../Types";
const BASE_API_URL = "https://api.unsplash.com/";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerSideAssets | Error>
) {
  try {
    // const unsplashRes = await fetch(
    //   `${BASE_API_URL}search/photos?query=fungus&per_page=30&order_by=popular&client_id=${UNSPLASH_ACCESS_KEY}`
    // );
    // const { results } = await unsplashRes.json();
    // const images = results.map((imageObject: Unsplash, i: number) => ({
    //   i,
    //   url: imageObject.urls.thumb,
    // }));
    // console.log(images);
    // const zen = "https://zenquotes.io/api/quotes/";
    // const zenRes = await fetch(zen);
    // const data = (await zenRes.json()) as { q: string; a: string }[];
    // const filteredQuotes = data
    //   .filter(({ q }) => q.length < 71)
    //   .map(({ q: quote, a: author }) => ({
    //     quote,
    //     author,
    //   }));
    // await redis.sadd("quotes2", ...filteredQuotes);
    // await redis.rename("quotes2", "quotes");
    // const randIndex = (length: number) => Math.floor(Math.random() * length);

    const randBackground = (await redis.srandmember("urls")) as RedisURL;
    const url = randBackground[1].full;
    const quote = (await redis.srandmember("quotes")) as Quote;

    res.status(200).json({ url, quote });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { ServerSideAssets, Error, Unsplash } from "../../Types";

// const BASE_API_URL = "https://api.unsplash.com/";
// const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerSideAssets | Error>
) {
  try {
    // const unsplashRes = await fetch(
    //   `${BASE_API_URL}search/photos?query=iceland&per_page=50&order_by=popular&client_id=${UNSPLASH_ACCESS_KEY}`
    // );
    // const { results } = await unsplashRes.json();

    // const images = results.map(
    //   (imageObject: Unsplash): string => imageObject.urls.full
    // );

    // const zen = "https://zenquotes.io/api/quotes/";

    // const zenRes = await fetch(zen);
    // const data = (await zenRes.json()) as { q: string; a: string }[];
    // const filteredQuotes = data.map(({ q: quote, a: author }) => ({
    //   quote,
    //   author,
    // }));
    // console.log(filteredQuotes)

    // await redis.lpush("quotes", ...filteredQuotes);
    const randIndex = (length: number) => Math.floor(Math.random() * length);

    const urlsLen = await redis.llen("urls");
    const quotesLen = await redis.llen("quotes");
    console.log(urlsLen, quotesLen);
    console.log(randIndex(urlsLen), randIndex(quotesLen));

    const url = (await redis.lindex(
      "urls",
      randIndex(urlsLen)
    )) as string;

    const { quote } = (await redis.lindex(
      "quotes",
      randIndex(quotesLen)
    )) as ServerSideAssets;
    console.log(url);
    res.status(200).json({ url, quote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}

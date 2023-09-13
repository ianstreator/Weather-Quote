// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { ServerSideAssets, Quote, Error, URLs } from "../../types";
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerSideAssets | Error>
) {
  try {
    const randBackground = (await redis.srandmember("urls")) as URLs;
    const url = randBackground[1].full;
    let quote = (await redis.srandmember("quotes")) as Quote;
    // while (quote.quote.length > 66) {
    //   quote = (await redis.srandmember("quotes")) as Quote;
    // }

    res.status(200).json({ url, quote });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

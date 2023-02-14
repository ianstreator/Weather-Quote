// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Redis } from "@upstash/redis";
import { ServerSideAssets, Quote, Error, URLs } from "../../Types";
const redis = Redis.fromEnv();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerSideAssets | Error>
) {
  try {
    const randBackground = (await redis.srandmember("urls")) as URLs;
    const url = randBackground[1].full;
    const quote = (await redis.srandmember("quotes")) as Quote;

    res.status(200).json({ url, quote });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

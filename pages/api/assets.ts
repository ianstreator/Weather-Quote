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
    
    const getRedisURLs =  () => (await redis.srandmember("urls")) as URLs;
    const getRedisQuote = () => (await redis.srandmember("quotes")) as Quote;

    const [ photo,quote ] Promise.all([getRedisURLs(), getRedisQuote()])

    res.status(200).json({ url:photo[1].full, quote });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

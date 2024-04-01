import { getSecondsUntilMidnight } from "@/utils/time";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const until = getSecondsUntilMidnight();
    return res.status(200).send(until);
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

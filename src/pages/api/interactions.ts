import { hasVoted, setInteractions } from "@/services/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const vote: "up" | "down" = req.body;
    if (!["up", "down"].includes(vote)) {
      return res.status(400).json({ error: "Invalid vote" });
    }

    const ip = (req.headers["x-real-ip"] as string) || "localhost";
    if ((await hasVoted(ip)).voted) {
      return res.status(403).json({ error: "You have already voted" });
    }

    await setInteractions(vote, ip);
    return res.status(200).json({ success: true });
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}

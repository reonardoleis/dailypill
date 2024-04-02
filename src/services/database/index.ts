import { hash } from "@/utils/hash";
import { getSecondsUntilMidnight } from "@/utils/time";
import { kv } from "@vercel/kv";

export async function getDailyPill(): Promise<string | null> {
  const dailyPill = await kv.get<string>("daily-pill");
  return dailyPill;
}

export async function setDailyPill(dailyPill: string): Promise<void> {
  await kv.set<string>("daily-pill", dailyPill, {
    ex: getSecondsUntilMidnight(),
  });
}

export async function getInteractions(): Promise<{ up: number; down: number }> {
  const up = await kv.get<number>("up");
  const down = await kv.get<number>("down");

  return { up: up ?? 0, down: down ?? 0 };
}

export async function setInteractions(
  vote: "up" | "down",
  ip: string
): Promise<void> {
  const key = vote === "up" ? "up" : "down";
  const current = await kv.get<number>(key);
  await kv.set<number>(key, (current ?? 0) + 1, {
    ex: getSecondsUntilMidnight(),
  });
  await kv.set<string>(`${hash(ip)}-${key}`, "voted", {
    ex: getSecondsUntilMidnight(),
  });
}

export async function hasVoted(
  ip: string
): Promise<{ voted: boolean; vote: "up" | "down" }> {
  const up = await kv.get<string>(`${hash(ip)}-up`);
  const down = await kv.get<string>(`${hash(ip)}-down`);
  return {
    voted: up === "voted" || down === "voted",
    vote: up ? "up" : "down",
  };
}

export async function getViews(): Promise<number> {
  const views = await kv.get<number>("views");
  return views ?? 0;
}

export async function incrementViews(): Promise<void> {
  const views = await getViews();

  if (views === 0) {
    await kv.set<number>("views", 1, {
      ex: getSecondsUntilMidnight(),
    });
    return;
  }

  await kv.set<number>("views", views + 1, {
    ex: getSecondsUntilMidnight(),
  });
}

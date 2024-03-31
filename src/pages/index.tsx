import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Display from "@/app/components/Display";
import {
  getDailyPill,
  getInteractions,
  hasVoted,
  setDailyPill,
} from "@/app/services/database";
import { generateDailyPill } from "@/app/services/ai";
import Interactions from "@/app/components/Interactions";
import favicon from "@/app/favicon.ico";

interface HomeProps {
  value: string;
  up: number;
  down: number;
  voted: boolean;
  vote: "up" | "down";
}

export default function Home({ value, up, down, voted, vote }: HomeProps) {
  const [until, setUntil] = useState(
    Math.round(getSecondsUntilMidnight() / 60)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setUntil((prev) => prev - 1);
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Rain />
      <Head>
        <title>The Daily Pill 💊</title>
        <meta name="description" content={value} />
        <meta property="og:title" content="The Daily Pill 💊" />
        <meta property="og:description" content={value} />
        <link rel="icon" href={favicon.src} />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <main className="flex min-h-screen justify-center items-center p-8 min-w-screen">
        <div className="flex flex-col items-start justify-center p-6 backdrop-blur-md rounded-xl border border-white border-opacity-20 h-fit w-fit">
          <Display value={value} />
          <Interactions up={up} down={down} voted={voted} vote={vote} />
          <div className="flex flex-row w-full mt-1 mb-[-10px]">
            <span className="text-[11px] text-gray-500 flex flex-row">
              You will be enlightened with a new{" "}
              <div className="the-pill-sm w-fit">💊</div> in {until} minutes
              🗿🍷
            </span>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 p-1 bg-slate-500 bg-opacity-30 text-[10px]">
          Carefully crafted by{" "}
          <a className="font-bold" href="https://github.com/reonardoleis">
            reonardoleis
          </a>{" "}
          with 💜
        </div>
      </main>
    </>
  );
}

import { NextApiRequest } from "next";
import Rain from "@/app/components/Rain/rain";
import { getSecondsUntilMidnight } from "@/utils/time";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  let dailyPill = await getDailyPill();
  if (!dailyPill) {
    dailyPill = await generateDailyPill();
    if (!dailyPill) {
      dailyPill = "There was a problem generating the daily pill 😢";
    }

    await setDailyPill(dailyPill);
  }

  const interactions = await getInteractions();

  const ip = req.headers["x-real-ip"] as string;
  const vote = await hasVoted(ip);

  return {
    props: {
      value: dailyPill,
      up: interactions.up,
      down: interactions.down,
      voted: vote.voted,
      vote: vote.vote,
    },
  };
}

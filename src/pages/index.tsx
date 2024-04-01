import "@/app/globals.css";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Display from "@/app/components/Display";
import Rain from "@/app/components/Rain/rain";
import {
  getDailyPill,
  getInteractions,
  getViews,
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
  views: number;
}

export default function Home({
  value,
  up,
  down,
  voted,
  vote,
  views,
}: HomeProps) {
  const [until, setUntil] = useState(-1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    (async () => {
      fetch("/api/views", { method: "POST" });

      const timeResponse = await fetch("/api/time");
      const until = parseInt(await timeResponse.text());
      setUntil(Math.round(until / 60));
      interval = setInterval(() => {
        setUntil((prev) => prev - 1);
        if (until <= 0) {
          window.location.reload();
        }
      }, 1000 * 60);
    })();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Rain />
      <Head>
        <title>The Daily Pill 💊</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="description" content={value.replace(/\"/g, "")} />
        <meta property="og:title" content="The Daily Pill 💊" />
        <meta property="og:description" content={value.replace(/\"/g, "")} />
        <link rel="icon" href={favicon.src} />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <main className="flex min-h-screen justify-center items-center p-8 min-w-screen">
        <div
          id="display"
          className="flex p-4 flex-col justify-center backdrop-blur-md rounded-xl border border-white border-opacity-20 h-fit md:max-w-[45vw]"
        >
          <Display value={value} views={views} />
          <Interactions
            up={up}
            down={down}
            voted={voted}
            vote={vote}
            pill={value}
          />
          {until > 0 && (
            <div className="flex flex-row w-full mt-1 mb-[-10px] justify-center">
              <span className="text-[11px] text-gray-500 flex flex-row">
                You will be enlightened with a new{" "}
                <div className="the-pill-sm w-fit">💊</div> in {until} minutes
                🗿🍷
              </span>
            </div>
          )}
        </div>
        <div className="fixed right-0 bottom-0 p-0 bg-slate-500 bg-opacity-30 text-[10px] px-2 py-1">
          Carefully crafted by{" "}
          <a
            className="font-bold"
            href="https://github.com/reonardoleis"
            target="blank"
          >
            reonardoleis
          </a>{" "}
          with 💜
        </div>
      </main>
    </>
  );
}

import { NextApiRequest } from "next";

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

  const views = await getViews();

  return {
    props: {
      value: dailyPill,
      up: interactions.up,
      down: interactions.down,
      voted: vote.voted,
      vote: vote.vote,
      views: views,
    },
  };
}

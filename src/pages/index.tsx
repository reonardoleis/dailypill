import "@/app/globals.css";
import React from "react";
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

interface HomeProps {
  value: string;
  up: number;
  down: number;
  voted: boolean;
  vote: "up" | "down";
}

export default function Home({ value, up, down, voted, vote }: HomeProps) {
  return (
    <>
      <Head>
        <title>The Daily Pill 💊</title>
        <meta name="description" content={value} />
        <meta property="og:title" content="The Daily Pill 💊" />
        <meta property="og:description" content={value} />
      </Head>
      <main className="flex min-h-screen justify-center p-8">
        <div className="flex flex-col items-start justify-center">
          <Display value={value} />
          <Interactions up={up} down={down} voted={voted} vote={vote} />
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

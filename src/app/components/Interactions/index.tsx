import { setInteractions } from "@/app/services/database";
import { useState } from "react";

const Interactions = (props: any) => {
  const [up, setUp] = useState(props.up);
  const [down, setDown] = useState(props.down);
  const [voted, setVoted] = useState(props.voted);
  const [vote, setVote] = useState(props.vote);

  const handleVote = async (vote: "up" | "down") => {
    setVoted(true);
    setVote(vote);
    const add = vote === "up" ? setUp : setDown;

    const response = await fetch("/api/interactions", {
      method: "POST",
      body: vote,
    });

    if (response.ok) {
      add((prev: number) => prev + 1);
    } else {
      setVoted(false);
      setVote(null);
    }
  };

  return (
    <div>
      <div className="flex flex-row mt-4 gap-1">
        <button
          className="p-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 w-[100px]"
          onClick={() => handleVote("up")}
          style={{
            border: voted && vote === "up" ? "2px solid grey" : "none",
            cursor: voted ? "not-allowed" : "pointer",
          }}
          disabled={voted}
        >
          👍 {up}
        </button>
        <button
          className="p-3 bg-red-900 text-white rounded-lg hover:bg-red-800 w-[100px]"
          onClick={() => handleVote("down")}
          style={{
            border: voted && vote === "down" ? "2px solid grey" : "none",
            cursor: voted ? "not-allowed" : "pointer",
          }}
          disabled={voted}
        >
          👎 {down}
        </button>
      </div>
    </div>
  );
};

export default Interactions;

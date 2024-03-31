import { useState } from "react";

const Interactions = (props: any) => {
  const [up, setUp] = useState(props.up);
  const [down, setDown] = useState(props.down);
  const [voted, setVoted] = useState(props.voted);
  const [vote, setVote] = useState(props.vote);

  const handleVote = async (vote: "up" | "down") => {
    if (voted) return;
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
          className="p-3 text-white rounded-lg border border-solid border-gray-900 w-[100px] hover:bg-gray-500 hover:bg-opacity-30 transition-all disabled:bg-gray-700 disabled:bg-opacity-30 disabled:cursor-not-allowed"
          onClick={() => handleVote("up")}
          style={{
            cursor: voted ? "not-allowed" : "pointer",
          }}
          disabled={vote === "up"}
        >
          👍 {up}
        </button>
        <button
          className="p-3 text-white rounded-lg border border-solid border-gray-900 w-[100px] hover:bg-gray-500 hover:bg-opacity-30 transition-all disabled:bg-gray-700 disabled:bg-opacity-30 disabled:cursor-not-allowed"
          onClick={() => handleVote("down")}
          style={{
            cursor: voted ? "not-allowed" : "pointer",
          }}
          disabled={vote === "down"}
        >
          👎 {down}
        </button>
      </div>
    </div>
  );
};

export default Interactions;

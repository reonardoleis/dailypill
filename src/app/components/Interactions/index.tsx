import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";

const Interactions = (props: any) => {
  const [up, setUp] = useState(props.up);
  const [down, setDown] = useState(props.down);
  const [voted, setVoted] = useState(props.voted);
  const [vote, setVote] = useState(props.vote);
  const [copied, setCopied] = useState(false);

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

  const handleShare = async () => {
    await navigator.share({
      title: "The Daily Pill 💊",
      text: "Check out today's pill!",
      url: window.location.href,
    });
  };

  const handleCopy = async () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    await navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row mt-4 gap-1">
        <div className="flex flex-row gap-1 w-full">
          <button
            className="p-2 text-white rounded-md border border-solid border-white border-opacity-10 w-[50px] h-[50px] text-xs hover:bg-gray-500 hover:bg-opacity-30 transition-all disabled:bg-gray-700 disabled:bg-opacity-30 disabled:cursor-not-allowed"
            onClick={() => handleVote("up")}
            style={{
              cursor: voted ? "not-allowed" : "pointer",
            }}
            disabled={vote === "up"}
          >
            👍 {up}
          </button>
          <button
            className="p-2 text-white rounded-md border border-solid border-white border-opacity-10 w-[50px] h-[50px] text-xs hover:bg-gray-500 hover:bg-opacity-30 transition-all disabled:bg-gray-700 disabled:bg-opacity-30 disabled:cursor-not-allowed"
            onClick={() => handleVote("down")}
            style={{
              cursor: voted ? "not-allowed" : "pointer",
            }}
            disabled={vote === "down"}
          >
            👎 {down}
          </button>
        </div>
        <div className="flex flex-row gap-1 items-center justify-end">
          <button
            className="p-3 text-white border border-white border-opacity-10 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all select-none"
            onClick={handleCopy}
            title="Copy URL"
          >
            {!copied ? <FaRegCopy /> : <IoCheckmarkOutline />}
          </button>
          <button
            className="p-3 text-white border border-white border-opacity-10 rounded-full hover:bg-gray-500 hover:bg-opacity-30 transition-all select-none"
            onClick={handleShare}
            title="Share"
          >
            <CiShare2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interactions;

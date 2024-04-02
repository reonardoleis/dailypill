import { getSecondsUntilMidnight, getTimeInCustomFormat } from "@/utils/time";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";

const Display = (props: any) => {
  return (
    <>
      <div className="flex flex-col select-none">
        <div className="flex flex-row justify-between items-center">
          <span className="text-sm text-gray-400 font-light">
            {getTimeInCustomFormat()} (UTC)
          </span>
          <div className="flex flex-row text-sm text-gray-400 font-light items-center justify-center gap-1">
            <IoMdEye /> {props.views}
          </div>
        </div>
        <div className="flex flex-col justify-start mb-3">
          <div className="flex flex-row text-[40px] font-bold">
            The Daily Pill <div className="the-pill w-auto ml-2">💊</div>
          </div>
          <div className="flex flex-row text-xs text-gray-500 mt-[-5px]">
            (Take it sparingly, preferably with a glass of wine 🍷)
          </div>
        </div>
      </div>
      <div className="flex items-center text-justify">
        <p className="text-xl">{`"${props.value.replace(/\"/g, "")}"`}</p>
      </div>
    </>
  );
};

export default Display;

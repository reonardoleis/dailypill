import { getSecondsUntilMidnight, getTimeInCustomFormat } from "@/utils/time";
import { useState } from "react";

const Display = (props: any) => {
  const [until, setUntil] = useState(getSecondsUntilMidnight());
  return (
    <div>
      <div className="flex flex-col select-none">
        <div className="flex flex-row justify-between">
          <span className="text-sm text-gray-500">
            {getTimeInCustomFormat()}
          </span>
        </div>
        <div className="flex flex-col justify-start mb-3">
          <div className="flex flex-row text-[40px] ">
            The Daily Pill <div className="the-pill w-auto ml-2">💊</div>
          </div>
          <div className="flex flex-row text-xs text-gray-500 mt-[-7px]">
            (Take it sparingly, preferably with a glass of wine 🍷)
          </div>
        </div>
      </div>
      <div className="flex items-center text-justify">
        <p className="text-xl">{`"${props.value.replace(/\"/g, "")}"`}</p>
      </div>
    </div>
  );
};

export default Display;

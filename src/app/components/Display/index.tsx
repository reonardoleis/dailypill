import { getTimeInCustomFormat } from "@/utils/time";

const Display = (props: any) => {
  return (
    <div>
      <div className="flex flex-col">
        <span className="mb-[-12px] text-xs text-gray-500">
          {getTimeInCustomFormat()}
        </span>
        <h1 className="text-[40px] flex flex-row">
          The Daily Pill <div className="the-pill w-auto ml-2">💊</div>
        </h1>
      </div>
      <div className="flex items-center">
        <p className="text-xl">{`"${props.value}"`}</p>
      </div>
    </div>
  );
};

export default Display;

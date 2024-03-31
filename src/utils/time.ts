export function getTimeInCustomFormat(): string {
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate: Date = new Date();
  const dayOfWeek: string = days[currentDate.getDay()];
  const dayOfMonth: number = currentDate.getDate();
  const month: string = months[currentDate.getMonth()];
  const year: number = currentDate.getFullYear();

  const ordinalIndicator: string = getOrdinalIndicator(dayOfMonth);

  return `${dayOfWeek}, the ${dayOfMonth}${ordinalIndicator} of ${month} of ${year}`;
}

function getOrdinalIndicator(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export const getSecondsUntilMidnight = (): number => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diffMilliseconds = midnight.getTime() - now.getTime();
  const ex = Math.floor(diffMilliseconds / 1000);
  return ex;
};

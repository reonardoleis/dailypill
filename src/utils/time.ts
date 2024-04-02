export function getTimeInCustomFormat(): string {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.getUTCMonth();
  const year = now.getUTCFullYear();
  const dayOfWeek = now.getUTCDay();
  const monthName = getMonthName(month);
  const ordinalIndicator = getOrdinalIndicator(day);

  return `${getDayOfWeek(
    dayOfWeek
  )}, the ${day}${ordinalIndicator} of ${monthName} of ${year}`;
}

function getDayOfWeek(day: number): string {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}

function getMonthName(month: number): string {
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "";
  }
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
  midnight.setUTCHours(24, 0, 0, 0);

  const millisecondsUntilMidnight = midnight.getTime() - now.getTime();
  return Math.floor(millisecondsUntilMidnight / 1000);
};


function solution(D) {
  // Days of the week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Step 1: Convert each date key to weekday and sum values
  const weekSums = {};
  for (const [dateStr, value] of Object.entries(D)) {
    const day = days[new Date(dateStr).getDay()];
    weekSums[day] = (weekSums[day] || 0) + value;
  }

  // Step 2: Ensure all 7 days exist
  for (const day of days) {
    if (!(day in weekSums)) weekSums[day] = null;
  }

  // Step 3: Fill missing days using mean of previous and next existing day
  const dayIndexes = days.reduce((acc, d, i) => ({ ...acc, [d]: i }), {});
  for (let i = 0; i < days.length; i++) {
    const day = days[i];
    if (weekSums[day] === null) {
      // Find previous day with value
      let prev = i - 1;
      while (prev >= 0 && weekSums[days[prev]] === null) prev--;
      // Find next day with value
      let next = i + 1;
      while (next < days.length && weekSums[days[next]] === null) next++;
      // Mean of prev and next day values
      if (prev >= 0 && next < days.length)
        weekSums[day] = Math.round((weekSums[days[prev]] + weekSums[days[next]]) / 2);
    }
  }

  return weekSums;
}

// Example usage
const D = {
  "2020-01-01": 6,
  "2020-01-04": 12,
  "2020-01-05": 14,
  "2020-01-06": 2,
  "2020-01-07": 4
};

console.log(solution(D));

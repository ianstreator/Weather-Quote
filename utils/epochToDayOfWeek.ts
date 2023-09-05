const weekDays: {
  [int: number]: string;
} = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function epochToDayOfWeek(int: number) {
  const dayNum = new Date(int * 1000).getDay();
  const weekDay = weekDays[dayNum];
  return weekDay;
}

export default epochToDayOfWeek;

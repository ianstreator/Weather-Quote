const currentDay: {
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

function useGetDay(int: number) {
  const dayNum = new Date(int * 1000).getDay();
  const weekDay = currentDay[dayNum];
  return weekDay;
}

export default useGetDay;

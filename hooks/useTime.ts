function useTime(epoch: number) {
  const t = new Date(epoch * 1000);
  let hour = t.getHours();
  let minute: number | string = t.getMinutes();

  const timeAbbr = hour < 12 ? "AM" : "PM";

  if (hour > 12) hour -= 12;
  if (hour === 0) hour = 12;

  if (minute < 10) minute = `0${minute}`;

  const timeString = `${hour}:${minute}`;
  return { timeString, timeAbbr };
}

export default useTime;

function useTime(epoch: number) {
  const t = new Date(epoch * 1000);
  const hour = t.getHours();
  const minute = t.getMinutes();

  const timeAbbr = hour < 12 ? "AM" : "PM";
  const hours = hour <= 12 ? hour : hour - 12;
  const minutes = minute < 10 ? `0${minute}` : minute;

  const timeString = `${hours}:${minutes} ${timeAbbr}`;
  return timeString;
}

export default useTime;

export const getDate = (timestamp: number): string => {
  const day = new Date(timestamp);
  const yyyy = day.getFullYear();
  let dd: number | string = day.getDate();
  let mm: number | string = day.getMonth() + 1;
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}/${mm}/${yyyy}`;
};

export const get24Time = (timestamp: number): string => {
  const ut = new Date(timestamp);
  let h;
  let m;
  let s;
  h = ut.getHours();
  m = ut.getMinutes();
  s = ut.getSeconds();
  if (s <= 9) s = `0${s}`;
  if (m <= 9) m = `0${m}`;
  if (h <= 9) h = `0${h}`;
  return `${h}:${m}:${s}`;
};

export const getFullTime = (timestamp: number): string => {
  return `${getDate(timestamp)}, ${get24Time(timestamp)}`;
};

export const getMsFromHrs = (hours: number | string): number | null => {
  const parsed = parseFloat(hours.toString());
  if (!Number.isNaN(parsed)) {
    return parsed * 60 * 60 * 1000;
  }
  return null;
};

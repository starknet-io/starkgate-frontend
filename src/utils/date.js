export const getDate = timestamp => {
  const day = new Date(timestamp);
  const yyyy = day.getFullYear();
  let dd = day.getDate();
  let mm = day.getMonth() + 1;
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return `${dd}/${mm}/${yyyy}`;
};

export const get24Time = timestamp => {
  let ut = new Date(timestamp);
  let h, m, s;
  h = ut.getHours();
  m = ut.getMinutes();
  s = ut.getSeconds();
  if (s <= 9) s = '0' + s;
  if (m <= 9) m = '0' + m;
  if (h <= 9) h = '0' + h;
  return `${h}:${m}:${s}`;
};

export const getFullTime = timestamp => {
  return `${getDate(timestamp)}, ${get24Time(timestamp)}`;
};

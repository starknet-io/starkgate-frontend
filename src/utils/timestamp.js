export const getTimestamp = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);
  return timestamp - (timestamp % 900);
};

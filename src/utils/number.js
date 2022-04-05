export const afterDecimal = num => {
  if (Number.isInteger(Number(num))) {
    return 0;
  }
  return num.toString().split('.')[1]?.length;
};

export const isZero = num => {
  return Math.sign(num) === 0;
};

export const isNegative = num => {
  return Math.sign(num) === -1;
};

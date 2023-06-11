export const afterDecimal = (num: string): number => {
  if (Number.isInteger(Number(num))) {
    return 0;
  }
  return num.toString().split('.')[1]?.length;
};

export const isZero = (num: number): boolean => {
  return Math.sign(num) === 0;
};

export const isNegative = (num: number): boolean => {
  return Math.sign(num) === -1;
};

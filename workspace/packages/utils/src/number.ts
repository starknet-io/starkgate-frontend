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

export const generateRandomNumber = (max = 10_000_000) => {
  return Math.floor(Math.random() * max);
};

/**
 * Normalises a non-negative decimal string into `{integer, fraction}` form with no
 * leading zeroes in the integer part and no trailing zeroes in the fraction part, so that
 * two numerically equal values always produce identical components.
 */
const splitDecimalString = (value: string): {integer: string; fraction: string} | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!/^\d*(\.\d*)?$/.test(trimmed) || trimmed === '' || trimmed === '.') {
    return null;
  }
  const [rawInteger = '', rawFraction = ''] = trimmed.split('.');
  const integer = rawInteger.replace(/^0+(?=\d)/, '');
  const fraction = rawFraction.replace(/0+$/, '');
  return {integer: integer === '' ? '0' : integer, fraction};
};

/**
 * Compares two non-negative decimal strings exactly, returning -1, 0 or 1.
 *
 * Token balances and deposit caps arrive as decimal *strings* (e.g. "1000000000000000000.5").
 * Converting them with `Number()` before comparing silently loses precision once a value
 * exceeds `Number.MAX_SAFE_INTEGER` (2^53 - 1) or carries more than ~15 significant digits,
 * which can make an amount that is genuinely larger than the balance or the cap compare as
 * smaller — letting an invalid transfer pass validation.
 *
 * This helper compares digit-by-digit on the normalised string representation, so no
 * value is ever routed through a floating-point representation. It returns `null` when
 * either input is not a valid non-negative decimal string, so callers must handle
 * unparseable input explicitly rather than silently treating it as zero.
 */
export const compareDecimalStrings = (a: string, b: string): number | null => {
  const left = splitDecimalString(a);
  const right = splitDecimalString(b);
  if (!left || !right) {
    return null;
  }

  if (left.integer.length !== right.integer.length) {
    return left.integer.length > right.integer.length ? 1 : -1;
  }
  if (left.integer !== right.integer) {
    return left.integer > right.integer ? 1 : -1;
  }

  const fractionLength = Math.max(left.fraction.length, right.fraction.length);
  const leftFraction = left.fraction.padEnd(fractionLength, '0');
  const rightFraction = right.fraction.padEnd(fractionLength, '0');
  if (leftFraction === rightFraction) {
    return 0;
  }
  return leftFraction > rightFraction ? 1 : -1;
};

/**
 * Returns the smaller of two non-negative decimal strings, or `null` when either input
 * cannot be parsed. Used instead of `Math.min`, which would round-trip the values
 * through a float and can return a value that differs from the on-chain balance.
 */
export const minDecimalString = (a: string, b: string): string | null => {
  const comparison = compareDecimalStrings(a, b);
  if (comparison === null) {
    return null;
  }
  return comparison <= 0 ? a : b;
};

/**
 * Adds two non-negative decimal strings exactly, returning `null` if either input is not
 * a valid non-negative decimal string.
 *
 * Addition is performed digit-by-digit with carry propagation on the string representation.
 * Converting to `Number` first would be wrong for token balances: an 18-decimal balance
 * routinely exceeds the 15-17 significant digits an IEEE-754 double can represent, so the
 * sum would be silently rounded — and that sum is what decides whether the bridge still
 * has deposit capacity.
 */
export const addDecimalStrings = (a: string | number, b: string | number): string | null => {
  const left = splitDecimalString(String(a));
  const right = splitDecimalStrings(String(b));
  if (!left || !right) {
    return null;
  }

  const width = Math.max(left.fraction.length, right.fraction.length);
  const leftDigits = `${left.integer}${left.fraction.padEnd(width, '0')}`;
  const rightDigits = `${right.integer}${right.fraction.padEnd(width, '0')}`;

  const widthDigits = Math.max(leftDigits.length, rightDigits.length);
  const leftPadded = leftDigits.padStart(widthDigits, '0');
  const rightPadded = rightDigits.padStart(widthDigits, '0');

  let carry = 0;
  let result = '';
  for (let i = widthDigits - 1; i >= 0; i--) {
    const sum = Number(leftPadded[i]) + Number(rightPadded[i]) + carry;
    result = String(sum % 10) + result;
    carry = Math.floor(sum / 10);
  }
  if (carry > 0) {
    result = String(carry) + result;
  }

  const integerPart = result.slice(0, result.length - width).replace(/^0+(?=\d)/, '') || '0';
  const fractionPart = width > 0 ? result.slice(result.length - width).replace(/0+$/, '') : '';
  return fractionPart.length > 0 ? `${integerPart}.${fractionPart}` : integerPart;
};

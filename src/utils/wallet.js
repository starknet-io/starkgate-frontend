export const formatBalance = balance => {
  return typeof balance === 'number' ? String(fromExponential(balance)) : 'N/A';
};

export const shortenBalance = balance => {
  return balance.length > 7 ? `${balance.substring(0, 7)}...` : balance;
};

export const shortenAddress = account => {
  return account
    ? account.length <= 8
      ? account
      : `${account.substring(0, 5)}...${account.substring(account.length - 3)}`
    : '';
};

const fromExponential = x => {
  if (Math.abs(x) < 1.0) {
    const e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = `0.${new Array(e).join('0')}${x.toString().substring(2)}`;
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x;
};

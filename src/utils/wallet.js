export const formatBalance = balance => {
  return !Math.ceil(balance) ? 0 : balance.toFixed(5);
};

export const formatAddress = account => {
  if (account) {
    return `${account.substring(0, 5)}...${account.substring(account.length - 3)}`;
  }
  return '';
};

export const formatBalance = balance => {
  return typeof balance === 'number' ? parseFloat(balance.toFixed(5)) : 'N/A';
};

export const shortenAddress = account => {
  if (!account) {
    return '';
  }
  return account.length <= 8
    ? account
    : `${account.substring(0, 5)}...${account.substring(account.length - 3)}`;
};

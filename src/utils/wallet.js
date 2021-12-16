export const formatBalance = balance =>
  typeof balance === 'number' ? parseFloat(balance.toFixed(5)) : 'N/A';

export const shortenAddress = account => {
  if (account) {
    return `${account.substring(0, 5)}...${account.substring(account.length - 3)}`;
  }
  return '';
};

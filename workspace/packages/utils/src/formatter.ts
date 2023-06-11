export const formatBalance = (balance: string | null): string => {
  return balance || 'N/A';
};

export const shortenBalance = (balance: string): string => {
  return balance.length > 7 ? `${balance.substring(0, 7)}...` : balance;
};

export const shortenAddress = (account: string, head = 5, tail = 3): string => {
  if (account) {
    return account.length <= head + tail
      ? account
      : `${account.substring(0, head)}...${account.substring(account.length - tail)}`;
  }
  return '';
};

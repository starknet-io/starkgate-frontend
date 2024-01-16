export const formatEthereumSignature = (sig: string) => {
  const r = sig.slice(0, 66);
  const s = `0x${sig.slice(66, 130)}`;
  const v = parseInt(sig.slice(130, 132), 16);
  return {r, s, v};
};

export const formatStarknetSignature = (sig: string[] | string) => {
  if (typeof sig === 'string') {
    const [r, s] = sig.split(',');
    return {r, s};
  }
  return {r: sig[0], s: sig[1]};
};

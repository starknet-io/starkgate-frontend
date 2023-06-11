export const toClasses = (...classes: Array<string>): string => [...classes].join(' ');

export const hexToRgba = (hex: string, opacity: string): string => {
  let c: any;
  if (/^#([A-Fa-f\d]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(c / 65536) & 255, (c >> 8) & 255, c & 255].join(',')}, ${opacity})`;
  }
  return '';
};

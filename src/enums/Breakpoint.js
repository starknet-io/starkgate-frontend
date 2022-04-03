export const Breakpoint = {
  MOBILE: 0,
  TABLET: 769,
  LAPTOP: 1025,
  DESKTOP: 1200
};

export const isMobile = breakpoint => {
  return Breakpoint[breakpoint] === Breakpoint.MOBILE;
};

export const isTablet = breakpoint => {
  return Breakpoint[breakpoint] === Breakpoint.TABLET;
};

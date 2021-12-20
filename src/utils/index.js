import {getLogger, getLogLevel, setLogLevel} from '../services';

export * from './wallet';
export * from './browser';
export * from './string';
export * from './token';
export * from './number';
export * from './hash';
export * from './date';

export const printPackageInfo = (name, version, color) => {
  const currentLogLevel = getLogLevel();
  setLogLevel(getLogger().INFO);
  getLogger().info(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
  setLogLevel(currentLogLevel);
};

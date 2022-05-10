import {getLogger, getLogLevel, setLogLevel} from './logger';

export * from './browser';
export * from './date';
export * from './logger';
export * from './number';
export * from './object';
export * from './parser';
export * from './storage';
export * from './string';
export * from './token';
export * from './wallet';
export * from './starknet';
export * from './ethereum';

export const printPackageInfo = (name, version, color) => {
  const currentLogLevel = getLogLevel();
  setLogLevel(getLogger().INFO);
  getLogger().info(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
  setLogLevel(currentLogLevel);
};

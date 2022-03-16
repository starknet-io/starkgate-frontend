import strings from '../config/strings';
import {getLogger, getLogLevel, setLogLevel} from '../services';
import {getPropertyPath} from './object';

export const printPackageInfo = (name, version, color) => {
  const currentLogLevel = getLogLevel();
  setLogLevel(getLogger().INFO);
  getLogger().info(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
  setLogLevel(currentLogLevel);
};

export const getTranslation = path => getPropertyPath(strings, path);

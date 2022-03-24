import strings from '../config/strings';
import * as blockchain from './blockchain';
import * as browser from './browser';
import * as date from './date';
import * as logger from './logger';
import * as object from './object';
import * as parser from './parser';
import * as storage from './storage';
import * as string from './string';
import * as token from './token';
import * as wallet from './wallet';

const {getLogger, getLogLevel, setLogLevel} = logger;

const printPackageInfo = (name, version, color) => {
  const currentLogLevel = getLogLevel();
  setLogLevel(getLogger().INFO);
  getLogger().info(`%c ${name} v${version}`, `color: ${color || '#ff98f9'};  font-size: large`);
  setLogLevel(currentLogLevel);
};

const getTranslation = path => object.getPropertyPath(strings, path);

const utils = {
  wallet,
  browser,
  string,
  token,
  parser,
  date,
  object,
  blockchain,
  logger,
  storage,
  printPackageInfo,
  getTranslation
};

export default utils;

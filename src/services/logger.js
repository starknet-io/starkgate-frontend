import jsLogger from 'js-logger';

jsLogger.useDefaults({defaultLevel: jsLogger.ERROR});

const getLogger = name => {
  if (!name) {
    return jsLogger;
  }
  return jsLogger.get(name);
};

const getLogLevel = name => {
  return getLogger(name).getLevel();
};

const setLogLevel = (level, name) => {
  getLogger(name).setLevel(level);
};

export {getLogger, getLogLevel, setLogLevel};

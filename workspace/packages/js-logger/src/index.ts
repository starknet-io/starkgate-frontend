import jsLogger, {ILogLevel, ILogger} from 'js-logger';

jsLogger.useDefaults({defaultLevel: jsLogger.ERROR});

export const LogLevel: {[key: string]: ILogLevel} = {
  TRACE: jsLogger.TRACE,
  DEBUG: jsLogger.DEBUG,
  INFO: jsLogger.INFO,
  TIME: jsLogger.TIME,
  WARN: jsLogger.WARN,
  ERROR: jsLogger.ERROR,
  OFF: jsLogger.OFF
};

export const getLogger = (name?: string): ILogger => {
  if (!name) {
    return jsLogger;
  }
  return jsLogger.get(name);
};

export const getLogLevel = (name?: string): ILogLevel => getLogger(name).getLevel();

export const setLogLevel = (level: ILogLevel, name?: string) => {
  getLogger(name).setLevel(level);
};

export type JsLogger = ILogger;

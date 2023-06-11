import {JsLogger, getLogger} from '@starkware-webapps/js-logger';

export const useLogger: (name?: string) => JsLogger = (name?: string) => getLogger(name);

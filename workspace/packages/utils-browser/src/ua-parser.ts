import {UAParser as UAParserCtor, UAParserInstance} from 'ua-parser-js';

export const UAParser: UAParserInstance = new UAParserCtor();

export const isMobile = UAParser.getDevice().type === UAParserCtor.DEVICE.MOBILE;

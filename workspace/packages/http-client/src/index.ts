import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

import {mergeDeep} from '@starkware-webapps/utils';

const DEFAULT_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const createHttpClient = (config: AxiosRequestConfig = {}) => {
  return axios.create(mergeDeep({}, DEFAULT_CONFIG, config));
};

export const parseHttpClientError = (error: AxiosError) => {
  let title = 'Request Error';
  let message = '';
  let code = null;
  if (error) {
    if (error.response) {
      const {statusText, data, status} = error.response;
      title = statusText;
      message = data.message || data;
      code = status;
    } else {
      ({message} = error);
    }
  }
  return {title, message, code};
};

export const isHttpError = (error: unknown): error is HttpError => {
  return axios.isAxiosError(error);
};

export type HttpResponse = AxiosResponse;
export type HttpError = AxiosError;
export type HttpClient = AxiosInstance;

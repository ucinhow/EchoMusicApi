import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { sleep } from "./other";

type Config = { retryCount?: number } & AxiosRequestConfig;

const typeConfig = (cfg?: AxiosRequestConfig) =>
  cfg ? (cfg as Config) : undefined;

const retryRanges = [
  // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
  // 1xx - Retry (Informational, request still processing)
  // 2xx - Do not retry (Success)
  // 3xx - Do not retry (Redirect)
  // 4xx - Do not retry (Client errors)
  // 429 - Retry ("Too Many Requests")
  // 5xx - Retry (Server errors)
  [100, 199],
  [429, 429],
  [500, 599],
];

const shouldRetry = (status: number) => {
  for (const [start, end] of retryRanges) {
    if (status >= start && status <= end) return true;
  }
  return false;
};

export const addRetryInterceptor = (
  instance: AxiosInstance,
  extraOnError?: (err: AxiosError) => Promise<void>,
  { retryLimit = 10 } = {}
) => {
  const onResolve = async (res: AxiosResponse) => {
    const config = typeConfig(res.config) || {};
    let retryCount = config.retryCount || 0;
    if (
      retryCount === retryLimit ||
      res.data.success === undefined ||
      res.data.success === true
    )
      return Promise.resolve(res);

    retryCount += 1;
    config.retryCount = retryCount;
    const retryDelay = retryCount * 200;
    return sleep(retryDelay).then(() => instance.request(config));
  };

  const onError = async (err: AxiosError) => {
    const config = typeConfig(err.config) || {};
    let retryCount = config.retryCount || 0;
    if (
      retryCount === retryLimit ||
      (err.response?.status !== undefined && !shouldRetry(err.response.status))
    )
      return Promise.reject(err);
    await extraOnError?.(err);
    retryCount += 1;
    config.retryCount = retryCount;

    // retryDelay add up with the increasing of retryCount
    const retryDelay = retryCount * 200;
    return sleep(retryDelay).then(() => instance.request(config));
  };

  instance.interceptors.response.use(onResolve, onError);
};

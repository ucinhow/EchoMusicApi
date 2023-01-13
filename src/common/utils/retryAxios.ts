import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
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
    if (status < start || status > end) return false;
  }
  return true;
};

const onError =
  (instance: AxiosInstance, retryLimit: number, retryDelay: number) =>
  async (err: AxiosError) => {
    const config = typeConfig(err.config) || {};
    let retryCount = config.retryCount || 0;
    if (
      retryCount < retryLimit &&
      err.status !== undefined &&
      shouldRetry(err.status)
    )
      return Promise.reject(err);

    retryCount += 1;
    config.retryCount = retryCount;
    return sleep(retryDelay).then(() => instance.request(config));
  };

const addRetryInterceptor = (
  instance: AxiosInstance,
  { retryLimit = 3, retryDelay = 300 } = {}
) => {
  instance.interceptors.response.use(
    null,
    onError(instance, retryLimit, retryDelay)
  );
};

export default addRetryInterceptor;

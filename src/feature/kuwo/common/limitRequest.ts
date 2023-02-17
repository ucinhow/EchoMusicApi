import { AxiosResponse } from "axios";
export interface Task<Rt> {
  (...args: any[]): Promise<Rt> | void;
}
type RequestFn<Response> = () => Promise<AxiosResponse<Response>>;

class LimitRequest {
  requestList: Task<void>[] = [];
  running = false;
  private static instance: LimitRequest | null = null;

  // Singleton Mode
  static getInstance() {
    if (LimitRequest.instance === null) {
      LimitRequest.instance = new LimitRequest();
    }
    return LimitRequest.instance;
  }

  // add in a request to queue
  add(request: Task<void>) {
    this.requestList.push(request);
  }

  // exec logic to fetch data with limit
  exec(limit = 40) {
    if (this.requestList.length === 0) return;
    this.running = true;

    const run = async (): Promise<void> => {
      if (this.requestList.length === 0) return Promise.resolve();
      const requestTask = this.requestList.shift()!;
      await Promise.resolve(requestTask());
      return run();
    };
    const pmsList = new Array(limit)
      .fill(1)
      .map(() => Promise.resolve().then(run));

    // set running false when over
    Promise.all(pmsList).then(() => {
      this.running = false;
    });
  }
  async request<Response>(requestFn: RequestFn<Response>) {
    // transform the request to requestFn promise which will resolve with response,
    // and add it in to limitRequest instance's queue, wait for execution
    return new Promise<AxiosResponse<Response>>((resolve) => {
      limitRequest.add(() => resolve(requestFn()));
      if (!this.running) this.exec();
    });
  }
}

const limitRequest = LimitRequest.getInstance();
export default limitRequest;

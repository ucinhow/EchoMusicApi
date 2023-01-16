import { add } from "date-fns";

export default class Cache {
  map: Map<string, any> = new Map();
  expireMap: Map<string, number> = new Map();
  timer;
  private static instance: Cache | null = null;
  private constructor() {
    this.timer = setInterval(() => {
      for (const [key, expire] of this.expireMap.entries()) {
        if (expire < Date.now()) {
          this.map.delete(key);
          this.expireMap.delete(key);
        }
      }
    }, 1000 * 12 * 60 * 60);
  }
  get(key: string, path?: string) {
    const newKey = path === undefined ? key : `${path}-${key}`;
    return this.map.get(newKey);
  }
  has(key: string, path?: string) {
    const newKey = path === undefined ? key : `${path}-${key}`;
    return this.map.has(newKey);
  }
  set(key: string, val: any, path?: string) {
    const newKey = path === undefined ? key : `${path}-${key}`;
    this.map.set(newKey, val);
    this.expireMap.set(
      newKey,
      add(new Date(), { days: 1 }).valueOf() - Date.now()
    );
  }
  mset(data: [string, any][], path?: string) {
    data.forEach(([key, val]) => {
      const newKey = path === undefined ? key : `${path}-${key}`;
      this.set(newKey, val);
    });
  }
  del(key: string, path?: string) {
    const newKey = path === undefined ? key : `${path}-${key}`;
    this.map.delete(newKey);
    this.expireMap.delete(newKey);
  }
  close() {
    clearInterval(this.timer);
  }
  static getInstance = () => {
    if (!this.instance) {
      this.instance = new Cache();
    }
    return this.instance;
  };
}

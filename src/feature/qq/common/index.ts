import getSecuritySign from "./getSecuritySign";
export * from "./request";
export { getSecuritySign };

export const parsePicUrl = (pmid: string) =>
  `https://y.qq.com/music/photo_new/T002R300x300M000${pmid}.jpg?max_age=2592000`;

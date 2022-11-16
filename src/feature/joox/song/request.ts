import { get, getSecretKey } from "../common";

const params = {
  country: "hk",
  lang: "zh_CN",
  lyric: 1,
  fs: 1,
  im: 0,
  uid: 294318400,
  usk: "5ad4c81b33279309e12dc6eb17d7d939",
};

export const querySong = (id: string) => {
  const secret = getSecretKey(params, id);
  return get("/openjoox2/v1/track/" + id, { params: { ...params, secret } });
};

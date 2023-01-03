import { postMusics } from "../common";
import { BannerResponse } from "./typing";
import { serializeBanner } from "./utils";

const params = {
  comm: {
    cv: 4747474,
    ct: 24,
    format: "json",
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq.json",
    needNewCode: 1,
    uin: 0,
    g_tk_new_20200303: 574136823,
    g_tk: 574136823,
  },
  req_1: {
    module: "music.musicHall.MusicHallPlatform",
    method: "GetFocus",
    param: {},
  },
};

export const queryBanner = () =>
  postMusics<typeof params, BannerResponse>(params);

export const banner = () =>
  queryBanner().then((res) => serializeBanner(res.data));

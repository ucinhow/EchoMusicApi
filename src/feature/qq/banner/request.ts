import { postMusics } from "../common";
import { BannerResponse } from "./typing";
import { searializeBanner } from "./utils";

const params = {
  req_1: {
    module: "music.musicHall.MusicHallPlatform",
    method: "GetFocus",
    param: {},
  },
};

export const queryBanner = () =>
  postMusics<typeof params, BannerResponse>(params);

export const banner = () =>
  queryBanner().then((res) => searializeBanner(res.data));

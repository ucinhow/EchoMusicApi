import { get } from "../common";
import { BannerResponse } from "./typing";
import { serializeBanner } from "./utils";

export const queryBanner = () =>
  get<BannerResponse>("/api/www/banner/index/bannerList", {});

export const banner = () =>
  queryBanner().then((res) => serializeBanner(res.data));

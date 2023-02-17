import { baseGet } from "../common";
import { BannerResponse } from "./typing";
import { serializeBanner } from "./utils";

export const queryBanner = () =>
  baseGet<BannerResponse>("/api/www/banner/index/bannerList", {});

export const banner = () =>
  queryBanner().then((res) => serializeBanner(res.data));

import { DataType, Source } from "./common";

export interface Banner {
  type: DataType;
  id: string;
  picUrl: string;
  src: Source;
}

export interface BannerResponse {
  banners: Array<Banner>;
}

// export type BannerList = Array<Banner>;

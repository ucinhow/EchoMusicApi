import { DataType } from "./common";

export interface Banner {
  type: DataType;
  id: string;
  picUrl: string;
}

export interface BannerResponse {
  banners: Array<Banner>;
}

// export type BannerList = Array<Banner>;

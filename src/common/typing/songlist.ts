import { SongItem } from "./song";

export interface SonglistDetail {
  id: string;
  name: string;
  picUrl: string;
  playCount?: number;
  desc: string;
  total: number;
  // songlist: Array<SongItem>;
  // creator: {
  //   nickname: string;
  //   picUrl: string;
  // };
  createTime: number;
  // updateTime: number;
}

export type SonglistRecommend = Array<SonglistItem>;

export interface SonglistItem {
  id: string;
  name: string;
  picUrl: string;
  playCount: number;
}

export interface SonglistDetailApi {
  (id: string, offset: number, num?: number): Promise<SonglistDetail>;
}

export interface SonglistRecommendApi {
  (): Promise<SonglistRecommend>;
}

export interface SonglistCategory {
  group: Array<{
    id: number;
    name: string;
    item: Array<{ name: string; id: number }>;
  }>;
}

export interface SonglistList {
  list: Array<SonglistItem>;
  totalCnt: number;
}

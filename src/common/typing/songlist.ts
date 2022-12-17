import { SongItem } from "./song";

export interface SonglistDetail {
  id: string;
  name: string;
  picUrl: string;
  playCount?: number;
  desc: string;
  total: number;
  songlist: Array<SongItem>;
  // creator: {
  //   nickname: string;
  //   picUrl: string;
  // };
  createTime: number;
  // updateTime: number;
}

export interface SonglistItem {
  id: string;
  name: string;
  picUrl: string;
}

export interface SonglistDetailApi {
  (id: string, offset: number, num?: number): Promise<SonglistDetail>;
}

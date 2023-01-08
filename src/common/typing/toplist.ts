import { SongItem } from "./song";

export interface ToplistItem {
  id: number; // 排行榜id
  name: string; // 排行榜标题
  intro: string; // 简介
  updateTime: number; // 排行榜更新时间
  // playCount: number; // 收听数
  // total: number; // 歌曲总数
  picUrl: string;
}

export interface ToplistGroup {
  // id: number;
  name: string;
  toplist: Array<ToplistItem>;
}
export interface ToplistAll {
  groups: Array<ToplistGroup>;
}

export interface ToplistDetail {
  id: number;
  name: string;
  intro: string;
  updateTime: number;
  playCount: number;
  total: number;
  songlist: Array<SongItem>;
}
export interface ToplistAllApi {
  (): Promise<ToplistAll>;
}
export interface ToplistDetailApi {
  (id: string, offset: number, num?: number): Promise<ToplistDetail>;
}

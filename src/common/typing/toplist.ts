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

export interface ToplistAll {
  groups: Array<{
    name: string;
    toplist: Array<{
      id: number; // 排行榜id
      name: string; // 排行榜标题
      intro: string; // 简介
      updateTime: number; // 排行榜更新时间
      // playCount: number; // 收听数
      // total: number; // 歌曲总数
      picUrl: string;
    }>;
  }>;
}

export interface ToplistDetail {
  id: number;
  name: string;
  intro: string;
  updateTime: number;
  // playCount: number;
  total: number;
  songlist: Array<SongItem>;
  picUrl: string;
}

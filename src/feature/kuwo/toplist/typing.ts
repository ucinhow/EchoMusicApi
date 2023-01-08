import { MusicItem } from "../song/typing";

type ToplistMenuData = Array<{
  name: string;
  list: Array<{
    sourceid: string;
    intro: string;
    name: string;
    id: string;
    // source: "2";
    pic: string;
    pub: string; // "01月05日更新";
  }>;
}>;

export interface ToplistMenuResponse {
  data: ToplistMenuData;
  msg: string;
}

interface ToplistDetailData {
  img: string;
  musicList: Array<MusicItem>;
  num: string;
  pub: string; // "2023-01-05"
}

export interface ToplistDetailResponse {
  data: ToplistDetailData;
  msg: string;
}

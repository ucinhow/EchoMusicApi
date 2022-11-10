export interface Toplist {
  id: number; // 排行榜id
  // topType: 0;
  // updateType: number;
  name: string; // 排行榜标题
  // titleDetail: string; // 标题详情
  // titleShare: string;
  intro: string; // 简介
  // cornerMark: number;
  // period: string; // 排行榜更新时间 应该是与 updateTime 一致
  updateTime: number; // 排行榜更新时间
  playCount: number; // 收听数
  total: number; // 歌曲总数
  picUrl: string;
  // song: Array<{
  //   rank: number; // 排名
  //   rankType: number; // 排名type?
  //   rankValue: string; // 排名趋势值
  //   songId: number; // 歌曲id
  //   title: string; // 歌曲名
  //   singerName: string; // 歌手名
  //   songType: number; // 歌曲type
  //   cover: string; // 歌曲图片
  // }>;
  // headPicUrl: string;
  // frontPicUrl: string;
  // mbFrontPicUrl: string;
  // mbHeadPicUrl: string;
  // h5JumpUrl: string;
  // updateTips: string; // 更新频率
  // bannerText: string;
  // AdShareContent: string;
  // mbFrontLogoUrl: string;
  // mbHeadLogoUrl: string;
  // topAlbumURL: string;
}

export interface ToplistGroup {
  id: number;
  name: string;
  // type: number;
  toplists: Array<Toplist>;
}
export interface ToplistAllResponse {
  groups: Array<ToplistGroup>;
}

export interface ToplistDetailResponse {
  id: number;
  // topType: number;
  // updateType: number;
  name: string;
  // titleDetail: string;
  // titleShare: string;
  // titleSub: string;
  intro: string;
  // cornerMark: number;
  // period: string;
  updateTime: number;
  // history: {
  //   year: [];
  //   subPeriod: [];
  // };
  playCount: number;
  total: number;
  // song: {
  //   rank: number;
  //   // rankType: 1;
  //   // rankValue: "4";
  //   // recType: 0;
  //   songId: number;
  //   // vid: "";
  //   // albumMid: "0008IAML0V6eAM";
  //   title: string;
  //   singerName: string;
  //   // singerMid: "001Fgvod1Jyc0M";
  //   // songType: 0;
  //   // uuidCnt: 0;
  //   cover: string;
  //   // mvid: 0;
  // }[];
  songList: Array<{
    id: number;
    type: number;
    // mid: "000UO3jv0UcS3m";
    name: string;
    // title: string;
    // subtitle: string;
    singer: Array<{
      id: number;
      // mid: "003u5H9x1vACGo";
      name: string;
      // title: string;
      type: number;
      uin: number;
      // pmid: "";
    }>;
    album: {
      id: number;
      // mid: "003MhhHz05Kc8g";
      name: string;
      // title: string;
      // subtitle: string;
      publicTime: number;
      // pmid: "003MhhHz05Kc8g_1";
    };
    mv: {
      id: number;
      vid: string;
      name: string;
      // title: string;
      // vt: 0;
    };
  }>;
}

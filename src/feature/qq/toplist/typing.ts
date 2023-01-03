import { SongInfo } from "../song/typing";
export interface ToplistGroup {
  groupId: number;
  groupName: string;
  type: number;
  toplist: ToplistGeneral[];
}

export interface ToplistGeneral {
  topId: number; // 排行榜id
  topType: 0;
  updateType: 1;
  title: string; // 排行榜标题
  titleDetail: string; // 标题详情
  titleShare: string;
  intro: string; // 简介
  // cornerMark: number;
  period: string; // 排行榜更新时间 应该是与 updateTime 一致
  updateTime: string; // 排行榜更新时间
  listenNum: string; // 收听数
  totalNum: string; // 歌曲总数
  song: Array<{
    rank: number; // 排名
    rankType: number; // 排名type?
    rankValue: string; // 排名趋势值
    songId: number; // 歌曲id
    title: string; // 歌曲名
    singerName: string; // 歌手名
    songType: number; // 歌曲type
    cover: string; // 歌曲图片
  }>;
  headPicUrl: string;
  frontPicUrl: string;
  mbFrontPicUrl: string;
  mbHeadPicUrl: string;
  h5JumpUrl: string;
  updateTips: string; // 更新频率
  // bannerText: string;
  AdShareContent: string;
  mbFrontLogoUrl: string;
  mbHeadLogoUrl: string;
  topAlbumURL: string;
}
// export interface CommonRequest {
//   sign: string;
//   _: number;
// }
export interface ToplistAllResponse {
  code: number;
  req_0: {
    code: number;
    data: {
      group: ToplistGroup[];
    };
  };
}
export interface ToplistDetailResponse {
  code: number;
  req_1: {
    code: number;
    data: {
      data: {
        topId: number;
        topType: number;
        updateType: number;
        title: string;
        titleDetail: string;
        // titleShare: string;
        // titleSub: string;
        intro: string;
        // cornerMark: number;
        // period: string;
        updateTime: string;
        history: {
          year: [];
          subPeriod: [];
        };
        listenNum: number;
        totalNum: number;
        song: Array<{
          rank: number;
          // rankType: 1;
          // rankValue: "4";
          // recType: 0;
          songId: number;
          // vid: "";
          // albumMid: "0008IAML0V6eAM";
          title: string;
          singerName: string;
          // singerMid: "001Fgvod1Jyc0M";
          // songType: 0;
          // uuidCnt: 0;
          cover: string;
          // mvid: 0;
        }>;
      };
      songInfoList: Array<SongInfo>;
    };
  };
}
// export type toplistInfo = {};

import { SongInfo } from "../song/typing";

export interface Singer {
  area_id: number;
  singer_id: number;
  country_id: number;
  singer_name: string;
  country: number;
  other_name: string;
  singer_mid: string;
  spell: string;
  trend: number;
  singer_pmid: string;
  concernNum: number;
  singer_pic: string;
}
export interface SingerListResponse {
  req_0: {
    data: { area: number; sex: number; genre: number; singerlist: Singer[] };
  };
}

export interface Detail {
  basic_info: { name: string; singer_id: number; singer_mid: string };
  ex_info: {
    area: number;
    birthday: string;
    // blogFlag: 1;
    desc: string;
    // enter: 0;
    foreign_name: string;
  };
  pic: { pic: string };
  wiki: string;
}

export interface SingerDetailResponse {
  req_1: {
    code: number;
    data: { singer_list: Array<Detail> };
  };
  req_2: {
    code: number;
    data: {
      albumList: Array<{
        albumID: number;
        albumMid: string;
        albumName: string;
        albumTranName: string;
        // albumType: "Single";
        // pmid: "003kqAcc05j345_1";
        publishDate: string;
        singerName: string;
        // totalNum: 0;
      }>;
      total: number;
    };
  };
  req_3: {
    code: number;
    data: {
      songList: Array<{ songInfo: SongInfo }>;
      totalNum: number;
    };
  };
  req_4: {
    code: number;
    data: {
      map_singer_num: Record<
        string,
        {
          singer_follownum: number;
          user_fansnum: number;
          user_follownum: number;
        }
      >;
    };
  };
}

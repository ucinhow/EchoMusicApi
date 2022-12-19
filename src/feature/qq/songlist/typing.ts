import { SongInfo } from "../song/typing";

export interface Detail {
  dirinfo: {
    id: number;
    desc: string;
    picurl: string;
    title: string;
    songnum: number;
    listennum: number;
    ordernum: number; // collect number
    mtime: number; // timestamp seconds
    ctime: number; // timestamp seconds
    host_nick: string;
  };
  songlist: Array<SongInfo>;
}

export interface DetailResponse {
  code: number;
  req_1: {
    data: Detail;
  };
}

export interface Recommend {
  HasMore: boolean;
  List: Array<{
    Playlist: {
      basic: {
        play_cnt: number;
        title: string;
        modify_time: number;
        create_time: number;
        desc: string;
        cover: {
          default_url: string;
        };
        dirid: number;
      };
    };
  }>;
}

export interface RecommendResponse {
  code: number;
  req_1: {
    data: Recommend;
  };
}

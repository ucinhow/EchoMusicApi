import { SongInfo } from "../song/typing";

export interface SonglistDetail {
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

export interface SonglistDetailResponse {
  code: number;
  req_1: {
    data: SonglistDetail;
  };
}

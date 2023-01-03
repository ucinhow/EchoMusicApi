import { SongInfo } from "../song/typing";
interface AlbumInfo {
  code: number;
  data: {
    basicInfo: {
      albumID: number;
      albumMid: string;
      desc: string;
      albumName: string;
      publishDate: string;
      pmid: string;
    };
    company: {};
    singer: {
      singerList: Array<{
        mid: string;
        name: string;
        singerID: number;
        singerType: number;
        transName: string;
      }>;
    };
  };
}
interface AlbumSonglist {
  code: number;
  data: { songList: Array<{ songInfo: SongInfo }>; totalNum: number };
}

export interface DetailResponse {
  code: number;
  req_1: AlbumInfo;
  req_2: AlbumSonglist;
}

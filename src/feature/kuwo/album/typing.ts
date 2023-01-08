import { MusicItem } from "../song/typing";

interface detailData {
  playCnt: number;
  artist: string;
  releaseDate: string; // "2004-06-04";
  album: string;
  albumid: number;
  //   pay: 0;
  artistid: number;
  pic: string;
  //   isstar: 0;
  total: number;
  //   content_type: "0";
  albuminfo: string;
  lang: string;
  musicList: Array<MusicItem>;
}

export interface DetailResponse {
  data: detailData;
  msg: string;
}

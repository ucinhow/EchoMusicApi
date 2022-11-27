// import { DataType } from "./common";
export enum SearchType {
  songlist = 1,
  album = 2,
  song = 3,
  singer = 4,
  // lyric = 5,
}
interface Album {
  id: string;
  name: string;
  pic: string;
  singer: Array<{ id: string; name: string }>;
}
interface Mv {
  id: string;
  name: string;
  singer: string;
  vid: string;
}

interface Singer {
  id: string;
  name: string;
  pic: string;
  //   singer: string;
}
interface Song {
  id: string;
  name: string;
  singer: Array<{ id: string; name: string }>;
}
interface Songlist {
  id: string;
  name: string;
  pic: string;
}
export interface SearchResponse {
  album?: {
    itemList: Array<{
      id: string;
      name: string;
      pic: string;
      singer: string;
    }>;
    title: string;
  };
  mv?: {
    itemList: Array<Mv>;
    title: string;
  };
  singer?: {
    itemList: Array<{
      id: string;
      name: string;
      pic: string;
      //   singer: string;
    }>;
    title: string;
  };
  song?: {
    itemList: Array<{
      id: string;
      name: string;
      singer: string;
    }>;
    title: string;
  };
  songlist?: {
    itemList: Array<Songlist>;
    title: string;
  };
}
// export interface SearchApi {
//   (keyword: string): Promise<SearchResponse>;
// }
export type SearchTypeResponse =
  | {
      hasMore: boolean;
      data: Array<Song>;
      type: SearchType.song;
    }
  | {
      hasMore: boolean;
      data: Array<Album>;
      type: SearchType.album;
    }
  | {
      hasMore: boolean;
      data: Array<Singer>;
      type: SearchType.singer;
    }
  | {
      hasMore: boolean;
      data: Array<Songlist>;
      type: SearchType.songlist;
    };

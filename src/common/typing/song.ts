import { PlaySrcMeta } from "./common";

export interface Track {
  albumId: string;
  albumName: string;
  singerList: Array<{
    id: string;
    name: string;
  }>;
  //   can_download: ;
  //   genre: string;
  id: string;
  pic: string;
  lyric: [number, string][]; // base64 require decode
  lyricExist: boolean; // 1 for exist
  name: string;
  duration: number; // seconds
  publicTime: number;
  playable: boolean;
  playUrl: Array<string>;
}

export type SongItem = {
  name: string;
  singerName: Array<string>;
  albumName: string;
  duration: number; // seconds
} & PlaySrcMeta<{
  id: string;
  singerId: Array<string>;
  albumId: string;
  playable: boolean;
}>;

export interface SongDetail {
  id: string;
  name: string;
  picUrl: string;
  singer: Array<{ name: string; id: string }>;
  publicTime: number;
  duration: number;
  album: {
    name: string;
    id: string;
    // publicTime: number;
  };
}

export interface SongPlayUrl {
  url: string;
  // playable: string;
}

export interface SongLyric {
  lyricExist: boolean;
  lyric: [number, string][]; // [ms, 'lyric']
}
export interface SongUrlApi {
  (ids: string[]): Promise<SongPlayUrl>;
}

export interface SongLyricApi {
  (id: string): Promise<SongLyric>;
}

export interface SongDetailApi {
  (id: string): Promise<SongDetail>;
}

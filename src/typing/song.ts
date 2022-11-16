export interface Song {
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

export type SongApi = Song;

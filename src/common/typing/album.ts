import { SrcMeta } from "./common";
import { SongItem } from "./song";

export type AlbumItem = SrcMeta<{
  id: string;
  picUrl: string;
  singerId: Array<string>;
}> & {
  name: string;
  publicTime: number;
  singerName: Array<string>;
};

export interface AlbumDetail {
  id: string;
  name: string;
  picUrl: string;
  publicTime: number;
  desc: string;
  singer: Array<{ id: string; name: string }>;
  songlist: Array<SongItem>;
}

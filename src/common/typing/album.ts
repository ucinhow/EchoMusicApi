import { SrcMeta } from "./common";

export type AlbumItem = SrcMeta<{
  id: string;
  picUrl: string;
  singerId: Array<string>;
}> & {
  name: string;
  publicTime: number;
  singerName: Array<string>;
};

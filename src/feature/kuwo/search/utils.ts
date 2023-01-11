import { SearchAlbum, SearchSong, SearchSonglist } from "@/common/typing";
import {
  SearchAlbumResponse,
  SearchMusicResponse,
  SearchPlaylistResponse,
} from "./typing";
import { completeArtistId, serializeItemList } from "../song/utils";
import { parseTimestamp } from "@/common/utils";
export const serializeSearchSong = async (
  res: SearchMusicResponse,
  page: number,
  size: number
): Promise<SearchSong> => {
  const { data } = res;
  return {
    hasMore: (page - 1) * size + data.list.length < data.total,
    data: await serializeItemList(data.list),
    nextPage: page + 1,
  };
};

export const serializeSearchAlbum = async (
  res: SearchAlbumResponse,
  page: number,
  size: number
): Promise<SearchAlbum> => {
  const { albumList: list, total } = res.data;
  const data = await Promise.all(
    list.map(async (item) => {
      const [singerName, singerId] = await completeArtistId(
        item.artist,
        item.albumid
      );
      return {
        name: item.album,
        publicTime: parseTimestamp(item.releaseDate),
        singerName,
        kw: {
          id: item.albumid.toString(),
          picUrl: item.pic,
          singerId,
        },
      };
    })
  );
  return {
    hasMore: (page - 1) * size + list.length < total,
    data,
    nextPage: page + 1,
  };
};

export const serializeSearchPlaylist = (
  res: SearchPlaylistResponse,
  page: number,
  size: number
): SearchSonglist => {
  const { list, total } = res.data;
  return {
    hasMore: (page - 1) * size + list.length < total,
    data: list.map((item) => ({
      id: item.id,
      name: item.name,
      picUrl: item.img,
      playCount: parseInt(item.listencnt),
    })),
    nextPage: page + 1,
  };
};

// export const serializeSearchSinger = (res: SearchMusicResponse) => {};

import { createCommInstance, setInstanceToken } from "../common";
import {
  SearchAlbumResponse,
  SearchArtistResponse,
  SearchMusicResponse,
  SearchPlaylistResponse,
} from "./typing";
import {
  serializeSearchAlbum,
  serializeSearchPlaylist,
  serializeSearchSong,
} from "./utils";

// search song logic
const songInstance = createCommInstance();

await setInstanceToken(songInstance, "/search/list?key=hello");

export const querySearchSong = (key: string, page: number, size: number) =>
  songInstance.get<SearchMusicResponse>(
    "/api/www/search/searchMusicBykeyWord",
    {
      params: {
        key,
        pn: page,
        rn: size,
      },
      headers: {
        Referer: `http://www.kuwo.cn/search/list?key=${encodeURIComponent(
          key
        )}`,
      },
    }
  );

export const searchSong = (key: string, page: number, size: number) =>
  querySearchSong(key, page, size).then((res) =>
    serializeSearchSong(res.data, page, size)
  );

// search album logic
const albumInstance = createCommInstance();

await setInstanceToken(albumInstance, "/search/album?key=hello");

export const querySearchAlbum = (key: string, page: number, size: number) =>
  albumInstance.get<SearchAlbumResponse>(
    "/api/www/search/searchAlbumBykeyWord",
    {
      params: {
        key,
        pn: page,
        rn: size,
      },
      headers: {
        Referer: `http://www.kuwo.cn/search/album?key=${encodeURIComponent(
          key
        )}`,
      },
    }
  );

export const searchAlbum = (key: string, page: number, size: number) =>
  querySearchAlbum(key, page, size).then((res) =>
    serializeSearchAlbum(res.data, page, size)
  );

// search songlist logic

const songlistInstance = createCommInstance();

await setInstanceToken(songlistInstance, "/search/playlist?key=hello");

export const querySearchSonglist = (key: string, page: number, size: number) =>
  songlistInstance.get<SearchPlaylistResponse>(
    "/api/www/search/searchPlayListBykeyWord",
    {
      params: {
        key,
        pn: page,
        rn: size,
      },
      headers: {
        Referer: `http://www.kuwo.cn/search/playlist?key=${encodeURIComponent(
          key
        )}`,
      },
    }
  );

export const searchSonglist = (key: string, page: number, size: number) =>
  querySearchSonglist(key, page, size).then((res) =>
    serializeSearchPlaylist(res.data, page, size)
  );

const singerInstance = createCommInstance();

await setInstanceToken(singerInstance, "/search/singers?key=hello");

export const querySearchSinger = (key: string, page: number, size: number) =>
  singerInstance.get<SearchArtistResponse>(
    "/api/www/search/searchArtistBykeyWord",
    {
      params: {
        key,
        pn: page,
        rn: size,
      },
      headers: {
        Referer: `http://www.kuwo.cn/search/singers?key=${encodeURIComponent(
          key
        )}`,
      },
    }
  );

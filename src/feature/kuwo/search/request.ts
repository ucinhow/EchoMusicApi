import { get } from "../common";
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

export const querySearchSong = (key: string, page: number, size: number) =>
  get<SearchMusicResponse>("/api/www/search/searchMusicBykeyWord", {
    params: {
      key,
      pn: page,
      rn: size,
    },
  });

export const searchSong = (key: string, page: number, size: number) =>
  querySearchSong(key, page, size).then((res) =>
    serializeSearchSong(res.data, page, size)
  );

export const querySearchAlbum = (key: string, page: number, size: number) =>
  get<SearchAlbumResponse>("/api/www/search/searchAlbumBykeyWord", {
    params: {
      key,
      pn: page,
      rn: size,
    },
  });

export const searchAlbum = (key: string, page: number, size: number) =>
  querySearchAlbum(key, page, size).then((res) =>
    serializeSearchAlbum(res.data, page, size)
  );

export const querySearchSonglist = (key: string, page: number, size: number) =>
  get<SearchPlaylistResponse>("/api/www/search/searchPlayListBykeyWord", {
    params: {
      key,
      pn: page,
      rn: size,
    },
  });

export const searchSonglist = (key: string, page: number, size: number) =>
  querySearchSonglist(key, page, size).then((res) =>
    serializeSearchPlaylist(res.data, page, size)
  );

export const querySearchSinger = (key: string, page: number, size: number) =>
  get<SearchArtistResponse>("/api/www/search/searchArtistBykeyWord", {
    params: {
      key,
      pn: page,
      rn: size,
    },
  });

import {
  SearchResponse as RawSearchResponse,
  ItemType,
  SearchTypeResponse as RawSearchTypeResponse,
} from "./typing";
import { SearchType, SearchResponse, SearchTypeResponse } from "@/typing";
import { simplify } from "simplify-chinese";
import { convertImage } from "../common";
export function convertType(type: ItemType): SearchType;
export function convertType(type: SearchType): ItemType;

export function convertType(type: ItemType | SearchType) {
  switch (type) {
    case ItemType.album:
      return SearchType.album;
    case ItemType.songlist:
      return SearchType.songlist;
    case ItemType.album:
      return SearchType.song;
    case ItemType.singer:
      return SearchType.singer;
    case SearchType.album:
      return ItemType.album;
    case SearchType.singer:
      return ItemType.singer;
    case SearchType.song:
      return ItemType.song;
    case SearchType.songlist:
      return ItemType.songlist;
    default:
      throw "error 'type' value";
  }
}

export const serializeSearch = (data: RawSearchResponse): SearchResponse => {
  const sections = data.section_list;
  const res: SearchResponse = {};
  for (const s of sections) {
    for (const item of s.item_list) {
      switch (item.type) {
        case ItemType.songlist: {
          if (res.songlist === undefined) {
            res.songlist = {
              title: "歌单",
              itemList: [],
            };
          }
          res.songlist.itemList.push({
            id: item.editor_playlist.id,
            name: simplify(item.editor_playlist.name),
            pic: convertImage(item.editor_playlist.images),
          });
          break;
        }
        case ItemType.album: {
          if (res.album === undefined) {
            res.album = {
              title: "专辑",
              itemList: [],
            };
          }
          res.album.itemList.push({
            id: item.album.id,
            name: simplify(item.album.name),
            pic: convertImage(item.album.images),
            singer: simplify(
              item.album.artist_list.map((a) => a.name).join(" | ")
            ),
          });
          break;
        }
        case ItemType.song: {
          if (res.song === undefined) {
            res.song = {
              title: "歌曲",
              itemList: [],
            };
          }
          res.song.itemList.push(
            ...item.song.map((i) => ({
              id: i.song_info.id,
              name: simplify(i.song_info.name),
              singer: simplify(
                i.song_info.artist_list.map((a) => a.name).join(" | ")
              ),
            }))
          );
          break;
        }
        case ItemType.singer: {
          if (res.singer === undefined) {
            res.singer = {
              title: "歌手",
              itemList: [],
            };
          }
          res.singer.itemList.push({
            id: item.singer.id,
            name: simplify(item.singer.name),
            pic: convertImage(item.singer.images),
          });
          break;
        }
      }
    }
  }
  return res;
};

export const serializeSearchType = (
  data: RawSearchTypeResponse,
  type: SearchType
): SearchTypeResponse => {
  const res: SearchTypeResponse = {
    hasMore: data.has_more,
    data: [],
    type,
  };
  switch (res.type) {
    case SearchType.album: {
      if (data.albums) {
        res.data.push(
          ...data.albums.map((item) => ({
            id: item.id,
            name: simplify(item.name),
            pic: convertImage(item.images),
            singer: simplify(item.artist_list.map((a) => a.name).join(" | ")),
          }))
        );
      }
      break;
    }
    case SearchType.singer: {
      if (data.artists) {
        res.data.push(
          ...data.artists.map((item) => ({
            id: item.id,
            name: simplify(item.name),
            pic: convertImage(item.images),
          }))
        );
        break;
      }
    }
    case SearchType.song: {
      if (data.tracks) {
        data.tracks.forEach((item) => {
          res.data.push(
            ...item.map((track) => ({
              id: track.id,
              name: simplify(track.name),
              pic: convertImage(track.images),
              singer: simplify(
                track.artist_list.map((a) => a.name).join(" | ")
              ),
            }))
          );
        });
      }
      break;
    }
    case SearchType.songlist: {
      if (data.playlists) {
        res.data.push(
          ...data.playlists.map((item) => ({
            id: item.id,
            name: simplify(item.name),
            pic: convertImage(item.images),
          }))
        );
      }
      break;
    }
  }
  return res;
};

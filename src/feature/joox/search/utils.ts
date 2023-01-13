import { SearchResponse, ItemType, SearchSongResponse, Track } from "./typing";
import { PlaySource, SearchSong, SearchType, SongItem } from "@/common/typing";
import { simplify } from "simplify-chinese";

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
    // case ItemType.singer:
    //   return SearchType.singer;
    case SearchType.album:
      return ItemType.album;
    // case SearchType.singer:
    //   return ItemType.singer;
    case SearchType.song:
      return ItemType.song;
    case SearchType.songlist:
      return ItemType.songlist;
    default:
      throw "error 'type' value";
  }
}

export const serializeTrack = (data: Track): SongItem => ({
  name: simplify(data.name).replaceAll(" ", ""),
  singerName: data.artist_list.map((a) => simplify(a.name)),
  albumName: simplify(data.album_name),
  duration: data.play_duration,
  [PlaySource.joox]: {
    id: data.id,
    // picUrl: convertImage(data.images),
    albumId: data.album_id,
    singerId: data.artist_list.map((a) => a.id),
    playable: data.is_playable && data.vip_flag === 0,
  },
});

export const serializeSearchSong = (res: SearchSongResponse): SearchSong => {
  const ret: SearchSong = {
    hasMore: false,
    data: [],
    nextPage: 1,
  };
  if (res.tracks) {
    res.tracks.forEach((item) => {
      ret.data = item.map(serializeTrack);
    });
  }
  return ret;
};

export const pickSuggestSong = (data: SearchResponse): SongItem[] => {
  // const sections = data.section_list
  const ret: SongItem[] = [];
  for (const section of data.section_list) {
    for (const item of section.item_list) {
      if (item.type !== ItemType.song) break;
      ret.push(...item.song.map(({ song_info }) => serializeTrack(song_info)));
    }
  }
  return ret;
};

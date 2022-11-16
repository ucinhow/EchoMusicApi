import { SearchResponse as RawSearchResponse } from "./typing";
import { SearchResponse } from "@/typing";
export const serializeSearch = (data: RawSearchResponse): SearchResponse => {
  const temp = data.data;
  return {
    album: {
      title: temp.album.name,
      itemList: temp.album.itemlist,
      //   count: temp.album.count,
    },
    mv: {
      title: temp.mv.name,
      itemList: temp.mv.itemlist,
      //   count: temp.mv.count,
    },
    song: {
      title: temp.song.name,
      itemList: temp.song.itemlist,
      //   count: temp.song.count,
    },
    singer: {
      title: temp.singer.name,
      itemList: temp.singer.itemlist,
      //   count: temp.singer.count,
    },
  };
};

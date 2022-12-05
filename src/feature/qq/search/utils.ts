import {
  SearchResponse as RawSearchResponse,
  SearchTypeResponse as RawSearchTypeResponse,
} from "./typing";
import {
  SearchData,
  SearchType,
  SearchTypeData,
  // SearchTypeResponse,
} from "@/common/typing/search";
import { Source } from "@/common/typing/common";
import { SearchType as QQSearchType } from "./typing";
import { parseTimestamp } from "@/common/utils";
export const serializeSearch = (data: RawSearchResponse): SearchData => {
  const temp = data.data;
  return {
    album: temp.album.itemlist,
    // mv: {
    //   title: temp.mv.name,
    //   itemList: temp.mv.itemlist,
    //   //   count: temp.mv.count,
    // },
    song: temp.song.itemlist,
    singer: temp.singer.itemlist,
    src: Source.qq,
  };
};

export const createSearchTypeParams = (
  key: string,
  page = 1,
  type: SearchType = SearchType.song
) => ({
  req_1: {
    method: "DoSearchForQQMusicDesktop",
    module: "music.search.SearchCgiService",
    param: {
      num_per_page: 100,
      page_num: page,
      query: key,
      search_type: convertType(type),
    },
  },
});

export function convertType(type: QQSearchType): SearchType;
export function convertType(type: SearchType): QQSearchType;

export function convertType(type: QQSearchType | SearchType) {
  switch (type) {
    case QQSearchType.album:
      return SearchType.album;
    case QQSearchType.songlist:
      return SearchType.songlist;
    case QQSearchType.album:
      return SearchType.song;
    // case QQSearchType.singer:
    //   return SearchType.singer;
    case SearchType.album:
      return QQSearchType.album;
    // case SearchType.singer:
    //   return QQSearchType.singer;
    case SearchType.song:
      return QQSearchType.song;
    case SearchType.songlist:
      return QQSearchType.songlist;
    default:
      throw "error 'type' value";
  }
}

export const serializeSearchType = (
  data: RawSearchTypeResponse,
  type: SearchType,
  page: number
): SearchTypeData => {
  const temp = data.req_0.data;
  const res: SearchTypeData = {
    hasMore: temp.meta.curpage < temp.meta.nextpage,
    data: [],
    type,
    // src: Source.qq,
    // page,
    // sum: 0,
  };
  switch (res.type) {
    case SearchType.album: {
      if (temp.body.album) {
        res.data.push(
          ...temp.body.album.list.map((item) => ({
            name: item.albumName,
            singerName: item.singer_list.map((s) => s.name),
            publicTime: parseTimestamp(item.publicTime),
            [Source.qq]: {
              id: item.albumID.toString(),
              pic: item.albumPic,
              singerId: item.singer_list.map((s) => s.id.toString()),
            },
          }))
        );
        // res.sum = temp.meta.estimate_sum;
      }
      break;
    }
    // case SearchType.singer: {
    //   if (temp.body.singer) {
    //     res.data.push(
    //       ...temp.body.singer.list.map((item) => ({
    //         id: item.singerID.toString(),
    //         name: item.singerName,
    //         pic: item.singerPic,
    //       }))
    //     );
    //     res.sum = temp.meta.estimate_sum;
    //   }
    //   break;
    // }
    case SearchType.song: {
      if (temp.body.song) {
        res.data.push(
          ...temp.body.song.list.map((item) => ({
            name: item.name,
            singerName: item.singer.map((s) => s.name),
            albumName: item.album.name,
            duration: item.interval,
            [Source.qq]: {
              id: item.id.toString(),
              singerId: item.singer.map((s) => s.id.toString()),
              albumId: item.album.id.toString(),
            },
          }))
        );
        // res.sum = temp.meta.estimate_sum;
      }
      break;
    }
    case SearchType.songlist: {
      if (temp.body.songlist) {
        res.data.push(
          ...temp.body.songlist.list.map((item) => ({
            id: item.dissid,
            name: item.dissname,
            pic: item.imgurl,
            // src: Source.qq,
          }))
        );
      }
      // res.sum = temp.meta.estimate_sum;
      break;
    }
  }
  return res;
};

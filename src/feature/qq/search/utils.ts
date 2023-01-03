import {
  SearchAlbumResponse,
  SearchResponse,
  SearchSonglistResponse,
  SearchSongResponse,
  SearchTypeResponse as RawSearchTypeResponse,
} from "./typing";
import {
  SearchAlbum,
  SearchSong,
  SearchType,
  SearchTypeData,
  SuggestSearch,
  Source,
  SearchSonglist,
} from "@/common/typing";
import { SearchType as QQSearchType } from "./typing";
import { parseTimestamp } from "@/common/utils";
import { serializeSongItemList } from "../song/utils";
export const serializeSearch = (data: SearchResponse): SuggestSearch => {
  const temp = data.data;
  return {
    album: temp.album.itemlist.map((i) => ({
      name: i.name,
      singer: i.singer,
      qq: { picUrl: i.pic, id: i.mid },
    })),
    // mv: {
    //   title: temp.mv.name,
    //   itemList: temp.mv.itemlist,
    //   //   count: temp.mv.count,
    // },
    song: temp.song.itemlist.map((i) => ({
      name: i.name,
      singer: i.singer,
      qq: {
        id: i.mid,
      },
    })),
    singer: temp.singer.itemlist.map((i) => ({
      name: i.name,
      qq: { id: i.mid, picUrl: i.pic },
    })),
  };
};

// export function convertType(type: QQSearchType): SearchType;
// export function convertType(type: SearchType): QQSearchType;

// export function convertType(type: QQSearchType | SearchType) {
//   switch (type) {
//     case QQSearchType.album:
//       return SearchType.album;
//     case QQSearchType.songlist:
//       return SearchType.songlist;
//     case QQSearchType.album:
//       return SearchType.song;
//     // case QQSearchType.singer:
//     //   return SearchType.singer;
//     case SearchType.album:
//       return QQSearchType.album;
//     // case SearchType.singer:
//     //   return QQSearchType.singer;
//     case SearchType.song:
//       return QQSearchType.song;
//     case SearchType.songlist:
//       return QQSearchType.songlist;
//     default:
//       throw "error 'type' value";
//   }
// }

export const serializeSearchSong = (res: SearchSongResponse): SearchSong => {
  const { body, meta } = res.req_1.data;
  const ret: SearchSong = {
    hasMore: meta.curpage < meta.nextpage,
    data: [],
    nextPage: 1,
  };
  if (body.song) {
    ret.data = serializeSongItemList(body.song.list);
    ret.nextPage = meta.nextpage;
  }
  return ret;
};

export const serializeSearchAlbum = (res: SearchAlbumResponse): SearchAlbum => {
  const { body, meta } = res.req_1.data;
  const ret: SearchAlbum = {
    hasMore: meta.curpage < meta.nextpage,
    data: [],
    nextPage: 1,
  };
  if (body.album) {
    ret.data.push(
      ...body.album.list.map((item) => ({
        name: item.albumName,
        singerName: item.singer_list.map((s) => s.name.toString()),
        publicTime: parseTimestamp(item.publicTime),
        [Source.qq]: {
          id: item.albumID.toString(),
          picUrl: item.albumPic,
          singerId: item.singer_list.map((s) => s.id.toString()),
        },
      }))
    );
    ret.nextPage = meta.nextpage;
  }
  return ret;
};

export const serializeSearchSonglist = (
  res: SearchSonglistResponse
): SearchSonglist => {
  const { body, meta } = res.req_1.data;
  const ret: SearchSonglist = {
    hasMore: meta.curpage < meta.nextpage,
    data: [],
    nextPage: 1,
  };
  if (body.songlist) {
    ret.data.push(
      ...body.songlist.list.map((item) => ({
        id: item.dissid,
        name: item.dissname,
        picUrl: item.imgurl,
        playCount: item.listennum,
      }))
    );
    ret.nextPage = meta.nextpage;
  }
  return ret;
};

// const serializeSearchType = (
//   data: RawSearchTypeResponse,
//   type: SearchType
//   // page: number
// ): SearchTypeData => {
//   const temp = data.req_1.data;
//   const res: SearchTypeData = {
//     hasMore: temp.meta.curpage < temp.meta.nextpage,
//     data: [],
//     type,
//     // src: Source.qq,
//     // page,
//     // sum: 0,
//   };
//   switch (res.type) {
//     case SearchType.album: {
//       if (temp.body.album) {
//         res.data.push(
//           ...temp.body.album.list.map((item) => ({
//             name: item.albumName,
//             singerName: item.singer_list.map((s) => s.name.toString()),
//             publicTime: parseTimestamp(item.publicTime),
//             [Source.qq]: {
//               id: item.albumID.toString(),
//               picUrl: item.albumPic,
//               singerId: item.singer_list.map((s) => s.id.toString()),
//             },
//           }))
//         );
//         // res.sum = temp.meta.estimate_sum;
//       }
//       break;
//     }
//     // case SearchType.singer: {
//     //   if (temp.body.singer) {
//     //     res.data.push(
//     //       ...temp.body.singer.list.map((item) => ({
//     //         id: item.singerID.toString(),
//     //         name: item.singerName,
//     //         pic: item.singerPic,
//     //       }))
//     //     );
//     //     res.sum = temp.meta.estimate_sum;
//     //   }
//     //   break;
//     // }
//     case SearchType.song: {
//       if (temp.body.song) {
//         res.data = serializeSongItemList(temp.body.song.list);
//       }
//       break;
//     }
//     case SearchType.songlist: {
//       if (temp.body.songlist) {
//         res.data.push(
//           ...temp.body.songlist.list.map((item) => ({
//             id: item.dissid,
//             name: item.dissname,
//             picUrl: item.imgurl,
//             playCount: item.listennum,
//           }))
//         );
//       }
//       break;
//     }
//   }
//   return res;
// };

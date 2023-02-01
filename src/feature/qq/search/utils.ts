import {
  SearchAlbumResponse,
  SearchResponse,
  SearchSonglistResponse,
  SearchSongResponse,
} from "./typing";
import {
  SearchAlbum,
  SearchSong,
  SuggestSearch,
  Source,
  SearchSonglist,
} from "@/common/typing";
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

export const serializeSearchSong = (res: SearchSongResponse): SearchSong => {
  const { body, meta } = res.req_1.data;
  const ret: SearchSong = {
    hasMore: meta.curpage * meta.perpage < meta.sum,
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
    hasMore: meta.curpage * meta.perpage < meta.sum,
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
          id: item.albumMID,
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
    hasMore: meta.curpage * meta.perpage < meta.sum,
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
        src: Source.qq,
      }))
    );
    ret.nextPage = meta.nextpage;
  }
  return ret;
};

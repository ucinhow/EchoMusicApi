import {
  Song,
  SearchData,
  SearchResponse,
  AlbumItem,
  SingerItem,
  SongItem,
  SonglistItem,
  SearchTypeData,
  SearchType,
  Album,
  Songlist,
  Singer,
} from "@/common/typing/search";
import md5 from "md5";
import { Source } from "../typing/common";

export const mergeSearchItem = (datas: SearchData[]): SearchResponse => {
  const albumMap = new Map<string, AlbumItem>();
  const singerMap = new Map<string, SingerItem>();
  const songMap = new Map<string, SongItem>();
  // const songlistMap = new Map<string, SonglistItem>();
  const songlists: SonglistItem[] = [];
  let i = 0;
  while (true) {
    let done = true;
    datas.forEach((data) => {
      if (data.album && i < data.album.length) {
        done = false;
        const album = data.album[i];
        const key = md5(album.name + album.singer);

        if (albumMap.has(key)) {
          const item = albumMap.get(key)!;
          albumMap.set(key, {
            ...item,
            [data.src]: { id: album.id, pic: album.pic },
          });
        } else {
          albumMap.set(key, {
            name: album.name,
            singer: album.singer,
            [data.src]: { id: album.id, pic: album.pic },
          });
        }
      }
      if (data.song && i < data.song.length) {
        done = false;
        const song = data.song[i];
        const key = md5(song.name + song.singer);
        if (songMap.has(key)) {
          const item = songMap.get(key)!;
          songMap.set(key, {
            ...item,
            [data.src]: { id: song.id },
          });
        } else {
          songMap.set(key, {
            name: song.name,
            singer: song.singer,
            [data.src]: { id: song.id },
          });
        }
      }
      if (data.singer && i < data.singer.length) {
        done = false;
        const singer = data.singer[i];
        const key = singer.name;
        if (singerMap.has(key)) {
          const item = songMap.get(key)!;
          singerMap.set(key, {
            ...item,
            [data.src]: { id: singer.id, pic: singer.pic },
          });
        } else {
          singerMap.set(key, {
            name: singer.name,
            [data.src]: { id: singer.id, pic: singer.pic },
          });
        }
      }
      if (data.songlist && i < data.songlist.length) {
        done = false;
        songlists.push(data.songlist[i]);
      }
    });
    if (done) break;
    ++i;
  }
  return {
    album: Array.from(albumMap.values()),
    singer: Array.from(singerMap.values()),
    song: Array.from(songMap.values()),
    songlist: songlists,
  };
};

// const convertSong = (song: , src: Source) => {
//   return {
//     name: song.name,
//     albumName: song.albumName,
//     duration: song.duration,
//     singerName: song.singer.map((s) => s.name),
//   };
// };

const mergeSearchSong = (datas: SearchTypeData[]) => {
  let i = 0;
  const map = new Map<string, Song>();
  while (true) {
    let done = true;
    for (const data of datas) {
      if (data.type !== SearchType.song || i >= data.data.length) continue;
      done = false;
      const item = data.data[i];
      const key = md5(
        item.name + item.duration + item.albumName + item.singerName.join("|")
      );
      const temp = map.has(key) ? map.get(key)! : {};
      map.set(key, {
        ...temp,
        ...item,
      });
    }
    if (done) break;
    ++i;
  }
  return {
    hasMore: datas.findIndex((d) => d.hasMore) !== -1,
    data: Array.from(map.values()),
    type: SearchType.song,
  };
};

const mergeSearchAlbum = (datas: SearchTypeData[]) => {
  let i = 0;
  const map = new Map<string, Album>();
  while (true) {
    let done = true;
    for (const data of datas) {
      if (data.type !== SearchType.album || i >= data.data.length) continue;
      done = false;
      const item = data.data[i];
      const key = md5(item.name + item.publicTime + item.singerName.join("|"));
      const temp = map.has(key) ? map.get(key)! : {};
      map.set(key, {
        ...temp,
        ...item,
      });
    }
    if (done) break;
    ++i;
  }
  return {
    hasMore: datas.findIndex((d) => d.hasMore) !== -1,
    data: Array.from(map.values()),
    type: SearchType.album,
  };
};

// const mergeSearchSinger = (datas: SearchTypeData[]) => {
//   let i = 0;
//   const map = new Map<string, Singer>();
//   // const low;
//   while (true) {
//     let done = true;
//     for (const data of datas) {
//       if (data.type !== SearchType.singer || i >= data.data.length) continue;
//       done = false;
//       const item = data.data[i];
//       const key = item.name;
//       const temp = map.has(key) ? map.get(key)! : {};
//       // if
//       // if (data.src in temp) continue;
//       map.set(key, {
//         ...temp,
//         ...item,
//       });
//     }
//     if (done) break;
//     ++i;
//   }
//   return {
//     hasMore: datas.findIndex((d) => d.hasMore) !== -1,
//     data: Array.from(map.values()),
//     type: SearchType.singer,
//   };
// };

const mergeSearchSonglist = (datas: SearchTypeData[]) => {
  const list: Songlist[] = [];
  let i = 0;
  while (true) {
    let done = true;
    for (const data of datas) {
      if (data.type !== SearchType.songlist || i >= data.data.length) continue;
      done = false;
      const item = data.data[i];
      list.push(item);
    }
    if (done) break;
    ++i;
  }
  return {
    hasMore: datas.findIndex((d) => d.hasMore) !== -1,
    data: list,
    type: SearchType.songlist,
  };
};

export const mergeMultiSrc = (
  datas: SearchTypeData[],
  type: SearchType = SearchType.song
) => {
  switch (type) {
    case SearchType.song:
      return mergeSearchSong(datas);
    case SearchType.album:
      return mergeSearchAlbum(datas);
    // case SearchType.singer:
    //   return mergeSearchSinger(datas);
    case SearchType.songlist:
      return mergeSearchSonglist(datas);
    default: {
      return {
        hasMore: false,
        data: [],
        type: SearchType.song,
      };
    }
  }
};

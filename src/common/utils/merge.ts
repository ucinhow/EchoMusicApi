import {
  SuggestSearch,
  SSData,
  SearchType,
  SearchTypeData,
} from "@/common/typing/search";
import md5 from "md5";
import { AlbumItem } from "../typing/album";
import { SongItem } from "../typing/song";
import { SonglistItem } from "../typing/songlist";

/**
 * @description: function to merge suggest search data items from multi source.
 * @param {SuggestSearch} datas
 * @return {SuggestSearch} SuggestSearch data
 */
export const mergeSSItem = (datas: SuggestSearch[]): SuggestSearch => {
  const albumMap = new Map<string, SSData["album"]>();
  const singerMap = new Map<string, SSData["singer"]>();
  const songMap = new Map<string, SSData["song"]>();
  const songlists: SSData["songlist"][] = [];
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
            ...album,
          });
        } else {
          albumMap.set(key, album);
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
            ...song,
          });
        } else {
          songMap.set(key, song);
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
            ...singer,
          });
        } else {
          singerMap.set(key, singer);
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

// todo: need to add up the logic of cache data.
export const mergeSongItem = (datas: SongItem[][]) => {
  let i = 0;
  const map = new Map<string, SongItem>();
  while (true) {
    let done = true;
    for (const data of datas) {
      // if (data.type !== SearchType.song || i >= data.data.length) continue;
      done = false;
      const item = data[i];
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
  return Array.from(map.values());
};
// const mergeSearchSong = (datas: SearchTypeData[]) => {

//   return {
//     hasMore: datas.findIndex((d) => d.hasMore) !== -1,
//     data: Array.from(map.values()),
//     type: SearchType.song,
//   };
// };
export const mergeAlbumItem = (datas: AlbumItem[][]) => {
  let i = 0;
  const map = new Map<string, AlbumItem>();
  while (true) {
    let done = true;
    for (const data of datas) {
      done = false;
      const item = data[i];
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
  return Array.from(map.values());
};
// const mergeSearchAlbum = (datas: SearchTypeData[]) => {
//   let i = 0;
//   const map = new Map<string, Album>();
//   while (true) {
//     let done = true;
//     for (const data of datas) {
//       if (data.type !== SearchType.album || i >= data.data.length) continue;
//       done = false;
//       const item = data.data[i];
//       const key = md5(item.name + item.publicTime + item.singerName.join("|"));
//       const temp = map.has(key) ? map.get(key)! : {};
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
//     type: SearchType.album,
//   };
// };

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

export const mergeSonglistItem = (datas: SonglistItem[][]) => {
  const list: SonglistItem[] = [];
  let i = 0;
  while (true) {
    let done = true;
    for (const data of datas) {
      // if (data.type !== SearchType.songlist || i >= data.data.length) continue;
      done = false;
      const item = data[i];
      list.push(item);
    }
    if (done) break;
    ++i;
  }
  return list;
  // return {
  //   hasMore: datas.findIndex((d) => d.hasMore) !== -1,
  //   data: list,
  //   type: SearchType.songlist,
  // };
};

export const mergeTypeItem = (datas: SearchTypeData[], type: SearchType) => {
  const temp = datas.map((d) => d.data);
  const hasMore = ~datas.findIndex(({ hasMore }) => hasMore);
  switch (type) {
    case SearchType.song:
      return {
        hasMore,
        data: mergeSongItem(temp as SongItem[][]),
      };
    case SearchType.album:
      return {
        hasMore,
        data: mergeAlbumItem(temp as AlbumItem[][]),
      };
    // case SearchType.singer:
    //   return mergeSearchSinger(datas);
    case SearchType.songlist:
      return {
        hasMore,
        data: mergeSonglistItem(temp as SonglistItem[][]),
      };
    default: {
      return {
        hasMore: hasMore,
        data: [],
      };
    }
  }
};

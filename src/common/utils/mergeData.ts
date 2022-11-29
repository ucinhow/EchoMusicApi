import {
  Song,
  SearchData,
  SearchResponse,
  AlbumItem,
  SingerItem,
  SongItem,
  SonglistItem,
} from "@/common/typing";
import md5 from "md5";

const hashSong = (song: Song) => {
  return md5(song.name + song.albumName + song.publicTime + song.duration);
};
export const mergeSong = (songs: Song[][]) => {
  const map = new Map<string, Song>();
  let i = 0;
  while (true) {
    let done = true;
    songs.forEach((list) => {
      if (i < list.length) {
        done = false;
        const key = hashSong(list[i]);
        if (!map.has(key)) map.set(key, list[i]);
        else {
          const item = map.get(key);
          // todo: merge song object
          item?.playUrl.push(...list[i].playUrl);
        }
      }
    });
    if (done) break;
    ++i;
  }
  return Array.from(map.values());
};

// const hashSearchAlbum = ()
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

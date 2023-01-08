import { MusicItem } from "../song/typing";

interface ArtistItem {
  country: string;
  pic: string;
  musicNum: number;
  pic120: string;
  // isStar: 0;
  // content_type: "0";
  name: string;
  pic70: string;
  id: number;
  pic300: string;
}

interface SearchMusicData {
  total: number;
  list: Array<MusicItem>;
}

interface SearchArtistData {
  total: string;
  pn: number;
  rn: number;
  list: Array<ArtistItem>;
}

interface SearchAlbumData {
  total: number;
  albumList: Array<{
    // content_type: "0";
    albuminfo: string;
    artist: string;
    releaseDate: string; // "2022-07-15";
    album: string;
    albumid: number;
    artistid: number;
    pic: string;
    // isstar: 0;
    lang: string;
  }>;
}

interface SearchPlaylistData {
  total: number;
  list: Array<{
    img: string;
    total: string;
    uname: string;
    name: string;
    listencnt: string;
    id: string;
  }>;
}

export interface SearchMusicResponse {
  data: SearchMusicData;
  msg: string; // 'success'
}

export interface SearchArtistResponse {
  data: SearchArtistData;
  msg: string; // 'success'
}

export interface SearchAlbumResponse {
  data: SearchAlbumData;
  msg: string;
}

export interface SearchPlaylistResponse {
  data: SearchPlaylistData;
  msg: string;
}

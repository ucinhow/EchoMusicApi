import { Image } from "../common";
export interface TrackResponse {
  album_id: string;
  album_name: string;
  artist_list: Array<{
    id: string;
    name: string;
  }>;
  // can_download: false;
  genre: string;
  //   has_hifi: 1;
  //   has_hq: 0;
  id: string;
  images: Array<Image>;
  //   isrc: "TheGjP4cnz0LTfb1lDIeig==";
  //   label: "JVR";
  //   language: "Mandarin";
  lrc_content: string; // base64 require decode
  lrc_exist: number; // 1 for exist
  name: string;
  play_duration: number; // seconds
  public_time: string;
  //   qrc_content: string;
  //   qrc_exist: 1;
  //   release_time: 2003;
  //   songmid: "Z6F804B9BC9ED1";
  //   source_name: "SONY_DDEX";
  //   supplier: "Sony Music Entertainment";
  //   track_free_action_control: 17;
  //   track_label_flag: 1;
  //   track_vip_action_control: 0;
  vip_flag: number; // 0;
  is_playable: boolean;
  error: string;
  play_url_list: Array<string>;
}

// interface TrackItem {
//   album_id: string;
//   album_name: string;
//   artist_list: Array<{
//     id: string;
//     name: string;
//   }>;
//   // genre: "Pop";
//   // has_hifi: number // 1;
//   // has_hq: 0;
//   id: string;
//   images: Array<Image>;
//   // isrc: "eqc2HYVs6TI1AwfCpN_2pA==";
//   // label: "";
//   //   language: "Mandarin";
//   lrc_exist: number; // 1
//   name: string;
//   play_duration: number; // seconds
//   // qrc_exist: 1;
//   // source_name: "";
//   // supplier: "TME";
//   // track_free_action_control: 41;
//   // track_label_flag: 0;
//   // track_vip_action_control: 0;
//   vip_flag: number; // 0;
//   is_playable: boolean;
// }

// export interface TrackResponse {}

export interface SongInfoResponse {
  album_url: string;
  code: 0;
  country: "id";
  encodeSongId: string;
  // express_domain: "https://stream.music.joox.com/";
  // flag: 1;
  // gososo: 0;
  has_hifi: boolean;
  has_hq: boolean;
  // has_preview: 0;
  imgSrc: string;
  // kbps_map: '{"128":4422624,"192":6660113,"24":854496,"320":11056263,"48":1674206,"96":3351801,"ape":0,"flac":35264089}\n';
  ktrack_id: 1557358;
  m4aUrl: string;
  malbum: string; // "交換餘生";
  malbumid: 401768610;
  malbummid: "";
  minterval: number; // 276;
  mmid: "00072QXC3DVN45";
  mp3Url: string;
  // msg: "";
  msinger: string; // "林俊傑";
  msingerid: number; // 4286;
  msingermid: "https://joox-cms-image-1251316161.file.myqcloud.com/2021/09/28/c9afe8a9-f7d4-465d-9f1d-f0eb795d6468.jpg/1000";
  msize: 11056064;
  msong: string; // "交換餘生";
  public_time: string; // "2020-09-16";
  // r192Url: "https://id.stream.music.joox.com/C600Z684339D43E379.m4a?vkey=92E052E50F42DBE3AB63D3EC1C8E117BC5A11FA931C3CF2E4592A508FFF19BF9EE5304976C5C0796AF508599878AF0B93CF7AB07326AE438&amp;hdnts=exp=1675184179~acl=/*~hmac=8a7be28a8ab24b655b4e95f9908ab4666a78d612872450ec9331dde9c33a94f1&fromtag=8&guid=JOOX@WEB_OPENUDID";
  // r320Url: "https://id.stream.music.joox.com/M800Z684339D43E379.mp3?vkey=95F74A9CB2CBE9CF08D5F8C787D854768C7A88778E28E110D465971B78482A731F73222243DCF6A7F738FCF6FD001CCA93E7DAF6FE8AABA2&amp;hdnts=exp=1675184179~acl=/*~hmac=8a7be28a8ab24b655b4e95f9908ab4666a78d612872450ec9331dde9c33a94f1&guid=JOOX@WEB_OPENUDID&uin=0&fromtag=8";
  singer_list: [
    {
      id: number; // 4286;
      name: string; // "5p6X5L+K5YKR";
    }
  ];
  // size128: 4422624;
  // size320: 11056263;
  // songInfoMid: "00072QXC3DVN45";
  // songmid: "Z684339D43E379";
  // source_id: 17;
  // subscript: [
  //   {
  //     color: "E6FF9B01";
  //     title: "VklQ";
  //   }
  // ];
  // track_label_flag: 3;
  // web_fully_play: 0;
}

export interface LyricResponse {
  code: number; // 0;
  lyric: string; // base64
}

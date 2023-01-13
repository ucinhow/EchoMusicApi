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

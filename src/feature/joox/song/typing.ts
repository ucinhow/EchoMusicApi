import { Image } from "../common";
export interface Song {
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
  //   vip_flag: 0;
  is_playable: boolean;
  //   error: "";
  play_url_list: Array<string>;
}

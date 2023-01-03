export interface SongInfo {
  id: number;
  type: number;
  mid: string;
  name: string;
  title: string;
  subtitle: string;
  interval: number;
  time_public: string;
  grp: Array<SongInfo>;
  pay: {
    // pay_down: number; // 1
    // pay_month: number; // 1
    pay_play: number; // 1;
    pay_status: number; // 0;
    // price_album: 0;
    // price_track: 200;
    time_free: number; // 0
  };
  singer: [
    {
      id: number;
      // mid: "003u5H9x1vACGo";
      name: string;
      title: string;
      type: number;
      uin: number;
      // pmid: "";
    }
  ];
  album: {
    id: number;
    mid: string;
    name: string;
    title: string;
    subtitle: string;
    time_public: string;
    pmid: string;
  };
  mv: {
    id: number;
    vid: string;
    name: string;
    title: string;
    // vt: 0;
  };
}

interface SongUrlData {
  midurlinfo: Array<{
    songmid: string;
    filename: string;
    purl: string;
    // errtype: "";
    // p2pfromtag: 0;
    // qmdlfromtag: 0;
    // common_downfromtag: 0;
    // vip_downfromtag: 0;
    // pdl: 0;
    // premain: 0;
    // hisdown: 0;
    // hisbuy: 0;
    // uiAlert: 0;
    // isbuy: 0;
    // pneedbuy: 0;
    // pneed: 0;
    // isonly: 0;
    // onecan: 0;
    // result: 0;
    // tips: "";
    // opi48kurl: "";
    // opi96kurl: "";
    // opi192kurl: "";
    // opiflackurl: "";
    // opi128kurl: "";
    // opi192koggurl: "";
    // wififromtag: "";
    // flowfromtag: "";
    // wifiurl: "C400003IubDD2DZgRs.m4a?guid=0&vkey=97E0E110194138C15C89A920ABDD57CDB48EAC71A831306CC09B06AB4398BBEA71089D194DCF121B12983D5BF61CEFB6EAEA8BFA8BC54E75&uin=&fromtag=196032";
    // flowurl: "C400003IubDD2DZgRs.m4a?guid=0&vkey=97E0E110194138C15C89A920ABDD57CDB48EAC71A831306CC09B06AB4398BBEA71089D194DCF121B12983D5BF61CEFB6EAEA8BFA8BC54E75&uin=&fromtag=196032";
    // vkey: "97E0E110194138C15C89A920ABDD57CDB48EAC71A831306CC09B06AB4398BBEA71089D194DCF121B12983D5BF61CEFB6EAEA8BFA8BC54E75";
    // opi30surl: "";
    // ekey: "";
    // auth_switch: 16889603;
    // subcode: 0;
    // opi96koggurl: "";
    // auth_switch2: 0;
  }>;
}

interface SongDetail {
  track_info: SongInfo;
}

export interface SongUrlResponse {
  req_1: {
    code: number;
    data: SongUrlData;
  };
}

export interface SongDetailResponse {
  req_1: {
    code: number;
    data: SongDetail;
    info: {
      intro: {
        content: Array<{
          // author: "";
          // id: 0;
          // is_parent: 0;
          // jumpurl: "";
          // mid: "";
          // ori_picurl: "";
          // picurl: "";
          // read_cnt: 0;
          // show_type: 0;
          // type: 0;
          value: string;
        }>;
      };
    };
  };
}

export interface SongLyricResponse {
  lyric: string;
  trans: string;
}

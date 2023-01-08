export interface MusicItem {
  musicrid: "MUSIC_247519552";
  // barrage: "0";
  // ad_type: "";
  artist: string;
  // mvpayinfo: {
  //   play: 0;
  //   vid: 0;
  //   down: 0;
  // };
  pic: string;
  // isstar: 0;
  rid: number;
  duration: number;
  // score100: "95";
  // ad_subtype: "0";
  // content_type: "0";
  // track: 1;
  // hasLossless: true;
  // hasmv: 0;
  releaseDate: string;
  album: string;
  albumid: number;
  // pay: "16515324";
  artistid: number;
  albumpic: string;
  // originalsongtype: 1;
  songTimeMinutes: string; // "02:35";
  isListenFee: boolean;
  pic120: string;
  name: string;
  // online: 1;
  // payInfo: {
  //   play: "1100";
  //   nplay: "001111111";
  //   overseas_nplay: "11111";
  //   local_encrypt: "1";
  //   limitfree: 0;
  //   refrain_start: 41000;
  //   feeType: {
  //     vip: "1";
  //   };
  //   down: "1111";
  //   ndown: "111111111";
  //   download: "1111";
  //   cannotDownload: 0;
  //   overseas_ndown: "11111";
  //   refrain_end: 65000;
  //   cannotOnlinePlay: 0;
  // };
  // tme_musician_adtype: "0";
}

export interface LyricResponse {
  data: {
    lrclist: Array<{
      lineLyric: string;
      time: string; // 215.06
    }>;
    simpl: {};
  };
  msg: string; // 成功
}

export interface DetailResponse {
  data: {
    // musicrid: "MUSIC_51648461";
    // barrage: "0";
    // ad_type: "";
    artist: string;
    // mvpayinfo: {
    //   play: 0;
    //   vid: 5871965;
    //   down: 0;
    // };
    pic: string;
    rid: number;
    duration: number;
    // mvPlayCnt: 261942;
    track: number; // 1;
    hasLossless: boolean;
    hasmv: number; // 1;
    releaseDate: string; // "2018-08-16";
    album: string;
    albumid: number;
    artistid: number;
    albumpic: string;
    originalsongtype: 1;
    songTimeMinutes: string; // "03:49";
    // isListenFee: false;
    // mvUpPcStr: "kuwo://play/?play=MQ==&num=MQ==&musicrid0=TVVTSUNfNTE2NDg0NjE=&name0=tbnK/Q==&artist0=Ry5FLk0utcvXz8bl&album0=we3Su7j2za+7sA==&artistid0=NTM3MQ==&albumid0=Njc1NTA5MQ==&playsource=d2ViwK3G8L/Nu6e2yy0+MjAxNrDmtaXH+tKz&media=bXY=&mvid0=NTg3MTk2NQ==&mvinfo_play0=MA==&mvinfo_download0=MA==";
    // pic120: "http://img4.kuwo.cn/star/albumcover/120/34/55/320536007.jpg";
    albuminfo: string;
    name: string;
    // online: 1;
  };
  msg: string;
}

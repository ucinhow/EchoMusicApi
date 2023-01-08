import { MusicItem } from "../song/typing";

export interface DetailResponse {
  data: {
    img: string;
    uPic: string;
    // uname: string;
    // img700: "https://img1.kuwo.cn/star/userpl2015/52/60/1667186936825_421780452_700.jpg";
    img300: string;
    userName: string;
    img500: string;
    // isOfficial: 1;
    total: number;
    name: string;
    listencnt: number;
    id: number;
    // tag: "电子,欧美,兴奋";
    // desc: "";
    info: string;
    musicList: Array<MusicItem>;
  };
  msg: string;
}

export interface CategoryResponse {
  data: Array<{
    data: Array<{
      //   digest: "10000";
      //   extend: "|HOT";
      id: string; // "2189";
      //   img: "https://img4.kuwo.cn/star/upload/3/3/1536566652003_.jpg";
      //   isnew: "0";
      name: string;
    }>;
    id: string; // '5'
    img: string;
    // img1: "https://kwimg2.kuwo.cn/star/upload/46/19/1548987670837_.png";
    // mdigest: "5";
    name: string;
    type: string; // "list";
  }>;
  msg: string;
}

export interface ListResponse {
  data: {
    pn: number;
    rn: number;
    total: number;
    data: Array<{
      //   digest: string; // "8";
      //   favorcnt: "54";
      id: string; //"3425247834";
      img: string;
      listencnt: string; // "11821";
      name: string;
      total: string; // "65";
      uid: string; // "572606499";
      uname: string;
    }>;
  };
  msg: string;
}

export interface RecommendResponse {
  data: {
    list: Array<{
      id: number;
      img: string;
      //   img300: "https://img1.kuwo.cn/star/userpl2015/10/13/1670411114862_132026710b.jpg";
      //   img500: "https://img1.kuwo.cn/star/userpl2015/10/13/1670411114862_132026710_500.jpg";
      //   img700: "https://img1.kuwo.cn/star/userpl2015/10/13/1670411114862_132026710_700.jpg";
      info: string;
      listencnt: number;
      //   musicList: [];
      name: string;
      total: number;
      //   uname: "酷小编";
      userName: string;
    }>;
  };
  msg: string;
}

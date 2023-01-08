export interface DetailResponse {
  data: {
    birthday: string; // "1979-01-18";
    country: string;
    artistFans: number;
    albumNum: number;
    gener: string;
    weight: string;
    language: string;
    mvNum: number;
    pic: string;
    // upPcUrl: "kuwo://Jump?param=ch%3A10002%3Bname%3Aartist%3Burl%3A%24%7Bnetsong%7Dcontent_artist.html%3Fsourceid%3D336%26name%3D%E5%91%A8%E6%9D%B0%E4%BC%A6%26playall%3Dtrue%26channel%3Dclassify&channel=classify";
    musicNum: number;
    // pic120: "https://star.kuwo.cn/star/starheads/120/8/10/2150960774.jpg";
    // isStar: 0;
    birthplace: string;
    constellation: string; // "魔羯座";
    // content_type: "0";
    aartist: string; // "Jay&nbsp;Chou";
    name: string;
    // pic70: "https://star.kuwo.cn/star/starheads/70/8/10/2150960774.jpg";
    id: number;
    tall: string; // "173cm";
    pic300: string;
    info: string;
  };
  msg: string;
}

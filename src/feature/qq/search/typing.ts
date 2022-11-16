export interface SearchResponse {
  data: {
    album: {
      count: number;
      itemlist: Array<{
        // docid: "2418779";
        id: string;
        // mid: "000lrXyA0MlEEo";
        name: string;
        pic: string;
        singer: string;
      }>;
      name: string;
      order: number;
      // type: 3;
    };
    mv: {
      count: number;
      itemlist: Array<{
        // docid: "1450750";
        id: string;
        // mid: "003nnZ9H0ScPfp";
        name: string;
        singer: string;
        vid: string;
      }>;
      name: string;
      order: number;
      // type: 4;
    };
    singer: {
      count: number;
      itemlist: Array<{
        // docid: "1399808";
        id: string;
        // mid: "003RGAyU46oc94";
        name: string;
        pic: string;
        singer: string;
      }>;
      name: string;
      order: number;
      // type: 2;
    };
    song: {
      count: number;
      itemlist: Array<{
        // docid: "205357640";
        id: string;
        // mid: "004Uln1G2Aunqw";
        name: string;
        singer: string;
      }>;
      name: string;
      order: number;
      // type: 1;
    };
  };
}

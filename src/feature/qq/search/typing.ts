import { SongInfo } from "../song/typing";

export interface SearchResponse {
  code: number;
  data: {
    album: {
      count: number;
      itemlist: Array<{
        // docid: "2418779";
        id: string;
        mid: string;
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
        mid: string;
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
        mid: string;
        name: string;
        singer: string;
      }>;
      name: string;
      order: number;
      // type: 1;
    };
  };
}
// export interface SearchTypeResponse {
//   code: number;
//   req_1: {
//     code: number;
//     data: {
//       body: {
//         album: {
//           list: Array<{
//             albumID: number;
//             albumMID: string;
//             albumName: string;
//             // albumName_hilight: "<em>交换余生</em>";
//             albumPic: string;
//             // catch_song: "";
//             docid: string; //  "12075792732946847581";
//             publicTime: string;
//             singerID: number;
//             // singerMID: "001BLpXF2DyJe2";
//             singerName: string;
//             // singerName_hilight: "林俊杰";
//             // singerTransName: "";
//             // singerTransName_hilight: "";
//             singer_list: Array<{
//               id: number;
//               // mid: "001BLpXF2DyJe2";
//               name: string;
//               // pmid: "";
//               // title: "林俊杰";
//               // type: 0;
//               // uin: 0;
//             }>;
//             song_count: number;
//             // type: 0;
//           }>;
//         };
//         // gedantip: { tab: 0; tip: "" };
//         // mv: { list: [] };
//         // qc: [];
//         singer: {
//           list: Array<{
//             albumNum: number;
//             // concern_status: 0;
//             // docid: "2037894211187760453";
//             mvNum: number;
//             singerID: number;
//             // singerMID: "001BLpXF2DyJe2";
//             singerName: string;
//             // singerName_hilight: "<em>林俊杰</em>";
//             singerPic: string;
//             songNum: number;
//           }>;
//         };
//         song: {
//           list: Array<SongInfo>;
//         };
//         songlist: {
//           list: Array<{
//             // copyrightnum: 0;
//             createtime: string; // "2021-01-18"
//             // creator: [Object];
//             // diss_status: 400;
//             dissid: string;
//             dissname: string;
//             docid: string;
//             imgurl: string;
//             introduction: string;
//             listennum: number;
//             modifytime: string;
//             song_count: number;
//           }>;
//         };
//       };
//       meta: {
//         // cid: "";
//         curpage: number;
//         // dir: "L";
//         // display_order: [];
//         // ein: 19;
//         estimate_sum: number;
//         // expid: "1488001,1745002,1873002,2058002,2112002,2191004,2248005";
//         // is_filter: 0;
//         // next_page_start: {};
//         nextpage: number;
//         perpage: number;
//         query: string;
//         // result_trustworthy: 1;
//         // ret: 0;
//         // safetyType: 0;
//         // safetyUrl: "";
//         // searchid: "";
//         // sid: "";
//         // sin: 0;
//         // sum: 400;
//         // tab_list: [100, 0, 4, 3, 2, 1, 15, 101, 7, 8];
//         // uid: "";
//         // v: 0;
//       };
//     };
//   };
// }

export interface SearchSongResponse {
  code: number;
  req_1: {
    code: number;
    data: {
      body: {
        song: {
          list: Array<SongInfo>;
        };
      };
      meta: {
        curpage: number;
        estimate_sum: number;
        nextpage: number;
        perpage: number;
        query: string;
        sum: number;
      };
    };
  };
}

export interface SearchAlbumResponse {
  code: number;
  req_1: {
    code: number;
    data: {
      body: {
        album: {
          list: Array<{
            albumID: number;
            albumMID: string;
            albumName: string;
            // albumName_hilight: "<em>交换余生</em>";
            albumPic: string;
            // catch_song: "";
            docid: string; //  "12075792732946847581";
            publicTime: string;
            singerID: number;
            // singerMID: "001BLpXF2DyJe2";
            singerName: string;
            // singerName_hilight: "林俊杰";
            // singerTransName: "";
            // singerTransName_hilight: "";
            singer_list: Array<{
              id: number;
              // mid: "001BLpXF2DyJe2";
              name: string;
              // pmid: "";
              // title: "林俊杰";
              // type: 0;
              // uin: 0;
            }>;
            song_count: number;
            // type: 0;
          }>;
        };
      };
      meta: {
        curpage: number;
        estimate_sum: number;
        nextpage: number;
        perpage: number;
        query: string;
        sum: number;
      };
    };
  };
}

export interface SearchSonglistResponse {
  code: number;
  req_1: {
    code: number;
    data: {
      body: {
        songlist: {
          list: Array<{
            // copyrightnum: 0;
            createtime: string; // "2021-01-18"
            // creator: [Object];
            // diss_status: 400;
            dissid: string;
            dissname: string;
            docid: string;
            imgurl: string;
            introduction: string;
            listennum: number;
            modifytime: string;
            song_count: number;
          }>;
        };
      };
      meta: {
        curpage: number;
        estimate_sum: number;
        nextpage: number;
        perpage: number;
        query: string;
        sum: number;
      };
    };
  };
}

export enum SearchType {
  song = 0,
  singer = 1,
  album = 2,
  // mv = 4,
  songlist = 3,
  // user = 8,
  // lyric = 7,

  // mv = 12,
}

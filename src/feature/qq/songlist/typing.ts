import { SongInfo } from "../song/typing";

export interface Detail {
  dirinfo: {
    id: number;
    desc: string;
    picurl: string;
    title: string;
    songnum: number;
    listennum: number;
    ordernum: number; // collect number
    mtime: number; // timestamp seconds
    ctime: number; // timestamp seconds
    host_nick: string;
  };
  songlist: Array<SongInfo>;
}

export interface DetailResponse {
  code: number;
  req_1: {
    data: Detail;
  };
}

export interface Recommend {
  HasMore: boolean;
  List: Array<{
    Playlist: {
      basic: {
        play_cnt: number;
        title: string;
        modify_time: number;
        create_time: number;
        desc: string;
        cover: {
          default_url: string;
        };
        dirid: number;
      };
    };
  }>;
}

export interface RecommendResponse {
  code: number;
  req_1: {
    data: Recommend;
  };
}

export interface Category {
  v_group: Array<{
    group_id: number;
    group_name: string;
    v_item: Array<{ name: string; id: number }>;
  }>;
}
export interface CategoryResponse {
  code: number;
  req_1: {
    data: Category;
  };
}

export interface CategoryContent {
  content: {
    total_cnt: number;
    v_item: Array<{
      basic: {
        title: string;
        play_cnt: number;
        create_time: number;
        // desc: string;
        dirid: number;
        cover: {
          default_url: string;
        };
        creator: { nick: string; avatar: string };
      };
    }>;
  };
}

export interface CategoryContentResponse {
  code: number;
  req_1: {
    data: CategoryContent;
  };
}

interface Banner {
  shelf: {
    v_niche: {
      v_card: Array<{
        cover: string;
        jumptype: number;
        id: string;
        subid: string;
      }>;
    };
  };
}

export interface BannerResponse {
  req_1: {
    code: number;
    data: Banner;
  };
}

export enum JumpType {
  songlist = 10014,
  album = 10002,
  albumBuy = 3001,
}

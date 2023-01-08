export const enum JumpType {
  playlist = "playlist_detail",
}

export interface BannerResponse {
  data: Array<{
    id: number;
    pic: string;
    // priority: 1;
    url: string;
  }>;
  msg: string;
}

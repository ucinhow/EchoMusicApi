export interface Singer {
  area_id: number;
  singer_id: number;
  country_id: number;
  singer_name: string;
  country: number;
  other_name: string;
  singer_mid: string;
  spell: string;
  trend: number;
  singer_pmid: string;
  concernNum: number;
  singer_pic: string;
}
export interface SingerListResponse {
  req_0: {
    data: { area: number; sex: number; genre: number; singerlist: Singer[] };
  };
}

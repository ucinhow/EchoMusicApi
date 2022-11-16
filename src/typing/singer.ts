export interface Singer {
  areaId: number;
  id: number;
  countryId: number;
  name: string;
  country: number;
  alias: string;
  // singerMid: string;
  spell: string;
  trend: number;
  // singer_pmid: string;
  concernNum: number;
  pic: string;
}
export interface SingerListResponse {
  area: number;
  sex: number;
  genre: number;
  singerList: Singer[];
}

export interface SingerListApi {
  (): Promise<SingerListResponse>;
}

import { ERROR_MSG } from "@/common/constant";
import { Banners, DataType } from "@/common/typing";
import { BannerResponse, JumpType } from "./typing";

export const searializeBanner = (res: BannerResponse): Banners => {
  const data = res.req_1.data.shelf.v_niche.v_card;
  return data.map((item) => {
    let id = "";
    let type = DataType.song;
    switch (item.jumptype) {
      case JumpType.songlist:
        id = item.id;
        type = DataType.songlist;
        break;
      case JumpType.album:
        id = item.subid;
        type = DataType.album;
        break;
      case JumpType.albumBuy:
        const reg = /mid=\w+/;
        id = item.id.match(reg)?.[0]?.slice(4) || "";
        type = DataType.album;
        break;
      default:
        throw new Error(ERROR_MSG.BannerJumpError);
    }
    return {
      id,
      picUrl: item.cover,
      type,
    };
  });
};

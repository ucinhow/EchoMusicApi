import { ERROR_MSG } from "@/common/constant";
import { Banner, DataType } from "@/common/typing";
import { BannerResponse, JumpType } from "./typing";

const convertType = (type: string) => {
  switch (type) {
    case JumpType.playlist:
      return DataType.songlist;
    case JumpType.album:
      return DataType.album;
    default:
      throw new Error(ERROR_MSG.BannerJumpError);
  }
};

export const serializeBanner = (res: BannerResponse): Banner[] => {
  const { data } = res;
  const list = data.filter(({ id }) => id !== 1);
  return list.map(({ pic, url }) => {
    const [type, id] = url.slice(url.startsWith("https") ? 20 : 19).split("/");
    return {
      picUrl: pic,
      id,
      type: convertType(type),
    };
  });
};

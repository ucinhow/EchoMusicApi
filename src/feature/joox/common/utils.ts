import md5 from "md5";
import { Image } from "./typing";

export const getSecretKey = (params: Record<string, any>, id: string) => {
  const key = "Jo0x@t3Nc3nT";
  const str = Object.keys(params)
    .map((k) => k + "=" + encodeURIComponent(params[k]))
    .join("&");
  return md5(key + str + `&id=${encodeURIComponent(id)}`);
};

export const convertImage = (images: Image[] | null): string => {
  let pic = "";
  if (images?.length) {
    const url = images[0].url;
    const index = url.lastIndexOf("\\");
    pic = url.slice(0, index);
  }
  return pic;
};

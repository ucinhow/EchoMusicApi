import { searchType as qqSearchType } from "./qq";
import { searchType as jooxSearchType } from "./joox";
import { Source } from "@/common/typing/common";
import { SearchType, SearchTypeData } from "@/common/typing/search";

export const searchType: Record<
  Source,
  (key: string, page: number, type: SearchType) => Promise<SearchTypeData>
> = {
  [Source.qq]: (key: string, page: number, type: SearchType) =>
    qqSearchType(key, page, type),
  [Source.joox]: (key: string, page: number, type: SearchType) =>
    jooxSearchType(key, type),
};

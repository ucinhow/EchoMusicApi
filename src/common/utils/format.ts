import { parse } from "date-fns";

export const parseTimestamp = (str: string): number =>
  parse(str, "yyyy-MM-dd", new Date()).valueOf();

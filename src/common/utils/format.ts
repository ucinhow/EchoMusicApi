import { parse } from "date-fns";

export const parseTimestamp = (str: string): number =>
  parse(str, "yyyy-MM-dd", new Date()).valueOf();

export const str2Decimal = (str: string): number => parseInt(str, 10);

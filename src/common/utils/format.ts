import moment from "moment";

export const parseTimestamp = (str: string): number =>
  moment(str, "YYYY-MM-DD").valueOf();

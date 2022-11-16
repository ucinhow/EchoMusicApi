import md5 from "md5";
const middle = (ls: number[]): string => {
  const resNum: number[] = [];

  const test = (a: number, b?: number, c?: number): void => {
    if (b !== undefined && c !== undefined) {
      resNum.push(a >> 2);
      resNum.push(((a & 3) << 4) | (b >> 4));
      resNum.push(((b & 15) << 2) | (c >> 6));
      resNum.push(c & 63);
    } else {
      resNum.push(a >> 2);
      resNum.push((a & 3) << 4);
    }
  };

  for (let i = 0; i < ls.length; i += 3) {
    if (
      ls[i] !== undefined &&
      ls[i + 1] !== undefined &&
      ls[i + 2] !== undefined
    ) {
      test(ls[i], ls[i + 1], ls[i + 2]);
    } else {
      test(ls[i], undefined, undefined);
    }
  }
  const res: string[] = [];
  const zd =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  resNum.forEach((item) => res.push(zd[item]));
  return res.join("");
};
const head = (md5Str: string): string => {
  const res: string[] = [];
  [21, 4, 9, 26, 16, 20, 27, 30].forEach((x) => res.push(md5Str[x]));
  return res.join("");
};

const tail = (md5Str: string): string => {
  const res: string[] = [];
  [18, 11, 3, 2, 1, 7, 6, 25].forEach((x) => res.push(md5Str[x]));
  return res.join("");
};

const getLs = (md5Str: string): number[] => {
  const zd: Record<string, number> = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
  };
  const ol = [
    212, 45, 80, 68, 195, 163, 163, 203, 157, 220, 254, 91, 204, 79, 104, 6,
  ];
  const res: number[] = [];
  let j = 0;
  for (let i = 0; i < md5Str.length; i += 2) {
    const one = zd[md5Str[i]];
    const two = zd[md5Str[i + 1]];
    const r = (one * 16) ^ two;
    res.push(r ^ ol[j]);
    j += 1;
  }
  return res;
};

const getSecuritySign = (paramsBody: Record<string, any>): string => {
  const md5Str = md5(JSON.stringify(paramsBody)).toUpperCase();
  const h = head(md5Str);
  const e = tail(md5Str);
  const ls = getLs(md5Str);
  const m = middle(ls);
  const res = ("zzb" + h + m + e).toLowerCase();
  return res.replace(/[\\/+]/g, "");
};
export default getSecuritySign;

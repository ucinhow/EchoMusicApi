import { SearchType } from "@/common/typing";
import {
  queryToplistDetail,
  queryToplistAll,
  querySearchSuggest,
  querySearchType,
  querySonglistRecommend,
  queryBanner,
  queryAlbumDetail,
  querySingerDetail,
  querySonglistDetail,
  querySonglistCategory,
  querySonglistList,
  querySongDetail,
  queryPlayUrl,
  querySongLyric,
} from "@/feature/qq";
const testRequestQQ = () => {
  test("request qq search suggest", async () => {
    const res = await querySearchSuggest("交换余生");
    expect(res.data.code).toEqual(0);
  });
  test("request qq search song", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.song);
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq search album", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.album);
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq search songlist", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.songlist);
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq toplist detail", async () => {
    const res = await queryToplistDetail(26, 1, 30);
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq toplist all", async () => {
    const res = await queryToplistAll();
    expect(res.data.req_0.code).toEqual(0);
  });
  test("request qq songlist recommend", async () => {
    const res = await querySonglistRecommend();
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq songlist detail", async () => {
    const res = await querySonglistDetail(8615354308, 1, 30);
    expect(res.data.req_1.code).toBe(0);
  });
  test("request qq songlist category", async () => {
    const res = await querySonglistCategory();
    expect(res.data.req_1.code).toBe(0);
  });
  test("request qq songlist category content", async () => {
    const res = await querySonglistList(3317, 1, 30);
    expect(res.data.req_1.code).toBe(0);
  });
  // test("request qq songlist songitems", async () => {
  //   const res = await querySonglistItems(8615354308, 0, 30);
  //   expect(res.data.req_1.code).toBe(0);
  // });
  test("request qq banner", async () => {
    const res = await queryBanner();
    expect(res.data.req_1.code).toEqual(0);
  });
  test("request qq album detail", async () => {
    const res = await queryAlbumDetail("004AhJHV3slLjN");
    expect(res.data.req_1.code).toBe(0);
    expect(res.data.req_2.code).toBe(0);
  });
  test("request qq singer detail", async () => {
    const res = await querySingerDetail("000aHmbL2aPXWH");
    expect(res.data.req_1.code).toBe(0);
    expect(res.data.req_2.code).toBe(0);
    expect(res.data.req_3.code).toBe(0);
    expect(res.data.req_4.code).toBe(0);
  });
  test("request qq song detail", async () => {
    const res = await querySongDetail("000n8irK2x73Ie");
    expect(res.data.req_1.code).toBe(0);
  });
  test("request qq song url", async () => {
    const res = await queryPlayUrl("000n8irK2x73Ie");
    expect(res.data.req_1.code).toBe(0);
  });
  test("request qq song lyric", async () => {
    const res = await querySongLyric("000n8irK2x73Ie");
    expect(res.status).toBe(200);
  });
};

export default testRequestQQ;

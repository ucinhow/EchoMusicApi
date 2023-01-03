import { SearchType } from "@/common/typing";
import server from "@/server";
import supertest from "supertest";
import cache from "@/common/cache";

const request = supertest(server.callback());

const testApi = () => {
  test("test search suggest api", async () => {
    const res = await request.get(
      `/search/suggest?key=${encodeURIComponent("交换余生")}`
    );
    expect(res.status).toBe(200);
  });
  test("test search song api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("交换余生")}&type=${
        SearchType.song
      }`
    );
    expect(res.status).toBe(200);
  });
  test("test search album api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("交换余生")}&type=${
        SearchType.album
      }`
    );
    expect(res.status).toBe(200);
  });
  test("test search songlist api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("学习歌单")}&type=${
        SearchType.songlist
      }`
    );
    expect(res.status).toBe(200);
  });
  test("test banner api", async () => {
    const res = await request.get("/banner");
    expect(res.status).toEqual(200);
  });
  test("test toplist all api", async () => {
    const res = await request.get("/toplist/all?src=qq");
    expect(res.status).toBe(200);
  });
  test("test toplist detail api", async () => {
    const res = await request.get("/toplist/detail?id=26&src=qq");
    expect(res.status).toBe(200);
  });
  test("test songlist category api", async () => {
    const res = await request.get("/songlist/cat?src=qq");
    expect(res.status).toBe(200);
  });
  test("test songlist recommend api", async () => {
    const res = await request.get("/songlist/recommend?src=qq");
    expect(res.status).toBe(200);
  });
  test("test songlist category list api", async () => {
    const res = await request.get("/songlist/list?src=qq&catId=3317");
    expect(res.status).toBe(200);
  });
  test("test songlist detail api", async () => {
    const res = await request.get("/songlist/detail?src=qq&id=3056");
    expect(res.status).toBe(200);
  });
  test("test songlist song items api", async () => {
    const res = await request.get(
      "/songlist/songItems?src=qq&id=3056&offset=10&num=20"
    );
    expect(res.status).toBe(200);
  });
  test("test album detail api", async () => {
    const res = await request.get("/album/detail?src=qq&id=004AhJHV3slLjN");
    expect(res.status).toBe(200);
  });
  test("test singer detail api", async () => {
    const res = await request.get("/singer/detail?src=qq&id=000aHmbL2aPXWH");
    expect(res.status).toBe(200);
  });
  test("test song detail api", async () => {
    const res = await request.get("/song/detail?src=qq&id=000n8irK2x73Ie");
    expect(res.status).toBe(200);
  });
  test("test song url api", async () => {
    const res = await request.get("/song/url?src=qq&id=000n8irK2x73Ie");
    expect(res.status).toBe(200);
  });
  test("test song lyric api", async () => {
    const res = await request.get("/song/lyric?src=qq&id=000n8irK2x73Ie");
    expect(res.status).toBe(200);
  });
};

afterAll(() => {
  //   app.close();
  cache.close();
});

describe("test api", testApi);
// export default testApi;

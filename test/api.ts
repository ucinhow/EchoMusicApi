import { SearchType } from "@/common/typing";
import { app } from "@/app";
import supertest from "supertest";
import assert from "assert";

const testApi = () => {
  const request = supertest(app);
  after((done) => app.close(done));
  it("test search suggest api", async () => {
    const res = await request.get(
      `/search/suggest?key=${encodeURIComponent("交换余生")}`
    );
    assert.equal(res.status, 200);
  });
  it("test search song api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("交换余生")}&type=${
        SearchType.song
      }`
    );
    assert.equal(res.status, 200);
  });
  it("test search album api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("交换余生")}&type=${
        SearchType.album
      }`
    );
    assert.equal(res.status, 200);
  });
  it("test search songlist api", async () => {
    const res = await request.get(
      `/search/type?key=${encodeURIComponent("学习歌单")}&type=${
        SearchType.songlist
      }`
    );
    assert.equal(res.status, 200);
  });
  it("test banner api", async () => {
    const res = await request.get("/banner");
    assert.equal(res.status, 200);
  });
  it("test toplist all api", async () => {
    const res = await request.get("/toplist/all?src=qq");
    assert.equal(res.status, 200);
  });
  it("test toplist detail api", async () => {
    const res = await request.get("/toplist/detail?id=26&src=qq");
    assert.equal(res.status, 200);
  });
  it("test songlist category api", async () => {
    const res = await request.get("/songlist/menu?src=qq");
    assert.equal(res.status, 200);
  });
  it("test songlist recommend api", async () => {
    const res = await request.get("/songlist/recommend?src=qq");
    assert.equal(res.status, 200);
  });
  it("test songlist category list api", async () => {
    const res = await request.get("/songlist/list?src=qq&id=3317");
    assert.equal(res.status, 200);
  });
  it("test songlist detail api", async () => {
    const res = await request.get("/songlist/detail?src=qq&id=3056");
    assert.equal(res.status, 200);
  });
  // it("test songlist song items api", async () => {
  //   const res = await request.get(
  //     "/songlist/songItems?src=qq&id=3056&offset=10&num=20"
  //   );
  //   assert.equal(res.status, 200);
  // });
  it("test album detail api", async () => {
    const res = await request.get("/album/detail?src=qq&id=004AhJHV3slLjN");
    assert.equal(res.status, 200);
  });
  it("test singer detail api", async () => {
    const res = await request.get("/singer/detail?src=qq&id=000aHmbL2aPXWH");
    assert.equal(res.status, 200);
  });
  it("test song detail api", async () => {
    const res = await request.get("/song/detail?src=qq&id=000n8irK2x73Ie");
    assert.equal(res.status, 200);
  });
  it("test song url api", async () => {
    const res = await request.get("/song/url?src=qq&id=000n8irK2x73Ie");
    assert.equal(res.status, 200);
  });
  it("test song lyric api", async () => {
    const res = await request.get("/song/lyric?src=qq&id=000n8irK2x73Ie");
    assert.equal(res.status, 200);
  });
};

describe("test api", testApi);

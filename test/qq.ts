import {
  queryToplistDetail,
  queryToplistAll,
  querySearchSuggest,
  querySearchAlbum,
  querySearchSong,
  querySearchSonglist,
  // querySearchType,
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
import assert from "assert";
const testRequestQQ = () => {
  it("request qq search suggest", async () => {
    const res = await querySearchSuggest("交换余生");
    assert.equal(res.data.code, 0);
  });
  it("request qq search song", async () => {
    const res = await querySearchSong("交换余生", 1);
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq search album", async () => {
    const res = await querySearchAlbum("交换余生", 1);
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq search songlist", async () => {
    const res = await querySearchSonglist("交换余生", 1);
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq toplist detail", async () => {
    const res = await queryToplistDetail(26, 1, 30);
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq toplist all", async () => {
    const res = await queryToplistAll();
    assert.equal(res.data.req_0.code, 0);
  });
  it("request qq songlist recommend", async () => {
    const res = await querySonglistRecommend();
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq songlist detail", async () => {
    const res = await querySonglistDetail(8615354308, 1, 30);
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq songlist category", async () => {
    const res = await querySonglistCategory();
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq songlist category content", async () => {
    const res = await querySonglistList(3317, 1, 30);
    assert.equal(res.data.req_1.code, 0);
  });
  // it("request qq songlist songitems", async () => {
  //   const res = await querySonglistItems(8615354308, 0, 30);
  //   assert.equal(res.data.req_1.code, 0).toBe(0);
  // });
  it("request qq banner", async () => {
    const res = await queryBanner();
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq album detail", async () => {
    const res = await queryAlbumDetail("004AhJHV3slLjN");
    assert.equal(res.data.req_1.code, 0);
    assert.equal(res.data.req_2.code, 0);
  });
  it("request qq singer detail", async () => {
    const res = await querySingerDetail("000aHmbL2aPXWH");
    assert.equal(res.data.req_1.code, 0);
    assert.equal(res.data.req_2.code, 0);
    assert.equal(res.data.req_3.code, 0);
    assert.equal(res.data.req_4.code, 0);
  });
  it("request qq song detail", async () => {
    const res = await querySongDetail("000n8irK2x73Ie");
    assert.equal(res.data.req_1.code, 0);
  });
  it("request qq song url", async () => {
    const res = await queryPlayUrl("000n8irK2x73Ie");
    assert.equal(res.data.code, 0);
  });
  it("request qq song lyric", async () => {
    const res = await querySongLyric("000n8irK2x73Ie");
    assert.equal(res.status, 200);
  });
};

export default testRequestQQ;

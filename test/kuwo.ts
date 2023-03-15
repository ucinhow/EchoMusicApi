import {
  queryToplistDetail,
  queryToplistAll,
  querySearchAlbum,
  querySearchSinger,
  querySearchSonglist,
  querySearchSong,
  queryUrl,
  queryLyric,
  queryDetail as querySongDetail,
  querySonglistRecommend,
  queryBanner,
  queryAlbumDetail,
  querySingerDetail,
  querySonglistDetail,
  querySonglistCat,
  querySonglistList,
} from "@/feature/kuwo";
import assert from "assert";

const successMsg = "success";
const testRequestKuwo = () => {
  it("request kw search song", async () => {
    const res = await querySearchSong("交换余生", 1, 20);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw search album", async () => {
    const res = await querySearchAlbum("交换余生", 1, 20);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw search songlist", async () => {
    const res = await querySearchSonglist("交换余生", 1, 20);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw search singer", async () => {
    const res = await querySearchSinger("林俊杰", 1, 20);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw toplist detail", async () => {
    const res = await queryToplistDetail(93, 1, 30);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw toplist all", async () => {
    const res = await queryToplistAll();
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw songlist recommend", async () => {
    const res = await querySonglistRecommend();
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw songlist detail", async () => {
    const res = await querySonglistDetail(3411671590, 1, 30);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw songlist category", async () => {
    const res = await querySonglistCat();
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw songlist category list", async () => {
    const res = await querySonglistList(2189, 1, 30);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw banner", async () => {
    const res = await queryBanner();
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw album detail", async () => {
    const res = await queryAlbumDetail(29593612, 1, 30);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw singer detail", async () => {
    const res = await querySingerDetail(336);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw song detail", async () => {
    const res = await querySongDetail(440616);
    assert.equal(res.data.msg, successMsg);
  });
  it("request kw song url", async () => {
    const res = await queryUrl(440616);
    assert.equal(res.status, 200);
  });
  it("request kw song lyric", async () => {
    const res = await queryLyric(440616);
    assert.equal(res.data.msg, "成功");
  });
};

export default testRequestKuwo;

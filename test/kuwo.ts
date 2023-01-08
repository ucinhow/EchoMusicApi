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
const successMsg = "success";
const testRequestKuwo = () => {
  test("request kw search song", async () => {
    const res = await querySearchSong("交换余生", 1, 20);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw search album", async () => {
    const res = await querySearchAlbum("交换余生", 1, 20);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw search songlist", async () => {
    const res = await querySearchSonglist("交换余生", 1, 20);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw search singer", async () => {
    const res = await querySearchSinger("林俊杰", 1, 20);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw toplist detail", async () => {
    const res = await queryToplistDetail(93, 1, 30);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw toplist all", async () => {
    const res = await queryToplistAll();
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw songlist recommend", async () => {
    const res = await querySonglistRecommend();
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw songlist detail", async () => {
    const res = await querySonglistDetail(3411671590, 1, 30);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw songlist category", async () => {
    const res = await querySonglistCat();
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw songlist category list", async () => {
    const res = await querySonglistList(2189, 1, 30);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw banner", async () => {
    const res = await queryBanner();
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw album detail", async () => {
    const res = await queryAlbumDetail(29593612, 1, 30);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw singer detail", async () => {
    const res = await querySingerDetail(336);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw song detail", async () => {
    const res = await querySongDetail(440616);
    expect(res.data.msg).toEqual(successMsg);
  });
  test("request kw song url", async () => {
    const res = await queryUrl(440616);
    expect(res.status).toEqual(200);
  });
  test("request kw song lyric", async () => {
    const res = await queryLyric(440616);
    expect(res.data.msg).toEqual("成功");
  });
};

export default testRequestKuwo;

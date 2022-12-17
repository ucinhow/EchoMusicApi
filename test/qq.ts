// import { request } from ".";
// import request from "supertest";
// import app from "@/server";
import { SearchType } from "@/common/typing";
import {
  queryToplistDetail,
  queryToplistAll,
  querySearchSuggest,
  querySearchType,
} from "@/feature/qq";
const testRequestQQ = () => {
  // test("toplist all api for qq", async () => {
  //   const response = await request(app).get("/toplist/all?src=qq");
  //   console.log(response.body);
  //   expect(response.status).toEqual(200);
  // });
  // test("toplist all api for netease", async () => {
  //   const response = await request(app).get("/toplist/all?src=netease");
  //   console.log(response.body);
  //   expect(response.status).toEqual(200);
  // });
  test("request qq search suggest", async () => {
    const res = await querySearchSuggest("交换余生");
    expect(res.data.code).toEqual(0);
  });
  test("request qq search song", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.song);
    expect(res.data.code).toEqual(0);
  });
  test("request qq search album", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.album);
    expect(res.data.code).toEqual(0);
  });
  test("request qq search Songlist", async () => {
    const res = await querySearchType("交换余生", 1, SearchType.songlist);
    expect(res.data.code).toEqual(0);
  });
  test("request qq toplist detail", async () => {
    const res = await queryToplistDetail("26", 0);
    expect(res.data.code).toEqual(0);
  });
  test("request qq toplist all", async () => {
    const res = await queryToplistAll();
    expect(res.data.code).toEqual(0);
  });
};
export default testRequestQQ;

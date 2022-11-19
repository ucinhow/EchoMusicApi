// import { request } from ".";
import app from "@/server";
import request from "supertest";
const testSong = () => {
  test("song api for joox", async () => {
    const response = await request(app).get(
      `/search?src=joox&key=${encodeURIComponent("交换余生")}`
    );
    expect(response.status).toEqual(200);
  });
  //   test("search all", async () => {
  //     const data = await search("交换余生");
  //     console.log(data);
  //   });
  //   test("search song", async () => {
  //     const data = await searchType("交换余生", SearchType.song);
  //     console.log(data);
  //   });
};

export default testSong;

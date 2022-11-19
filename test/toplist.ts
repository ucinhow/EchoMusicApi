// import { request } from ".";
import request from "supertest";
import app from "@/server";
const testToplist = () => {
  test("toplist all api for qq", async () => {
    const response = await request(app).get("/toplist/all?src=qq");
    console.log(response.body);
    expect(response.status).toEqual(200);
  });
  test("toplist all api for netease", async () => {
    const response = await request(app).get("/toplist/all?src=netease");
    console.log(response.body);
    expect(response.status).toEqual(200);
  });
};
export default testToplist;

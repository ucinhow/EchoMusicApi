import app from "@/server";
// import supertest from "supertest";
// export const request = supertest.agent(app);
import testSong from "./song";
import testToplist from "./toplist";

describe("test toplist", testToplist);
describe("test song", testSong);

afterAll(() => {
  app.close();
});

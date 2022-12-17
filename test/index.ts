// import app from "@/server";
// import supertest from "supertest";
// export const request = supertest.agent(app);
// import testSong from "./song";
import { client } from "@/common/cache";
import testQQ from "./qq";
import testJoox from "./joox";

describe("test qq", testQQ);
describe("test joox", testJoox);

// afterAll(() => {
//   app.close();
//   client.quit();
// });

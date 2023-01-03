import testQQ from "./qq";
import testJoox from "./joox";
import cache from "@/common/cache";

describe("test qq", testQQ);
describe("test joox", testJoox);
// describe("test api", testApi);
afterAll(() => {
  cache.close();
});

import testQQ from "./qq";
import testJoox from "./joox";
import testKuwo from "./kuwo";
import cache from "@/common/cache";

// describe("test qq", testQQ);
// describe("test joox", testJoox);
describe("test kuwo", testKuwo);
afterAll(() => {
  cache.close();
});

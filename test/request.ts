import testKuwo from "./kuwo";
import testQQ from "./qq";
import testJoox from "./joox";

describe("test source request", () => {
  describe("test qq", testQQ);
  describe("test joox", testJoox);
  describe("test kuwo", testKuwo);
});

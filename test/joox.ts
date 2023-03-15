import { querySearchSong, querySong } from "@/feature/joox";
import assert from "assert";
const testJoox = () => {
  it("request joox song data", async () => {
    const res = await querySong("SxqddWyRh+yrLEvRgtKUTA==");
    assert.notEqual(res, undefined);
  });
  it("request joox search song", async () => {
    const res = await querySearchSong("交换余生");
    assert.equal(res.data.error_code, 0);
  });
};

export default testJoox;

import { querySearchSong, querySong } from "@/feature/joox";
const testJoox = () => {
  test("request joox song data", async () => {
    const res = await querySong("SxqddWyRh+yrLEvRgtKUTA==");
    expect(res.data.error).toEqual("");
  });
  test("request joox search song", async () => {
    const res = await querySearchSong("交换余生");
    expect(res.data.error_code).toBe(0);
  });
};

export default testJoox;

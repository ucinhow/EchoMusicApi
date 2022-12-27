import Router from "@koa/router";
import toplist from "./toplist";
import singer from "./singer";
import search from "./search";
import songlist from "./songlist";
import banner from "./banner";
import song from "./song";
import album from "./album";

const router = new Router();
router.use("/toplist", toplist.routes(), toplist.allowedMethods());
router.use("/singer", singer.routes(), singer.allowedMethods());
router.use("/search", search.routes(), search.allowedMethods());
router.use("/songlist", songlist.routes(), songlist.allowedMethods());
router.use("/banner", banner.routes(), banner.allowedMethods());
router.use("/song", song.routes(), song.allowedMethods());
router.use("/album", album.routes(), album.allowedMethods());
export default router;

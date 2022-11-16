import Router from "@koa/router";
import toplist from "./toplist";
import singer from "./singer";
import search from "./search";
const router = new Router();
router.use("/toplist", toplist.routes(), toplist.allowedMethods());
router.use("/singer", singer.routes(), singer.allowedMethods());
router.use("/search", search.routes(), search.allowedMethods());
export default router;

import Router from '@koa/router'
import toplist from './toplist'
const router = new Router()
router.use('/toplist', toplist.routes(), toplist.allowedMethods())

export default router

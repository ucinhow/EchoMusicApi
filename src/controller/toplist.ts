import Router from '@koa/router'
import { queryToplistInfo } from '@/feature/qq'
import { Source } from '@/typing'
const router = new Router()
// todo 逻辑不完善
router.get('/info/:src', async (ctx, next) => {
  await next()
  const { src } = ctx.query
  try {
    switch (src) {
      case Source.qq: {
        ctx.response.body = await queryToplistInfo()
      }
    }
    ctx.res.statusCode = 200
    ctx.res.end()
  } catch (e) {
    console.error(e)
  }
})

export default router

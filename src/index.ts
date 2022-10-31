import Koa from 'koa'
import { koaBody as bodyparser } from 'koa-body'
import logger from 'koa-logger'
import router from '@/controller/route'
const app = new Koa()
app.use(bodyparser())
app.use(logger())
app.use(router.routes()).use(router.allowedMethods())

const port = 3001
export default app.listen(port, () => console.log(`server running in localhost:${port}.`))

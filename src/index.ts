import { error, json, Router } from 'itty-router'
import pricingRouter from './handlers/pricing.handler'

const router = Router()

export interface Env {
  AUTH: String
  ENVIRONMENT: String
}

const withAllowList = (request: Request, env: Env) => {
  const allowList = [
    '185.205.225.41'
  ] /* Should be replace with Prisma Allowed IPs Look Up */
  const clientIp = request.headers.get('CF-Connecting-IP')

  if (!allowList.includes(clientIp as string) && env.ENVIRONMENT != 'local')
    return error(403)
}

router
  .all('*', withAllowList)
  .all('*', pricingRouter.handle)
  .all('*', () => error(404))

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
    router.handle(req, env, ctx).then(json).catch(error)
}

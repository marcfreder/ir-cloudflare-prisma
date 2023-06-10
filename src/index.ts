import prisma from './utils/prisma.client'
import { error, json, Router, withParams, withContent } from 'itty-router'
import { z } from 'zod'

const TypeGuard = z.object({
  email: z.string().email()
})

export interface Env {
  DATABASE_URL: string
  AUTH: String
}

const router = Router()

router
  .get('/', async () => {
    const data = await prisma.log.findMany()

    return data
  })
  .get('/hello/:name', withParams, (request) => {
    return { data: request.name }
  })
  .post('/test', withContent, async ({ content }) => {
    const status = TypeGuard.safeParse(content)

    return status
  })
  .all('*', () => error(404))

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
    router.handle(req, env, ctx).then(json).catch(error)
}

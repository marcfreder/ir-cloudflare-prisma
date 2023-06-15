import Pricing from '../services/pricing.service'
import Klarna from '../lib/klarna.lib'
import { Env } from '..'
import { Router, IRequest, withContent, error } from 'itty-router'
import { z } from 'zod'

const pricingRouter = Router()

type CF = [env: Env, ctx: ExecutionContext]

const TypeGuard = z.object({
  id: z.string()
})

const withTypeGuard = (request: IRequest) => {
  const status = TypeGuard.safeParse(request.content)

  if (!status.success) return error(400, { message: 'Bad Request' })
}

pricingRouter
  .post<IRequest, CF>(
    '/fn/session',
    withContent,
    withTypeGuard,
    async ({ content }, env) => {
      const pricing = await Pricing.getMetaData(content.id)
      const data = await Klarna.initiatePayment(pricing.meta, env.AUTH)

      return data
    }
  )

  .get('/fn/pricing', async () => {
    const data = await Pricing.getAll()

    return data
  })

export default pricingRouter

import { prisma } from '../utils/prisma.client'

async function getMetaData(id: string) {
  return await prisma.pricing.findUniqueOrThrow({
    where: {
      id
    },
    select: {
      meta: true
    }
  })
}

async function getAll() {
  return await prisma.pricing.findMany()
}

const Pricing = {
  getAll,
  getMetaData
}

export default Pricing

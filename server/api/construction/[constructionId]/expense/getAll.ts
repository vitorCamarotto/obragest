import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.context.params){
    const constructionId = parseInt(event.context.params.constructionId)

    try {
      const expenses = await prisma.expense.findMany({
        where: {
          construction_id: constructionId
        }
      })

      return JSON.parse(JSON.stringify(expenses, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ))

    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao adquirir obra pelo ID'
      })
    }
  }
})

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.context.params){
    const constructionId = parseInt(event.context.params.constructionId)
    const body = await readBody(event)

    try {
      const expenses = await prisma.expense.create({
        data: {
          amount: parseFloat(body.amount),
          description: body.description,
          type: body.type,
          date: body.date,
          payment_method: body.payment_method,
          construction_id: constructionId
        }
      })

      return JSON.parse(JSON.stringify(expenses, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ))

    } catch (error) {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao criar Custo'
      })
    }
  }
})

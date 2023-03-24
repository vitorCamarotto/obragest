import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (body.expenseId) {
    const expenseId = BigInt(body.expenseId)

    try {
      const expense = await prisma.expense.delete({
        where: {
          id: expenseId,
        },
      })

      return JSON.parse(JSON.stringify(expense, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ))

    } catch (error) {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao deletar Custo'
      })
    }
  }
})

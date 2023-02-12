import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    await prisma.user.create({
      data: {
        name: 'Tudo certo'
      }
    })
    return { response: 'ok'}
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Falha ao criar usuário'
    })
  }
})

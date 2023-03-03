import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  if (event.context.params){
    const constructionId = parseInt(event.context.params.constructionId)

    try {
      const construction = await prisma.construction.findUnique({
        where: {
          id: constructionId
        }
      })

      return JSON.parse(JSON.stringify(construction, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ))

    } catch (error) {
      console.error(error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Falha ao adquirir obra pelo ID'
      })
    }
  }
})

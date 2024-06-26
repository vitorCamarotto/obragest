import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  try {
    const constructions = await prisma.construction.findMany({
      where: {
        user_id: user?.id,
      }
    })

    return JSON.parse(JSON.stringify(constructions, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ))

  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Falha ao adquirir obras'
    })
  }
})

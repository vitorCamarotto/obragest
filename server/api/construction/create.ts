import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const body = await readBody(event)

  try {
    const construction = await prisma.construction.create({
      data: {
        name: body.name,
        user_id: user?.id
      }
    })

    return JSON.parse(JSON.stringify(construction, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value,
    ))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Falha ao criar obra'
    })
  }
})

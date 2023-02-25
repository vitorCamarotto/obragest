import { serverSupabaseUser } from '#supabase/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)

  const body = await readBody(event)

  try {
    await prisma.construction.create({
      data: {
        name: body.name
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

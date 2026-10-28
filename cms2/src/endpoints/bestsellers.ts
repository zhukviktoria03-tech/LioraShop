import type { Endpoint } from 'payload'

export const bestsellers: Endpoint = {
  path: '/bestsellers',
  method: 'get',
  handler: async (req) => {
    const requestedLimit = Number.parseInt(req.searchParams.get('limit') || '6', 10)
    const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 12) : 6

    try {
      const products = await req.payload.find({
        collection: 'products',
        where: {
          isBestseller: {
            equals: true,
          },
        },
        depth: 1,
        limit,
      })

      return Response.json(products.docs)
    } catch (error) {
      req.payload.logger.error(`Помилка отримання бестселерів: ${String(error)}`)
      return Response.json(
        {
          message: 'Не вдалося завантажити бестселери',
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }
  },
}
import type { Endpoint } from 'payload'

export const pageBySlug: Endpoint = {
  path: '/page-by-slug/:slug',
  method: 'get',
  handler: async (req) => {
    const slug = req.routeParams?.slug

    if (typeof slug !== 'string' || !slug) {
      return Response.json({ message: 'Слаг сторінки є обовʼязковим' }, { status: 400 })
    }

    try {
      const pages = await req.payload.find({
        collection: 'pages',
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        limit: 1,
      })

      if (!pages.docs.length) {
        return Response.json({ message: 'Сторінку не знайдено' }, { status: 404 })
      }

      return Response.json(pages.docs[0])
    } catch (error) {
      req.payload.logger.error(`Помилка отримання сторінки ${slug}: ${String(error)}`)
      return Response.json(
        {
          message: 'Внутрішня помилка сервера',
          error: error instanceof Error ? error.message : String(error),
        },
        { status: 500 },
      )
    }
  },
}
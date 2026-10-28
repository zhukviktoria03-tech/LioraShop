import { PayloadHandler } from 'payload/config'

export const pageBySlugHandler: PayloadHandler = async (req, res) => {
  const slug = req.params?.slug

  if (!slug) {
    return res.status(400).json({ message: 'Слаг сторінки є обовʼязковим' })
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
      return res.status(404).json({ message: 'Сторінку не знайдено' })
    }

    const page = pages.docs[0]
    return res.status(200).json(page)
  } catch (error: any) {
    req.payload.logger.error(`Помилка отримання сторінки ${slug}:`, error)
    return res.status(500).json({ message: 'Внутрішня помилка сервера', error: error?.message })
  }
}

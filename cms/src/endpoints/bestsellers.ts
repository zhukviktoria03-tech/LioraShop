import { PayloadHandler } from 'payload/config'

export const bestsellersHandler: PayloadHandler = async (req, res) => {
  const limit = req.query?.limit ? parseInt(String(req.query.limit), 10) : 6

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

    return res.status(200).json(products.docs)
  } catch (error: any) {
    req.payload.logger.error('Помилка отримання бестселерів:', error)
    return res.status(500).json({ message: 'Не вдалося завантажити бестселери', error: error?.message })
  }
}

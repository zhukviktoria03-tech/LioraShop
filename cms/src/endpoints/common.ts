import { PayloadHandler } from 'payload/config'

export const commonHandler: PayloadHandler = async (_req, res) => {
  const djangoUrl = process.env.DJANGO_STORE_URL || 'http://localhost:8000'

  return res.status(200).json({
    brandName: 'Liora',
    tagline: 'Шкіра спокійна. Склад читається.',
    contactEmail: 'pryvit@liora.shop',
    phone: '+380 67 123 45 67',
    city: 'Київ',
    freeShippingThreshold: 1500,
    djangoStoreUrls: {
      catalog: `${djangoUrl}/katalog/`,
      routine: `${djangoUrl}/#routine`,
      login: `${djangoUrl}/vhid/`,
      register: `${djangoUrl}/reiestratsiia/`,
    },
  })
}

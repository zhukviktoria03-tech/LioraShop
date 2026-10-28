import type { Endpoint } from 'payload'

export const common: Endpoint = {
  path: '/common',
  method: 'get',
  handler: async () => {
    const djangoUrl = process.env.DJANGO_STORE_URL || 'http://localhost:8000'

    return Response.json({
      brandName: 'Liora',
      tagline: 'Шкіра спокійна. Склад читається.',
      djangoStoreBaseUrl: djangoUrl,
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
  },
}
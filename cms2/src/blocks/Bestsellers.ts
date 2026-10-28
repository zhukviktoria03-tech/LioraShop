import type { Block } from 'payload'

export const Bestsellers: Block = {
  slug: 'bestsellers',
  labels: {
    singular: 'Бестселери (Bestsellers)',
    plural: 'Секції бестселерів',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок секції',
      defaultValue: 'Те, що обирають знову і знову',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Підзаголовок',
      defaultValue: 'Хіти нашого інтернет-магазину зі стабільними відгуками та доведеною дією.',
    },
    {
      name: 'limit',
      type: 'number',
      required: true,
      defaultValue: 3,
      min: 1,
      max: 12,
      label: 'Кількість засобів для показу',
    },
  ],
}
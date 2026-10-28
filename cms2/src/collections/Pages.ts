import type { CollectionConfig } from 'payload'
import { landingBlocks } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва сторінки',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL-слаг сторінки (наприклад, home або about)',
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      labels: {
        singular: 'Блок сторінки',
        plural: 'Блоки сторінки',
      },
      blocks: landingBlocks,
    },
  ],
}
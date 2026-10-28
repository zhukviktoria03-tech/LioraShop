import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'isBestseller'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Назва засобу',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Коротка дія або слоган',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Категорія',
      options: [
        { label: 'Очищення', value: 'cleansing' },
        { label: 'Тоніки', value: 'toners' },
        { label: 'Сироватки', value: 'serums' },
        { label: 'Креми', value: 'creams' },
        { label: 'Маски', value: 'masks' },
        { label: 'Сонцезахист (SPF)', value: 'sunscreen' },
        { label: 'Догляд за тілом', value: 'body' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Ціна (грн)',
    },
    {
      name: 'volume',
      type: 'text',
      required: true,
      label: "Об'єм (наприклад: 50 мл)",
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Фотографія засобу',
    },
    {
      name: 'isBestseller',
      type: 'checkbox',
      label: 'Показувати як бестселер на лендінгу',
      defaultValue: false,
    },
    {
      name: 'djangoUrl',
      type: 'text',
      required: true,
      label: 'Посилання на товар в інтернет-магазині Django',
      defaultValue: '/katalog/',
    },
  ],
}
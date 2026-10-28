import { Block } from 'payload/types'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Головний екран (Hero)',
    plural: 'Головні екрани',
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Текст бейджа',
      defaultValue: 'Фізіологічний догляд за шкірою',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Головний заголовок',
      defaultValue: 'Шкіра спокійна. Склад читається.',
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Підзаголовок / опис',
      defaultValue: 'Liora збирає засоби без зайвого аромату та агресивних барвників: природне відновлення барʼєру шкіри та зрозумілий склад.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Зображення флагманського засобу',
    },
    {
      name: 'ctaText',
      type: 'text',
      required: true,
      label: 'Текст кнопки переходу',
      defaultValue: 'Перейти до каталогу LioraShop',
    },
    {
      name: 'ctaLink',
      type: 'text',
      required: true,
      label: 'Посилання на Django-магазин',
      defaultValue: 'http://127.0.0.1:8000/',
    },
  ],
}

import { Block } from 'payload/types'

export const Cta: Block = {
  slug: 'cta',
  labels: {
    singular: 'Заклик до дії (CTA)',
    plural: 'Блоки CTA',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      label: 'Головний заклик',
      defaultValue: 'Готові подарувати шкірі відчуття спокою?',
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Текст під закликом',
      defaultValue: 'Переходьте до нашого основного каталогу LioraShop, замовляйте свіжі формули та отримуйте безкоштовну доставку Новою поштою від 1 500 грн.',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
      label: 'Напис на кнопці',
      defaultValue: 'Відкрити магазин LioraShop',
    },
    {
      name: 'targetUrl',
      type: 'text',
      required: true,
      label: 'URL переходу (Django store)',
      defaultValue: 'http://127.0.0.1:8000/',
    },
  ],
}

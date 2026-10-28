import { Block } from 'payload/types'

export const Philosophy: Block = {
  slug: 'philosophy',
  labels: {
    singular: 'Філософія бренду (Philosophy)',
    plural: 'Блоки філософії',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок секції',
      defaultValue: 'Чому саме Liora?',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Короткий опис філософії',
      defaultValue: 'Ми не обіцяємо миттєвої магії за один день. Ми створюємо формули, які підтримують ліпідний шар і дозволяють шкірі дихати.',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Переваги догляду',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Назва переваги',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Пояснення',
        },
      ],
    },
  ],
}

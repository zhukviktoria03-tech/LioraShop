import { Block } from 'payload/types'

export const Routine: Block = {
  slug: 'routine',
  labels: {
    singular: 'Схема догляду (Routine)',
    plural: 'Схеми догляду',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок блоку',
      defaultValue: 'Сім полиць — одна зрозуміла рутина',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Кроки догляду',
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          required: true,
          label: 'Номер кроку (наприклад, 01)',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Назва кроку',
        },
        {
          name: 'tip',
          type: 'textarea',
          required: true,
          label: 'Порада та дія',
        },
      ],
    },
  ],
}

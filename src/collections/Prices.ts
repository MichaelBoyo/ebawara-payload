import type { CollectionConfig } from 'payload'

export const Price: CollectionConfig = {
  slug: 'prices',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
}

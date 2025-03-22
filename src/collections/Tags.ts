import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
}

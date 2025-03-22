import type { CollectionConfig } from 'payload'

export const Product: CollectionConfig = {
  slug: 'products',
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
      name: 'descriptioon',
      type: 'text',
      required: true,
    },
    {
      type: 'relationship',
      name: 'image',
      relationTo: 'media',
    },
    {
      type: 'relationship',
      name: 'categories',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      type: 'number',
      name: 'price',

      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'relationship',
      name: 'tags',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

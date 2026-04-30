import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'valueProps',
  title: 'Value Props',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'items',
      title: 'Value Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'item',
          fields: [
            defineField({
              name: 'icon',
              title: 'Lucide Icon Name',
              type: 'string',
              description: 'e.g. Star, Map, Coffee, Utensils. See lucide.dev.',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'body' },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(8),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Value Props' }),
  },
});

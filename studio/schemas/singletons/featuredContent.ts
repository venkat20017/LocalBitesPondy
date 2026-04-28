import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'featuredContent',
  title: 'Featured Content',
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
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Short Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'ctaButton',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Featured Content' }),
  },
});

import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'whyChooseUs',
  title: 'Why Choose Us',
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
      name: 'image',
      title: 'Side Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          fields: [
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
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Why Choose Us' }),
  },
});

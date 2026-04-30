import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'LocalBitesPondy',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Link Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'column',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [defineArrayMember({ type: 'linkItem' })],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLink' })],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Line',
      type: 'string',
      description: 'Use {year} as a placeholder for the current year.',
      initialValue: '© {year} LocalBitesPondy. All rights reserved.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Footer' }),
  },
});

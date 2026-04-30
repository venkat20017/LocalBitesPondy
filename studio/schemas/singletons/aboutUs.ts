import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'aboutUs',
  title: 'About Us Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'About LocalBitesPondy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 3,
      description: 'Short one-paragraph statement about why LocalBitesPondy exists.',
    }),
    defineField({
      name: 'body',
      title: 'Story / Body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'member',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 3 }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'About Us Page' }),
  },
});

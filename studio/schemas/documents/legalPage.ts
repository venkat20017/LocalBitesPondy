import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'legalPage',
  title: 'Legal Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Should match a route: privacy-policy, terms-of-use.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image', options: { hotspot: true } }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
});

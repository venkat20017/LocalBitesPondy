import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'linkItem',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'external',
      title: 'External (open in new tab)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

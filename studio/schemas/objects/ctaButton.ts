import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaButton',
  title: 'CTA Button',
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
      description: 'Internal path (e.g. /restaurants) or full URL. Use #lead to open the lead modal.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'external',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

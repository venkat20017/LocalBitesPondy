import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text (above heading)',
      type: 'string',
    }),
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
      rows: 3,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'If empty, the bundled fallback hero is used.',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'ctaButton',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'ctaButton',
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges (short text snippets)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare: ({ heading }) => ({ title: 'Hero', subtitle: heading }),
  },
});

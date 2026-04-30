import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title for SEO and social sharing (~60 chars).',
      validation: (Rule) => Rule.max(70).warning('Keep under 70 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Search snippet (~155 chars).',
      validation: (Rule) => Rule.max(170).warning('Keep under 170 characters.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Recommended 1200x630px.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override only if this page should canonicalize elsewhere.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});

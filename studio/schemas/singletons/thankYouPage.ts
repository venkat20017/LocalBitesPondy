import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'thankYouPage',
  title: 'Thank You Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: "You're all set",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Your Pondicherry food guide is downloading now.',
    }),
    defineField({
      name: 'pdfUrl',
      title: 'PDF File URL',
      type: 'string',
      description: 'Path or URL to the PDF that auto-downloads on this page.',
      initialValue: '/famous-food-in-pondicherry.pdf',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pdfDownloadLabel',
      title: 'Manual Download Button Label',
      type: 'string',
      initialValue: "Download didn't start?",
    }),
    defineField({
      name: 'nextStepsHeading',
      title: 'Next Steps Heading',
      type: 'string',
    }),
    defineField({
      name: 'nextStepsBody',
      title: 'Next Steps Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Thank You Page' }),
  },
});

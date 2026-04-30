import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'LocalBitesPondy',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'primaryDomain',
      title: 'Primary Domain',
      type: 'url',
      initialValue: 'https://localbitespondy.com',
      description: 'Used for canonical URLs and OG tags.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seoFields',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      initialValue: 'GTM-PSSSM8R6',
    }),
    defineField({
      name: 'ga4Id',
      title: 'Google Analytics 4 ID',
      type: 'string',
      initialValue: 'G-7K5JPSBRQ2',
    }),
    defineField({
      name: 'adsId',
      title: 'Google Ads ID',
      type: 'string',
      initialValue: 'AW-17775750153',
    }),
    defineField({
      name: 'adsConversionLabel',
      title: 'Google Ads Lead Conversion Label',
      type: 'string',
      description: 'Format: AW-XXX/LABEL — used as send_to in gtag conversion event.',
      initialValue: 'AW-17775750153/2dW3CNjE9eEbEInYkZxC',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings' }),
  },
});

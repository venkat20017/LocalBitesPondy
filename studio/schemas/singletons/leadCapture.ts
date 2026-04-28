import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'leadCapture',
  title: 'Lead Capture Form',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Get the Free Pondicherry Food Guide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      initialValue: '15 handpicked local spots · Google Maps links · What to order',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Send me the guide',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: "You're on the list — your guide is downloading.",
    }),
    defineField({
      name: 'source',
      title: 'Source Tag',
      type: 'string',
      description: 'Used in GA4 lead event and Netlify Forms label.',
      initialValue: 'landing_modal',
    }),
    defineField({
      name: 'netlifyFormName',
      title: 'Netlify Form Name',
      type: 'string',
      description: 'Must match the static form declared in index.html for Netlify Forms detection.',
      initialValue: 'lead-capture',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'field',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name',
              type: 'string',
              description: 'Used as the form field name (e.g. email, name, phone).',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'placeholder',
              title: 'Placeholder',
              type: 'string',
            }),
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'tel' },
                ],
              },
              initialValue: 'text',
            }),
            defineField({
              name: 'required',
              title: 'Required',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'name' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Lead Capture Form' }),
  },
});

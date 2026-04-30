import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Section',
  type: 'document',
  description: 'Inline contact form on the landing page (separate from the popup PDF guide form).',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Get in touch',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
      initialValue: 'Restaurant recommendations, content corrections, partnerships — drop us a line.',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Send message',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: "Thanks — we'll reply within 24-48 hours.",
    }),
    defineField({
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      description: 'Customize labels/placeholders. Field names are fixed (name, email, phone, message) so the Apps Script can map columns.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'field',
          fields: [
            defineField({
              name: 'name',
              title: 'Field Name',
              type: 'string',
              options: {
                list: [
                  { title: 'Name', value: 'name' },
                  { title: 'Email', value: 'email' },
                  { title: 'Phone', value: 'phone' },
                  { title: 'Message', value: 'message' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'placeholder', title: 'Placeholder', type: 'string' }),
            defineField({ name: 'required', title: 'Required', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'label', subtitle: 'name' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Form Section' }),
  },
});

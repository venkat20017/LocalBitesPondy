import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'navbar',
  title: 'Navbar',
  type: 'document',
  fields: [
    defineField({
      name: 'logoText',
      title: 'Logo Text',
      type: 'string',
      initialValue: 'LocalBitesPondy',
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Image (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'links',
      title: 'Navigation Links',
      type: 'array',
      of: [defineArrayMember({ type: 'linkItem' })],
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Button',
      type: 'ctaButton',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Navbar' }),
  },
});

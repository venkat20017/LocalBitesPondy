export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroSubtitle1', title: 'Hero Subtitle 1', type: 'text' },
    { name: 'heroSubtitle2', title: 'Hero Subtitle 2', type: 'text' },
    { name: 'heroCta', title: 'Hero CTA Text', type: 'string' },
    { name: 'heroLink', title: 'Hero CTA Link', type: 'string' },
    { 
      name: 'heroImage', 
      title: 'Hero Image', 
      type: 'image', 
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessiblity.'
        }
      ]
    }
  ]
}

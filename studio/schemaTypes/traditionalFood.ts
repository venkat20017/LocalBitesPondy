export default {
  name: 'traditionalFood',
  title: 'Traditional Food',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'link', title: 'Link (Optional)', type: 'url' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
  ]
}

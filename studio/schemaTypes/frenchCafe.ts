export default {
  name: 'frenchCafe',
  title: 'French Cafes',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'link', title: 'Link (Optional)', type: 'url' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
  ]
}

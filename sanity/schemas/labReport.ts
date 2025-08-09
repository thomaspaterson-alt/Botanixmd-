export default {
  name: 'labReport',
  title: 'Lab Report (COA)',
  type: 'document',
  fields: [
    { name: 'productSlug', type: 'string' },
    { name: 'batch', type: 'string' },
    { name: 'pdf', type: 'file' },
    { name: 'publishedAt', type: 'datetime' },
  ]
}

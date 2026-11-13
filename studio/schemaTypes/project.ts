import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'url', title: 'Live site link', type: 'url', description: 'Optional. Makes the card clickable.' }),
    defineField({ name: 'image', title: 'Screenshot', type: 'image', options: { hotspot: true }, description: 'Landscape, about 1060 x 740 px.' }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Smaller numbers show first.', initialValue: 100 }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'url' } },
});

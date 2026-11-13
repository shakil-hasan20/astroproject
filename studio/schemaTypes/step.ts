import { defineField, defineType } from 'sanity';

export const step = defineType({
  name: 'step',
  title: 'Process step',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Smaller numbers show first.', initialValue: 100 }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'description' } },
});

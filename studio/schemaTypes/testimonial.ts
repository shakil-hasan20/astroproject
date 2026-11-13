import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Country / company', type: 'string' }),
    defineField({ name: 'quote', title: 'Review', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Order', type: 'number', description: 'Smaller numbers show first.', initialValue: 100 }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'location' } },
});

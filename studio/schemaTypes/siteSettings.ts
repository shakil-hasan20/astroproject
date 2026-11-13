import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'hero', title: 'Hero & stats' },
    { name: 'highlight', title: 'Highlight section' },
    { name: 'contact', title: 'Contact & links' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Your name', type: 'string', group: 'profile', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', group: 'profile', description: 'Shown under your name. e.g. Web Developer' }),
    defineField({ name: 'badge', title: 'Badge text', type: 'string', group: 'profile', description: 'Small line under your role. e.g. Top Rated Freelancer' }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 3, group: 'profile' }),
    defineField({ name: 'avatar', title: 'Profile photo', type: 'image', options: { hotspot: true }, group: 'profile', description: 'If empty, the bundled photo in /public/images is used.' }),
    defineField({ name: 'logo', title: 'Small logo (top of profile card)', type: 'image', group: 'profile' }),
    defineField({ name: 'verified', title: 'Show verified tick next to name', type: 'boolean', initialValue: false, group: 'profile' }),
    defineField({ name: 'certBadge', title: 'Side badge (e.g. Certified Partner)', type: 'image', group: 'profile', description: 'Tall, narrow image shown on the left edge on large screens.' }),

    defineField({ name: 'headline', title: 'Hero headline', type: 'string', group: 'hero' }),
    defineField({ name: 'subheadline', title: 'Hero sub-text', type: 'text', rows: 3, group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero background image', type: 'image', options: { hotspot: true }, group: 'hero', description: 'Optional. Wide, dark photos work best.' }),
    defineField({ name: 'available', title: 'Available for work', type: 'boolean', initialValue: true, group: 'hero' }),
    defineField({ name: 'availabilityText', title: 'Availability text', type: 'string', initialValue: 'Available for projects', group: 'hero' }),
    defineField({ name: 'tools', title: 'Tools / tech chips', type: 'array', of: [{ type: 'string' }], group: 'hero', description: 'Shown as text chips when no tool logos are set.' }),
    defineField({
      name: 'toolLogos',
      title: 'Tool logos',
      type: 'array',
      group: 'hero',
      description: 'Logos shown at the bottom of the hero (Figma, Webflow…). Replaces the text chips.',
      of: [{ type: 'object', fields: [defineField({ name: 'name', type: 'string', validation: (r) => r.required() }), defineField({ name: 'image', type: 'image', validation: (r) => r.required() }), defineField({ name: 'height', title: 'Height (em)', type: 'number', initialValue: 1.5 })], preview: { select: { title: 'name', media: 'image' } } }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      group: 'hero',
      validation: (r) => r.max(4),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Number', type: 'number', validation: (r) => r.required() }),
            defineField({ name: 'suffix', title: 'After the number', type: 'string', description: 'e.g. + or % or ★' }),
            defineField({ name: 'decimals', title: 'Decimal places', type: 'number', initialValue: 0 }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
          ],
          preview: { select: { title: 'label', value: 'value', suffix: 'suffix' }, prepare: ({ title, value, suffix }) => ({ title, subtitle: `${value ?? ''}${suffix ?? ''}` }) },
        },
      ],
    }),

    defineField({
      name: 'highlight',
      title: 'Highlight section (optional)',
      type: 'object',
      group: 'highlight',
      description: 'A feature block under Services. Leave the title empty to hide it.',
      fields: [
        defineField({ name: 'label', title: 'Small label', type: 'string' }),
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'text', title: 'Text', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Cards',
          type: 'array',
          of: [{ type: 'object', fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'description', type: 'text', rows: 3 })], preview: { select: { title: 'title' } } }],
        }),
        defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
      ],
    }),

    defineField({ name: 'contactTitle', title: 'Contact title', type: 'string', group: 'contact' }),
    defineField({ name: 'contactText', title: 'Contact text', type: 'text', rows: 3, group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'string', group: 'contact', validation: (r) => r.email() }),
    defineField({ name: 'whatsapp', title: 'WhatsApp number', type: 'string', group: 'contact', description: 'Digits only, with country code. e.g. 8801712345678' }),
    defineField({
      name: 'profiles',
      title: 'Marketplace profiles',
      type: 'array',
      group: 'contact',
      description: 'Fiverr, Upwork, Freelancer etc. Shown as buttons.',
      of: [{ type: 'object', fields: [defineField({ name: 'label', type: 'string', validation: (r) => r.required() }), defineField({ name: 'url', type: 'url', validation: (r) => r.required() })], preview: { select: { title: 'label', subtitle: 'url' } } }],
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [{ type: 'object', fields: [defineField({ name: 'label', type: 'string', validation: (r) => r.required() }), defineField({ name: 'url', type: 'url', validation: (r) => r.required() })], preview: { select: { title: 'label', subtitle: 'url' } } }],
    }),
    defineField({ name: 'footerText', title: 'Footer text', type: 'string', group: 'contact' }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});

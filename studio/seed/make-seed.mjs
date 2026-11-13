// Generates sample.ndjson from the site's default content.
// Run:  node seed/make-seed.mjs   then   npx sanity dataset import seed/sample.ndjson production --replace
import fs from 'node:fs';
import { fallback as d } from '../../src/data/fallback.ts';

const key = (i) => `k${i}`;
const withKeys = (arr = []) => arr.map((x, i) => ({ _key: key(i), ...x }));
const docs = [];

const s = d.settings;
docs.push({
  _id: 'siteSettings', _type: 'siteSettings',
  name: s.name, role: s.role, verified: s.verified, badge: s.badge, bio: s.bio, headline: s.headline, subheadline: s.subheadline,
  available: s.available, availabilityText: s.availabilityText, tools: s.tools,
  stats: withKeys(s.stats),
  highlight: { ...s.highlight, items: withKeys(s.highlight.items) },
  contactTitle: s.contactTitle, contactText: s.contactText, email: s.email, whatsapp: s.whatsapp,
  socials: withKeys(s.socials), profiles: withKeys(s.profiles), footerText: s.footerText,
});
const add = (type, list, map) => list.forEach((x, i) => docs.push({ _id: `${type}-${i + 1}`, _type: type, order: (i + 1) * 10, ...map(x) }));
add('project', d.projects, (x) => ({ title: x.title, url: x.url }));
add('service', d.services, (x) => x);
add('step', d.steps, (x) => x);
add('testimonial', d.testimonials, (x) => x);
add('faq', d.faqs, (x) => x);

fs.writeFileSync(new URL('./sample.ndjson', import.meta.url), docs.map((x) => JSON.stringify(x)).join('\n') + '\n');
console.log(`Wrote ${docs.length} documents to seed/sample.ndjson`);

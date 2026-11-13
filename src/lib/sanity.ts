import { fallback, type SiteData } from '../data/fallback';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production';
const apiVersion = '2024-01-01';
const token = import.meta.env.SANITY_READ_TOKEN as string | undefined; // only for private datasets

const QUERY = /* groq */ `{
  "settings": *[_type == "siteSettings"][0]{
    name, role, headline, subheadline, bio, available, availabilityText, badge,
    verified, email, whatsapp, socials[]{label, url}, profiles[]{label, url}, tools,
    stats[]{value, suffix, decimals, label},
    highlight{label, title, text, items[]{title, description}, tags},
    contactTitle, contactText, footerText,
    "avatarUrl": avatar.asset->url,
    "logoUrl": logo.asset->url,
    "certUrl": certBadge.asset->url,
    "toolLogos": toolLogos[]{name, height, "url": image.asset->url},
    "heroUrl": heroImage.asset->url
  },
  "projects": *[_type == "project"] | order(order asc, _createdAt asc){ title, url, "imageUrl": image.asset->url },
  "services": *[_type == "service"] | order(order asc, _createdAt asc){ title, description },
  "steps": *[_type == "step"] | order(order asc, _createdAt asc){ title, description },
  "testimonials": *[_type == "testimonial"] | order(order asc, _createdAt asc){ name, location, quote },
  "faqs": *[_type == "faq"] | order(order asc, _createdAt asc){ question, answer }
}`;

let cache: Promise<SiteData> | undefined;

async function load(): Promise<SiteData> {
  if (!projectId) return fallback; // Sanity not connected yet: show default content

  const host = token ? 'api.sanity.io' : 'apicdn.sanity.io';
  const url = `https://${projectId}.${host}/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(QUERY)}`;

  try {
    const res = await fetch(url, token ? { headers: { Authorization: `Bearer ${token}` } } : undefined);
    if (!res.ok) throw new Error(`Sanity responded ${res.status}`);
    const { result } = await res.json();

    // Settings: fill any field you have not filled in yet with the default.
    const clean = Object.fromEntries(
      Object.entries(result.settings ?? {}).filter(([, v]) => v !== null && v !== undefined && v !== '')
    );
    const settings = { ...fallback.settings, ...clean } as SiteData['settings'];
    // Logos: use the ones from Sanity, or the bundled defaults until you upload your own.
    if (!settings.toolLogos?.length) settings.toolLogos = fallback.settings.toolLogos;
    // Project screenshots: use Sanity's image, or the bundled one with the same title.
    const projects = (result.projects ?? []).map((p: SiteData['projects'][number]) => ({
      ...p,
      imageUrl: p.imageUrl ?? fallback.projects.find((f) => f.title === p.title)?.imageUrl,
    }));
    return {
      settings,
      projects,
      services: result.services ?? [],
      steps: result.steps ?? [],
      testimonials: result.testimonials ?? [],
      faqs: result.faqs ?? [],
    };
  } catch (err) {
    console.warn('[sanity] Could not load content, using default content instead.', err);
    return fallback;
  }
}

/** Loads all site content once per build and shares it between pages. */
export function getSiteData(): Promise<SiteData> {
  return (cache ??= load());
}

/** Sanity CDN image with width + auto format (webp/avif). */
export function img(url: string | undefined, width = 1200): string | undefined {
  if (url?.startsWith('/')) return url; // local image from /public
  return url ? `${url}?w=${width}&auto=format&q=80` : undefined;
}

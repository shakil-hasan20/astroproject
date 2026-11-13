// Default content (Sujon Mahmud). Used when Sanity is not connected yet (no PUBLIC_SANITY_PROJECT_ID),
// and as a fallback for any image you have not uploaded to Sanity yet.
export type Settings = {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  bio: string;
  avatarUrl?: string;
  heroUrl?: string;
  logoUrl?: string;
  certUrl?: string;
  verified?: boolean;
  available: boolean;
  availabilityText: string;
  badge: string;
  email: string;
  whatsapp: string; // digits only, with country code
  socials: { label: string; url: string }[];
  profiles: { label: string; url: string }[];
  tools: string[];
  toolLogos?: { name: string; url: string; height?: number }[];
  stats: { value: number; suffix?: string; decimals?: number; label: string }[];
  highlight?: {
    label: string;
    title: string;
    text: string;
    items: { title: string; description: string }[];
    tags: string[];
  };
  contactTitle: string;
  contactText: string;
  footerText: string;
};

export type SiteData = {
  settings: Settings;
  projects: { title: string; url?: string; imageUrl?: string }[];
  services: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  testimonials: { name: string; location?: string; quote: string }[];
  faqs: { question: string; answer: string }[];
};

export const fallback: SiteData = {
  "settings": {
    "name": "Sujon Mahmud",
    "role": "Webflow Developer in Bangladesh",
    "badge": "Top Rated Plus",
    "verified": true,
    "headline": "Webflow Developer & Certified Partner — Bangladesh",
    "subheadline": "Fast, custom Webflow sites for startups and agencies — from Figma to launch, powered by smart AI workflows.",
    "bio": "Sujon Mahmud — Webflow developer & Certified Partner from Bangladesh. Fast, custom Webflow sites for startups and agencies, from Figma to launch. 5+ years, 200+ projects, 4.9★ rating.",
    "avatarUrl": "/images/avatar.jpg",
    "heroUrl": "/images/hero.webp",
    "logoUrl": "/images/logo.png",
    "certUrl": "/images/cert.svg",
    "available": true,
    "availabilityText": "Available for projects",
    "email": "sujon.webflow@gmail.com",
    "whatsapp": "8801917189096",
    "socials": [],
    "profiles": [
      {
        "label": "Fiverr",
        "url": "https://www.fiverr.com/sujon_mahmud11?source=gig_page&gigs=slug%3Acustomize-your-webflow-template-edit-template-and-make-it-ready-to-publish%2Cpckg_id%3A1"
      },
      {
        "label": "Upwork",
        "url": "https://www.upwork.com/freelancers/sujonmahmudd"
      }
    ],
    "tools": [
      "Figma",
      "Make",
      "Zapier",
      "Airtable",
      "Stripe",
      "Webflow"
    ],
    "toolLogos": [
      {
        "name": "Figma",
        "url": "/images/tool-figma.svg",
        "height": 2
      },
      {
        "name": "Make",
        "url": "/images/tool-make.png",
        "height": 1.15
      },
      {
        "name": "Zapier",
        "url": "/images/tool-zapier.png",
        "height": 1.5
      },
      {
        "name": "Airtable",
        "url": "/images/tool-airtable.png",
        "height": 1.5
      },
      {
        "name": "Stripe",
        "url": "/images/tool-stripe.png",
        "height": 1.45
      },
      {
        "name": "Webflow",
        "url": "/images/tool-webflow.svg",
        "height": 1.2
      }
    ],
    "stats": [
      {
        "value": 5,
        "suffix": "+",
        "label": "Years of experience"
      },
      {
        "value": 200,
        "suffix": "+",
        "label": "Projects delivered"
      },
      {
        "value": 4.9,
        "suffix": " ★",
        "decimals": 1,
        "label": "Average client rating"
      },
      {
        "value": 100,
        "suffix": "%",
        "label": "Upwork Job Success · Top Rated"
      }
    ],
    "highlight": {
      "label": "AI-powered workflow",
      "title": "Webflow, supercharged with AI",
      "text": "I combine Webflow craft with modern AI tools, so you get faster delivery, smarter automation and sites that do more for your business — all reviewed by hand for quality.",
      "items": [
        {
          "title": "AI-assisted development",
          "description": "Faster builds, cleaner structure and quicker iterations — every line is still reviewed and tested by hand."
        },
        {
          "title": "Smart automation",
          "description": "Connect forms, CRM, email and Airtable with Make or Zapier, plus AI steps like auto-replies, lead sorting and content drafts."
        },
        {
          "title": "AI features on your site",
          "description": "Chatbots, AI search, personalised content and CMS workflows that help visitors and save your team time."
        }
      ],
      "tags": [
        "ChatGPT",
        "Claude",
        "Gemini",
        "OpenAI API",
        "Make",
        "Zapier",
        "Airtable"
      ]
    },
    "contactTitle": "Contact me now ~",
    "contactText": "Tell me about your project — a new site, a redesign or a Webflow fix — and let’s make it happen.",
    "footerText": "With ♥ Sujon Mahmud From – Bangladesh"
  },
  "projects": [
    {
      "title": "Dental Wellness",
      "url": "https://www.dentalwellnessmillhill.co.uk/",
      "imageUrl": "/images/project-dental-wellness.webp"
    },
    {
      "title": "Artist Republic",
      "url": "https://www.artistrepublic.co.uk/",
      "imageUrl": "/images/project-artist-republic.webp"
    },
    {
      "title": "Eventech",
      "url": "https://www.eventechonline.com/",
      "imageUrl": "/images/project-eventech.webp"
    },
    {
      "title": "Forever Promises",
      "url": "https://www.forever-promises.com/",
      "imageUrl": "/images/project-forever-promises.webp"
    },
    {
      "title": "Wedding Bands Nottingham",
      "url": "https://weddingbandsnottingham.co.uk/",
      "imageUrl": "/images/project-wedding-bands-nottingham.webp"
    },
    {
      "title": "MusicLegal",
      "url": "https://www.musiclegal.co.uk/",
      "imageUrl": "/images/project-musiclegal.webp"
    },
    {
      "title": "Greener Concepts",
      "url": "https://www.greenerconcepts.com/",
      "imageUrl": "/images/project-greener-concepts.webp"
    },
    {
      "title": "Ed Sheeran Tribute",
      "url": "https://edsheerantribute.webflow.io/",
      "imageUrl": "/images/project-ed-sheeran-tribute.webp"
    }
  ],
  "services": [
    {
      "title": "Figma to Webflow",
      "description": "Pixel-perfect, responsive builds from your Figma design, with a clean Client-First structure."
    },
    {
      "title": "Custom Webflow websites",
      "description": "Full design-and-build for startups, agencies and local businesses — sharp, fast and easy to grow."
    },
    {
      "title": "CMS & dynamic content",
      "description": "Collections, filters and templates so your team can update the site without a developer."
    },
    {
      "title": "Animations & interactions",
      "description": "Smooth scroll effects, hover states and page transitions that add polish without slowing the site."
    },
    {
      "title": "E-commerce & integrations",
      "description": "Webflow Ecommerce plus Stripe, Zapier, Make and Airtable to connect your tools."
    },
    {
      "title": "Fixes, edits & support",
      "description": "Quick updates, bug fixes, template customization and ongoing Webflow maintenance."
    }
  ],
  "steps": [
    {
      "title": "Discovery",
      "description": "We talk goals, audience, pages and deadlines, so scope and timeline are clear from day one."
    },
    {
      "title": "Plan & design",
      "description": "I review your Figma or map out the structure and components before any building starts."
    },
    {
      "title": "Build & review",
      "description": "I build in Webflow, share a staging link and refine it with your feedback."
    },
    {
      "title": "Launch & support",
      "description": "Final checks, SEO basics and go-live, plus a handover and support afterwards."
    }
  ],
  "testimonials": [
    {
      "name": "tonyyoung188",
      "location": "United Kingdom",
      "quote": "Working with Sujon was an outstanding experience from start to finish. He delivered DocuRail’s new Webflow website with precision, creativity, and a clear understanding of the brand’s vision. Every section was crafted thoughtfully — professional, clean, and perfectly aligned with how I wanted DocuRail to be represented. What impressed me most was his attention to detail and communication. He took feedback seriously, refined every part of the build until it looked and performed exactly as needed, and never once missed a deadline. Sujon doesn’t just build websites — he builds confidence in the process. If you’re looking for someone reliable, talented, Sujon is the one to trust."
    },
    {
      "name": "rikbeekers",
      "location": "Netherlands",
      "quote": "Very very happy to work with Sujon! Super quick, super responsive, got what I wanted immediately. For reference, I had a website built to draft level by a “professional agency” in Western Europe. Sujon was already done with 80% of what I wanted on monday, at a level that was 5–10x higher than the draft the agency made. Need I say more..."
    },
    {
      "name": "magdalenaaaam",
      "location": "Switzerland",
      "quote": "I had an excellent experience working with this developer. The communication was smooth, fast, and clear from the very beginning. He immediately understood what I needed, offered smart solutions, and delivered everything exactly according to my expectations — even better, actually. I highly recommend him to anyone who needs reliable, high-quality Webflow or IT support. I will definitely work with him again!"
    },
    {
      "name": "tinalperez",
      "location": "United States",
      "quote": "Awesome work! Followed instructions exactly and did revisions without complaints. Great experience, I highly recommend using this seller for all your webflow needs. Also has great communication - I got responses right away and knew where we are up to the whole time. Great job, thank you!"
    },
    {
      "name": "patrick__os",
      "location": "United Arab Emirates",
      "quote": "Excellent work and great communication! He made all the requested Webflow adjustments quickly, cleanly, and with great attention to detail. Very professional, proactive, and easy to work with. I’ll definitely work with him again. Highly recommended!"
    },
    {
      "name": "fabiolaotayzam",
      "location": "United States",
      "quote": "Sujon was a pleasure to work with. He was super proactive, paid close attentions to the direction shared with him and gave recommendations for page design as well. Really appreciate his patience with me as well - since I was balancing this project with other work projects. In all, a great experience and look forward to working with Sujon in the future."
    },
    {
      "name": "newlondon86",
      "location": "United Kingdom",
      "quote": "The service I have received has been exceptional, you continue to provide us great service and we look forward to continuing our working relationship. Your skills and expertise is giving our audiences the best we experience when they visit our website."
    },
    {
      "name": "osmanismo",
      "location": "Kenya",
      "quote": "This being my first time hiring help in Fiverr, I didn’t know what to expect. I took a chance on Sujon Mohamed and after working with him and seeing how he has delivered on every one of my requirements, how polite and consummate professional he was, I am glad I hired him for this project."
    },
    {
      "name": "purabbbb",
      "location": "India",
      "quote": "Sujon was extremely cooperative and delivered excellent work with great professionalism. His dedication and attention to detail truly stand out. I highly recommend him and look forward to working together again. Keep up the amazing work, Sujon — you have a bright path ahead!"
    },
    {
      "name": "cruzer076",
      "location": "United States",
      "quote": "He did an excellent job creating what I wanted. It looks great and paid attention to detail. I definitely use them in the future. It’s hard to find developers that can take your idea and put them on the web the way you envisioned it and they did a great job"
    },
    {
      "name": "bobieh",
      "location": "United Kingdom",
      "quote": "Working with Sujon was a great experience. His positive attitude, clear communication, and professionalism made the entire project run smoothly. I highly recommend his web development services to anyone looking for a reliable and skilled developer."
    }
  ],
  "faqs": [
    {
      "question": "How long does a project take?",
      "answer": "It depends on the scope. A landing page is usually much quicker than a multi-page CMS site. After a short chat I give you a clear timeline with milestones before we start."
    },
    {
      "question": "How many revisions are included?",
      "answer": "Feedback rounds are part of the process. We agree on the scope and revision rounds up front, so there are no surprises."
    },
    {
      "question": "How does payment work?",
      "answer": "Through Fiverr or Upwork, where milestones and escrow protect both sides. For direct projects we agree on milestones before work begins."
    },
    {
      "question": "Which timezone do you work in?",
      "answer": "I’m based in Bangladesh (UTC+6) and plan my day around your timezone, so clients in the US and Europe get quick replies and regular updates."
    },
    {
      "question": "Can I edit the site myself afterwards?",
      "answer": "Yes. I set up the CMS and Editor so your team can update content easily, and I’m happy to walk you through it."
    },
    {
      "question": "Do you help after the site is live?",
      "answer": "Yes. Small fixes, updates and ongoing Webflow maintenance are available after the project ends."
    },
    {
      "question": "Do you use AI in your work?",
      "answer": "Yes. I use AI tools to speed up research, drafts, code review and automation, and I can add AI features like chatbots or automations to your site. Everything is reviewed by hand, so quality and your brand voice stay human."
    },
    {
      "question": "Can you add AI features to my site?",
      "answer": "Yes. I can add things like an AI chatbot, smart search, automated lead replies and content workflows using Make, Zapier and AI APIs. We first agree on what makes sense for your goals and budget."
    }
  ]
};

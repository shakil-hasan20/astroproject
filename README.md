# Portfolio: Astro + Sanity + Vercel

## চালানোর কমান্ড (Windows)

```
cd C:\AstroProject\astroproject
code .
npm install
npm run dev        → http://localhost:4321
npm run build
```

Sanity ছাড়াও সাইট চলবে (ডিফল্ট কনটেন্ট `src/data/fallback.ts` থেকে আসে)।

## ছবি কোথায়

সব ছবি `public/images/` ফোল্ডারে (প্রোফাইল, হিরো, ৮টা প্রজেক্ট, লোগো, Certified Partner ব্যাজ, টুল লোগো)।
Sanity-তে ছবি আপলোড না করা পর্যন্ত এগুলোই দেখাবে। আপলোড করলে Sanity-র ছবি অগ্রাধিকার পাবে।
চ্যাটবটের উত্তর `src/scripts/chatbot.js` এ, Privacy Policy এর লেখা `src/components/Privacy.astro` এ।

## Sanity যুক্ত করা

1. https://www.sanity.io/manage এ গিয়ে নতুন Project বানান → **Project ID** কপি করুন (dataset: `production`).
2. রুট ফোল্ডারে `.env.example` কপি করে `.env` নাম দিন, `PUBLIC_SANITY_PROJECT_ID=` এর পর ID বসান।
3. `studio` ফোল্ডারেও `.env.example` কপি করে `.env` করুন, `SANITY_STUDIO_PROJECT_ID=` এ একই ID বসান।
4. Studio চালু করুন:
   ```
   cd studio
   npm install
   npx sanity login
   npm run dev          → http://localhost:3333
   ```
5. স্যাম্পল কনটেন্ট ঢুকাতে (একবার):
   ```
   node seed/make-seed.mjs
   npx sanity dataset import seed/sample.ndjson production
   ```
6. রুটে ফিরে `npm run dev` রিস্টার্ট দিন। এখন সব লেখা Studio থেকে বদলাবে।
7. CORS: sanity.io/manage → API → CORS origins এ `http://localhost:3333` আর আপনার Studio URL যোগ করা থাকে (Studio নিজেই করে নেয়)।

Studio অনলাইনে দিতে: `cd studio && npm run deploy` (ফ্রি `yourname.sanity.studio` পাবেন)।

## Vercel এ deploy

1. কোড GitHub এ push করুন (`.env` push হবে না, `.gitignore` এ আছে)।
2. vercel.com → Add New → Project → repo বেছে নিন। Framework: **Astro** (auto)। Root Directory: প্রজেক্ট রুট।
3. Settings → Environment Variables এ `PUBLIC_SANITY_PROJECT_ID` আর `PUBLIC_SANITY_DATASET` বসান → Deploy।
4. **Studio-তে edit করলে সাইট নিজে আপডেট হওয়ার জন্য:** Vercel → Settings → Git → *Deploy Hooks* এ একটা hook বানান → URL কপি করুন।
   Sanity → API → Webhooks → Create: URL = ঐ hook, Trigger on = Create/Update/Delete, Dataset = production।

## কোথায় কী

| ফাইল | কাজ |
|---|---|
| `src/data/fallback.ts` | Sanity ছাড়া অবস্থার ডিফল্ট কনটেন্ট |
| `src/lib/sanity.ts` | Sanity থেকে ডেটা আনার কোড |
| `src/components/*.astro` | প্রতিটা সেকশন (Hero, Stats, Projects…) |
| `src/styles/global.css` | পুরো ডিজাইন + responsive নিয়ম |
| `src/scripts/site.js` | মেনু, slider, count-up, ফর্ম |
| `src/data/blog/*.md` | ব্লগ পোস্ট (আগের মতোই markdown) |
| `studio/schemaTypes/*` | Sanity-র ফিল্ডগুলো |
